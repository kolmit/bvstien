package com.rest.controller;

import com.constant.Constants;
import com.model.ShutdownCommand;
import com.parser.CommandeParser;
import com.runner.CommandeRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.event.KeyEvent;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CommandeController {
	private Integer shutdownIn;
	private LocalDateTime shutdownRequestHour;
 
   	@Autowired
	private CommandeParser parser;

   	@Autowired
   	private CommandeRunner commandRunner;
   	

   	@GetMapping("/shutdown")
	public Duration getCount() {
		Duration dur = null;
   		if (this.shutdownRequestHour != null && this.shutdownIn != null) {
			dur = Duration.between(LocalDateTime.now().withNano(0), this.shutdownRequestHour.plusSeconds(this.shutdownIn).withNano(0));
		}
		return dur;
	}

	@PostMapping("/shutdown")
	public Integer sendShutdown(@RequestBody ShutdownCommand shutdownCommand) {

   		String commandType = shutdownCommand.isShutdown() ? Constants.CMD_SHUTDOWN : Constants.CMD_STANDBY;
		String commandToParse = Constants.getCommand(commandType, shutdownCommand.getTime() != null ? shutdownCommand.getTime().toString() : null);
		List<String> commandToExecute = this.parser.parseString(commandToParse);

		if (commandRunner.executeV2(commandToExecute)) {
			this.shutdownRequestHour = LocalDateTime.now();
			this.shutdownIn = shutdownCommand.getTime();
		}
		return shutdownIn;
	}

	@GetMapping("/shutdown/cancel")
	public boolean cancelShutdown() {
		String commandToParse = Constants.getCommand(Constants.CMD_CANCEL_SHUTDOWN);
		List<String> commandToExecute = this.parser.parseString(commandToParse);

		if (commandRunner.executeV2(commandToExecute)) {
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