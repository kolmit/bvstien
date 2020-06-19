package com.rest.controller;

import java.awt.event.KeyEvent;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.model.Commande;
import com.parser.CommandeParser;
import com.runner.CommandeRunner;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CommandeController {
	
	Integer shutdownIn;
 
   	@Autowired
	private CommandeParser parser;

   	@Autowired
   	private CommandeRunner commandRunner;
   	
   	
   	@GetMapping("/shutdown")
   	public Integer getShutdownCount() {
   		return this.shutdownIn;
   	}

 
    @PostMapping("/shutdown")
    public Integer sendShutdown(@RequestBody Commande cmd) {
    	if (cmd.getRadical() == null && cmd.getArguments() == null) {
    		return null;
    	}
    	else {
    		String[] commandToExecute = this.parser.parse(cmd);
        	if (commandRunner.execute(commandToExecute)) {
        		String number = cmd.getArguments().replaceAll("[^0-9]", "");
        		this.shutdownIn = Integer.parseInt(number);
        	}
    	}
    	return shutdownIn;
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