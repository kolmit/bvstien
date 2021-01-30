package com.rest.controller;

import com.model.Commande;
import com.parser.CommandeParser;
import com.runner.CommandeRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.event.KeyEvent;
import java.time.LocalDateTime;
import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CommandeController {

	Integer shutdownIn;
	LocalDateTime shutdownRequestHour;
 
   	@Autowired
	private CommandeParser parser;

   	@Autowired
   	private CommandeRunner commandRunner;
   	
   	
   	@GetMapping("/shutdown")
   	public LocalDateTime getShutdownCount() {
   		return this.shutdownRequestHour != null ? this.shutdownRequestHour
				.plusSeconds(this.shutdownIn)
				.minusHours(LocalDateTime.now().getHour())
				.minusMinutes(LocalDateTime.now().getMinute())
				.minusSeconds(LocalDateTime.now().getSecond()) : null;
   	}

 
    @PostMapping("/shutdown")
    public Integer sendShutdown(@RequestBody Commande cmd) {
   		this.shutdownRequestHour = LocalDateTime.now();
    	if (cmd.getRadical() == null && cmd.getArguments() == null) {
    		return null;
    	}
    	else {
    		String[] commandToExecute = this.parser.parse(cmd);
        	if (commandRunner.execute(commandToExecute)) {
        		String number = cmd.getArguments().replaceAll("[^0-9]", "");
        		try {
					this.shutdownIn = Integer.parseInt(number);
				} catch (NumberFormatException e){
        			System.out.println("Ce n'est pas un nombre ! => " + e.getMessage());
				}
        	}
    	}
    	return shutdownIn;
    }

	@GetMapping("/shutdown/cancel")
	public boolean cancelShutdown() {
   		Commande cmdCancel = new Commande("shutdown", "-a");
		String[] commandToExecute = this.parser.parse(cmdCancel);

		if (commandRunner.execute(commandToExecute)) {
			this.shutdownIn = null;
			this.shutdownRequestHour = null;
			return true;
		}
		return false;
	}
    
    @GetMapping("/switchMonitor")
    public boolean switchMonitor() {
    	ArrayList<Integer> cmdSwitchMonitor = new ArrayList<Integer>();
    	cmdSwitchMonitor.add(KeyEvent.VK_WINDOWS);
    	cmdSwitchMonitor.add(KeyEvent.VK_SHIFT);
    	cmdSwitchMonitor.add(KeyEvent.VK_LEFT);
    	
    	return commandRunner.pressCombination(cmdSwitchMonitor);
    }

    
}