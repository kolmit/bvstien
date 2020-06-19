package com.rest.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
	/*
	@Autowired
	private final SimpMessagingTemplate template;
	
	@Autowired
	WebSocketController(SimpMessagingTemplate template ){
		this.template = template;
	}
	
	@MessageMapping("/send/message")
	public void onReceivedMessage(String msg) {
		this.template.convertAndSend("/chat", msg + "hello");
	}*/
}
