package com.chatgpt.chat_backend.service;

import com.chatgpt.chat_backend.model.ChatMessage;
import com.chatgpt.chat_backend.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
public class ChatService {

    private final ChatMessageRepository repository;

    public ChatService(ChatMessageRepository repository) {
        this.repository = repository;
    }

    // SAVE MESSAGE + BOT REPLY
    public ChatMessage processMessage(String sessionId, String userMessage) {

        String reply = generateReply(userMessage);

        ChatMessage chat = new ChatMessage();
        chat.setSessionId(sessionId);
        chat.setUserMessage(userMessage);
        chat.setBotReply(reply);

        return repository.save(chat);
    }

    // FETCH CHAT HISTORY (FOR PAGE REFRESH)
    public List<ChatMessage> getChatHistory(String sessionId) {
        return repository.findBySessionIdOrderByTimestampAsc(sessionId);
    }

    // CUSTOM BOT LOGIC (NO AI)
    private String generateReply(String message) {

        String msg = message.toLowerCase();

    if (msg.contains("hi") || msg.contains("hello")) {
        return "Hello! How can I help you today?";
    }

    if (msg.contains("java")) {
        return "Java is an object-oriented programming language used for building scalable applications.";
    }

    if (msg.contains("oops")) {
        return "OOPS stands for Object Oriented Programming System. It includes Encapsulation, Inheritance, Polymorphism, and Abstraction.";
    }

    if (msg.contains("spring boot")) {
        return "Spring Boot is a Java framework used to build stand-alone, production-ready applications quickly.";
    }

    if (msg.contains("polymorphism")) {
        return "Polymorphism allows one interface to be used for different data types.";
    }

    if (msg.contains("inheritance")) {
        return "Inheritance allows a class to acquire properties and methods of another class.";
    }

    if (msg.contains("bye")) {
        return "Goodbye! Have a great day 😊";
    }

    return "I don’t have an answer for that yet. Try asking about Java, OOPS, or Spring Boot.";
    }
}
