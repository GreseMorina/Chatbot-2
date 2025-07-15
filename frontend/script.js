const typingInput = document.querySelector(".typing-input textarea");
const sendChatButton = document.querySelector("#send-btn");
const chatList = document.querySelector(".chat-list");

const suggestionsList = document.querySelector(".suggestions-list");
const suggestionItems = suggestionsList.querySelectorAll(".suggestion-item");
const defaultHeading = document.querySelector(".default-heading");

const sidebar = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu-btn");
const closeSidebarBtn = document.querySelector(".close-sidebar");
const chatHistory = document.querySelector(".chat-history");
const newChatButton = document.querySelector("#new-chat-btn");
console.log("New chat button found:", newChatButton);


const OPENROUTER_API_KEY = "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";

let userText = null;
let isResponseGenerating = false;
const initialInputHeight = typingInput.scrollHeight;

// Sidebar functionality
menuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar.classList.add("active");
});

closeSidebarBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

// Close sidebar when clicking outside
document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
    sidebar.classList.remove("active");
  }
});

const addToChatHistory = (message) => {
  const chatHistoryItem = document.createElement("div");
  chatHistoryItem.className = "chat-history-item";
  chatHistoryItem.innerHTML = `
    <span class="chat-title">${message.substring(0, 30)}${message.length > 30 ? '...' : ''}</span>
    <span class="delete-chat material-symbols-rounded">delete</span>
  `;

  // Add click event to load chat
  chatHistoryItem.addEventListener("click", (e) => {
    if (!e.target.classList.contains("delete-chat")) {
      handleOutgoingChat(true, message);
      sidebar.classList.remove("active");
    }
  });

  // Add click event to delete chat
  const deleteBtn = chatHistoryItem.querySelector(".delete-chat");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (confirm("Möchten Sie diesen Chat wirklich löschen?")) {
      chatHistoryItem.remove();
      // Remove from localStorage if needed
      const savedChats = localStorage.getItem("saved-chats");
      if (savedChats) {
        // You might want to implement a more sophisticated way to remove specific chats
        localStorage.removeItem("saved-chats");
        loadDataFromLocalstorage();
      }
    }
  });

  chatHistory.insertBefore(chatHistoryItem, chatHistory.firstChild);
};

const loadDataFromLocalstorage = () => {
  // Load saved chats from local storage and apply/add on the page
  const savedChats = localStorage.getItem("saved-chats");

  if (savedChats) {
    defaultHeading.style.display = "none";
    suggestionsList.style.display = "none";
    chatList.innerHTML = savedChats;
  } else {
    chatList.querySelectorAll(".chat").forEach(chatElement => chatElement.remove());
    defaultHeading.style.display = "block";
    suggestionsList.style.display = "flex";
  }

  chatList.scrollTo(0, chatList.scrollHeight); // Scroll to bottom of the chat container
}

const createChatElement = (content, className) => {
  // Create new div and apply chat, specified class and set html content of div
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = content;
  return chatDiv;
}

const copyResponse = (copyButton) => {
  // Copy the text content of the response to the clipboard
  const reponseTextElement = copyButton.parentElement.querySelector("p");
  navigator.clipboard.writeText(reponseTextElement.textContent);
  copyButton.textContent = "done";
  setTimeout(() => copyButton.textContent = "content_copy", 1000);
}

const initTypingEffect = (text, textElement, incomingChatDiv) => {
  // Add typing effect by showing words one by one
  const words = text.split(' ');
  let currentWordIndex = 0;

  const typingInterval = setInterval(() => {
    if (currentWordIndex < words.length) {
      textElement.textContent += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex];
      currentWordIndex++;
    } else {
      clearInterval(typingInterval);
      isResponseGenerating = false;
      localStorage.setItem("saved-chats", chatList.innerHTML);
    }
  }, 100);

  const copyButtonElement = '<span onclick="copyResponse(this)" class="icon material-symbols-rounded">content_copy</span>';
  incomingChatDiv.querySelector(".chat-content").insertAdjacentHTML("beforeend", copyButtonElement);
}

