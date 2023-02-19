package com.rest.controller;

import com.model.ShutdownCommand;
import com.service.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CommandeController {

   	@Autowired
	CommandeService commandeService;
   	

   	@GetMapping("/shutdown")
	public Duration getCount() {
		return this.commandeService.getCount();
	}

	@PostMapping("/shutdown")
	public Integer sendShutdown(@RequestBody ShutdownCommand shutdownCommand) {
   		return this.commandeService.sendShutdown(shutdownCommand);
	}

	@GetMapping("/shutdown/cancel")
	public boolean cancelShutdown() {
		return this.commandeService.cancelShutdown();
	}
    
    @GetMapping("/switchMonitor")
    public boolean switchMonitor() {
    	return this.commandeService.switchMonitor();
    }
}