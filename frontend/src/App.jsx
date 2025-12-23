import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [sessions, setSessions] = useState(
    JSON.parse(localStorage.getItem("sessions")) || ["session-1"]
  );
  const [activeSession, setActiveSession] = useState(
    localStorage.getItem("activeSession") || "session-1"
  );
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chatEndRef = useRef(null);

  const formatTime = (ts) => {
    if (!ts) return "";
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem("activeSession", activeSession);
  }, [activeSession]);

  useEffect(() => {
    fetch(`http://localhost:8081/api/chat/history?sessionId=${activeSession}`)
      .then((res) => res.json())
      .then((data) => setChat(data));
  }, [activeSession]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, typing]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setTyping(true);

    const res = await fetch(
      `http://localhost:8081/api/chat/send?sessionId=${activeSession}&message=${encodeURIComponent(
        message
      )}`
    );
    const data = await res.json();

    setChat((prev) => [...prev, data]);
    setMessage("");
    setTyping(false);
  };

  const newChat = () => {
    const id = `session-${sessions.length + 1}`;
    setSessions([...sessions, id]);
    setActiveSession(id);
    setChat([]);
    setSidebarOpen(false);
  };

  return (
    <div className="app">
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="new-chat" onClick={newChat}>
          + New Chat
        </button>

        {sessions.map((s) => (
          <div
            key={s}
            className={`session ${s === activeSession ? "active" : ""}`}
            onClick={() => {
              setActiveSession(s);
              setSidebarOpen(false);
            }}
          >
            {s}
          </div>
        ))}
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <button
            className="hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          ChatWith AI
        </div>

        <div className="chat-body">
          {chat.map((c, i) => (
            <div key={i}>
              <div className="message user">
                <div className="bubble">
                  {c.userMessage}
                  <div className="timestamp">{formatTime(c.timestamp)}</div>
                </div>
                <div className="avatar user-avatar">👤</div>
              </div>

              <div className="message bot">
                <div className="avatar bot-avatar">🤖</div>
                <div className="bubble">
                  {c.botReply}
                  <div className="timestamp">{formatTime(c.timestamp)}</div>
                </div>
              </div>
            </div>
          ))}

          {typing && (
            <div className="message bot">
              <div className="avatar bot-avatar">🤖</div>
              <div className="bubble typing-spinner">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        <div className="chat-input">
          <textarea
            value={message}
            placeholder="Send a message..."
            rows={1}
            onChange={(e) => {
              setMessage(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