const getChatResponse = async (incomingChatDiv) => {
  const API_URL = "https://openrouter.ai/api/v1/chat/completions";
  const pElement = document.createElement("p");

  // Define the properties and data for the API request
  const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://www.rohde-schwarz.com/",
      "X-Title": "My Chat App"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userText }],
    }),
  };

  // Send POST request to API, get response and set the reponse as paragraph element text
  try {
    const response = await fetch(API_URL, requestOptions);
    const result = await response.json();

    if (!response.ok) throw new Error(result.error.message);

    const responseContent = result.choices[0].message.content.trim();
    initTypingEffect(responseContent, pElement, incomingChatDiv);
  } catch (error) {
    // Add error class to the paragraph element and set error text
    isResponseGenerating = false;
    pElement.classList.add("error");
    pElement.textContent = error.message;
  } finally {
    // Remove the typing animation, append the paragraph element
    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
    chatList.scrollTo(0, chatList.scrollHeight);
  }
}

const showTypingAnimation = () => {
  // Display the typing animation and call the getChatResponse function
  const html = `<div class="chat-content">
                      <div class="chat-details">
                          <img src="images/chatbot.jpg" alt="chatbot-img">
                          <div class="typing-animation">
                              <div class="typing-dot" style="--delay: 0.2s"></div>
                              <div class="typing-dot" style="--delay: 0.3s"></div>
                              <div class="typing-dot" style="--delay: 0.4s"></div>
                          </div>
                      </div>
                  </div>`;
  // Create an incoming chat div with typing animation and append it to chat container
  const incomingChatDiv = createChatElement(html, "incoming");
  chatList.appendChild(incomingChatDiv);
  chatList.scrollTo(0, chatList.scrollHeight);
  getChatResponse(incomingChatDiv);
}

const handleOutgoingChat = (isSuggestionMessage = false, message = null) => {
  userText = isSuggestionMessage && message ? message : typingInput.value.trim();
  if (!userText || isResponseGenerating) return;

  // Clear the input field and reset its height
  typingInput.value = "";
  isResponseGenerating = true;
  typingInput.style.height = `${initialInputHeight}px`;

  const html = `<div class="chat-content">
                      <div class="chat-details">
                          <img src="images/user.jpg" alt="user-img">
                          <p></p>
                      </div>
                  </div>`;

  // Create an outgoing chat div with user's message and append it to chat container
  const outgoingChatDiv = createChatElement(html, "outgoing");
  outgoingChatDiv.querySelector("p").textContent = userText;
  chatList.appendChild(outgoingChatDiv);

  // Add to chat history
  addToChatHistory(userText);

  defaultHeading.style.display = "none";
  suggestionsList.style.display = "none";
  chatList.scrollTo(0, chatList.scrollHeight);
  setTimeout(showTypingAnimation, 500);
}

suggestionItems.forEach(item => {
  item.addEventListener("click", () => {
    const { message } = item.dataset;
    handleOutgoingChat(true, message);
  });
});



typingInput.addEventListener("input", () => {
  // Adjust the height of the input field dynamically based on its content
  typingInput.style.height = `${initialInputHeight}px`;
  typingInput.style.height = `${typingInput.scrollHeight}px`;
});

typingInput.addEventListener("keydown", (e) => {
  // If the Enter key is pressed without Shift and the window width is larger
  // than 800 pixels, handle the outgoing chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleOutgoingChat();
  }
});

loadDataFromLocalstorage();
sendChatButton.addEventListener("click", handleOutgoingChat);

// Add event listener for the new send button in controls
const sendBtnControls = document.getElementById('send-btn-controls');
sendBtnControls.addEventListener("click", handleOutgoingChat);

// New chat functionality
newChatButton.addEventListener("click", () => {
  console.log("New chat button clicked!");
  
  // Clear all chats
  chatList.innerHTML = "";
  
  // Show default heading and suggestions
  defaultHeading.style.display = "block";
  suggestionsList.style.display = "flex";
  
  // Clear localStorage
  localStorage.removeItem("saved-chats");
  
  // Close sidebar
  sidebar.classList.remove("active");
  
  // Don't clear chat history - keep it in the sidebar
  // chatHistory.innerHTML = "";
  
  console.log("New chat created successfully!");
});

