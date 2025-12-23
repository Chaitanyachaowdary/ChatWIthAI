package com.chatgpt.chat_backend.controller;

import com.chatgpt.chat_backend.model.ChatMessage;
import com.chatgpt.chat_backend.service.ChatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatService service;

    public ChatController(ChatService service) {
        this.service = service;
    }

    // SEND MESSAGE
    @GetMapping("/send")   // GET used so browser works easily
    public ChatMessage sendMessage(
            @RequestParam String sessionId,
            @RequestParam String message) {

        return service.processMessage(sessionId, message);
    }

    // LOAD CHAT HISTORY (FOR PAGE REFRESH)
    @GetMapping("/history")
    public List<ChatMessage> getHistory(@RequestParam String sessionId) {
        return service.getChatHistory(sessionId);
    }
}
