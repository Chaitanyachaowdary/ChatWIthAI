# ChatGPT-Like Conversational Web Application

## Overview
This project is a simple ChatGPT-like conversational web application built for the **Full-Stack Developer – Second Round Technical Assessment**.

The goal of this project is to show how a real-world full-stack application can be designed using a clean backend, persistent storage, and a user-friendly frontend.

⚠️ No OpenAI, ChatGPT, or any external AI APIs are used.  
All responses are generated using custom backend logic, as required.

---

## What This Project Does
- Allows users to chat with a bot using a ChatGPT-style interface
- Stores conversations in a database
- Restores chat history after page refresh or server restart
- Uses clean REST APIs and a layered backend structure
- Works on desktop, tablet, and mobile screens

---

## Technology Stack

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST APIs

### Frontend
- React (Vite)
- HTML
- CSS (responsive design)

### Database
- MySQL (relational database)

---

## Features

### Chat Interface
- ChatGPT-style layout
- Auto-growing message input box
- Chat history display
- Typing indicator while the bot responds
- Responsive design for mobile and desktop

### Backend Chat Logic
- Uses simple rule-based logic
- Matches keywords like `java`, `spring boot`, etc.
- Returns predefined responses
- No external AI services are used

### Conversation Persistence
- All messages are saved in the database
- Each message includes:
  - User message
  - Bot response
  - Timestamp
  - Session ID
- Chat history is preserved even after:
  - Page refresh
  - Backend restart

### Session-Based Chats
- Supports multiple chat sessions
- Sidebar to switch between sessions
- Each session has its own chat history

---

## Application Architecture

Frontend (React)
|
| REST API calls
↓
Backend (Spring Boot)
|
| JPA / Database access
↓
MySQL Database



### How the Layers Work
- **Frontend**  
  Handles user interaction and displays chat messages.

- **Controller Layer**  
  Receives API requests from the frontend.

- **Service Layer**  
  Contains the chat logic and decides what reply to send.

- **Repository Layer**  
  Saves and retrieves messages from the database.

---

## How Chat Responses Work
The chatbot does not use AI or machine learning.

Instead:
- The backend checks the user message
- If it matches known keywords, a related response is returned
- If it doesn’t match, a default reply is sent

This approach keeps the logic simple, transparent, and easy to extend.

---

## How Data Is Stored
- Messages are stored in a MySQL database
- Each record contains:
  - Session ID
  - User message
  - Bot reply
  - Timestamp
- When the app loads, chat history is fetched from the database based on the session ID

This ensures chats are not lost after refresh or restart.

---

## Authentication (Optional Feature)
Authentication was marked as optional in the assessment.

### Current Status
- No login or signup
- Session-based chat isolation only

### Possible Future Addition
- Login and signup
- JWT-based authentication
- User-specific chat histories

---

## How to Run the Project Locally

### Run Backend

cd backend/chat-backend
mvn spring-boot:run
Backend will start at: http://localhost:8081

### Run Frontend
cd frontend
npm install
npm run dev



Frontend will start at: http://localhost:5173



---

## Screenshots / Demo
The submission includes screenshots or a short demo video showing:
- Chat interface
- Session switching
- Chat history after page refresh

---

## Future Improvements
- Add user authentication
- Improve chat logic with better keyword handling
- Add real-time messaging using WebSockets
- Dockerize the application
- Improve error handling and security
- Optional AI or LLM integration in the future

---

## Assessment Requirements Status

| Requirement | Status |
|------------|--------|
| Chat Interface | ✅ Completed |
| Custom Backend Logic | ✅ Completed |
| Conversation Persistence | ✅ Completed |
| REST API Design | ✅ Completed |
| Clean Architecture | ✅ Completed |
| Scalability Thinking | ✅ Completed |
| Documentation | ✅ Completed |
| Authentication (Bonus) | ❌ Not implemented |

---


Demo link:  https://drive.google.com/file/d/1j_eyGNBqSlU-3AT4GWDSE2qlFc8ZNuvz/view?usp=drive_link

## Final Notes
This project focuses on writing clean, understandable code and following the assessment requirements carefully.
The application is easy to extend and can be improved further if needed.