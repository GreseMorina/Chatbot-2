<<<<<<< HEAD
# Chatbot-2
=======
# Rohde & Schwarz Chatbot Projekt

A modern, responsive chat application built with HTML, CSS, and JavaScript that provides an interactive chatbot experience for Rohde & Schwarz information.

## 🚀 Features

- **Interactive Chat Interface**: Real-time chat with AI-powered responses
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Clean, modern UI with consistent theming
- **Chat History**: Persistent chat sessions with sidebar navigation
- **Quick Suggestions**: Pre-defined conversation starters for common queries
- **Send Button**: Convenient send button with proper spacing and styling
- **Fixed Header**: Professional header with logo positioning
- **New Chat Functionality**: Easy way to start fresh conversations

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality and API integration
- **Google Fonts**: Material Symbols for icons
- **OpenRouter API**: AI chat completions powered by GPT-3.5-turbo

## 📁 Project Structure

```
chatbot-2/
├── frontend/
│   ├── images/
│   │   ├── logo.jpg
│   │   ├── 1.avif
│   │   ├── user.jpg
│   │   └── 1.jpg
│   ├── index.html
│   ├── script.js
│   └── style.css
└── README.md
```

## 🎨 UI Components

### Header
- Fixed positioning at the top
- Menu button on the left for sidebar access
- Rohde & Schwarz logo positioned on the right
- Professional blue color scheme (#003d73)

### Chat Interface
- Dynamic message bubbles for user and AI responses
- Typing animations for realistic chat experience
- Copy functionality for AI responses
- Auto-scroll to latest messages

### Sidebar
- Chat history with conversation titles
- "Neuer Chat erstellen" (New Chat) button
- Delete functionality for individual chats
- Smooth slide-in/out animations

### Input Area
- Auto-expanding textarea
- Send button with consistent styling
- Pre-defined suggestion cards
- Responsive design for mobile devices

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local development server)

### Installation

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd "chatgpt-clone copy"
   ```

2. **Start the local development server**
   ```bash
   # Navigate to the project directory
   cd frontend
   
   # Start Python HTTP server
   python3 -m http.server 8000
   ```

3. **Open in your browser**
   ```
   http://localhost:8000
   ```

## 🔧 Configuration

### API Key Setup
The application uses OpenRouter API for chat completions. To use your own API key:

1. Get an API key from [OpenRouter](https://openrouter.ai/)
2. Replace the API key in `script.js`:
   ```javascript
   const OPENROUTER_API_KEY = "your-api-key-here";
   ```

### Customization
- **Logo**: Replace `images/logo.jpg` with your own logo
- **Colors**: Modify CSS variables in `style.css` for custom theming
- **Suggestions**: Update the suggestion items in `index.html`

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile devices (up to 767px)

## 🎯 Key Features Explained

### Chat Functionality
- **Real-time responses**: Uses OpenRouter API for AI-powered chat
- **Message persistence**: Chat history saved in localStorage
- **Typing effects**: Realistic typing animations for AI responses
- **Error handling**: Graceful error messages for API failures

### UI/UX Features
- **Fixed header**: Always visible navigation
- **Sidebar navigation**: Easy access to chat history
- **Suggestion cards**: Quick conversation starters
- **Send button**: Prominent, well-styled send functionality
- **Responsive layout**: Adapts to different screen sizes

## 🔒 Security Notes

- API keys should be kept secure and not exposed in client-side code for production
- Consider implementing server-side API calls for production use
- User data is stored locally in the browser

## 🐛 Troubleshooting

### Common Issues

1. **API not working**
   - Check your internet connection
   - Verify the API key is correct
   - Ensure you have sufficient API credits

2. **Styling issues**
   - Clear browser cache
   - Check browser console for CSS errors
   - Ensure all files are properly loaded

3. **Chat history not saving**
   - Check if localStorage is enabled in your browser
   - Clear browser data if needed

## 📝 License
This project is for educational and demonstration purposes.

## 📞 Support

For questions or support, please refer to the project documentation or create an issue in the repository.

---

**Note**: This is a frontend-only implementation. For production use, consider implementing proper server-side API handling and security measures. 
>>>>>>
