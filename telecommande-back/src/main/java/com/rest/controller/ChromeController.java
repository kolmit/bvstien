package com.rest.controller;

import com.constant.Constants;
import com.parser.CommandeParser;
import com.runner.CommandeRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.awt.event.KeyEvent;
import java.util.*;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ChromeController {
	
	@Autowired
	private CommandeParser parser;
	@Autowired
	private CommandeRunner commandRunner;
   	
   	private String currentMedia;
	private boolean fullscreenOn = false;
	
   	private Map<String, String> mapChaineUrl = new HashMap<String, String>();

   	
   	@PostConstruct
   	private void init() {
   		this.mapChaineUrl.put("tf1", "\"https://www.tf1.fr/tf1/direct\"");
   		this.mapChaineUrl.put("m6", "\"https://www.6play.fr/m6/direct\"");
   		this.mapChaineUrl.put("fr2", "\"https://www.france.tv/france-2/direct.html\"");
   		this.mapChaineUrl.put("fr3", "\"https://www.france.tv/france-3/direct.html\"");
   		this.mapChaineUrl.put("fr4", "\"https://www.france.tv/france-4/direct.html\"");
		this.mapChaineUrl.put("fr5", "\"https://www.france.tv/france-5/direct.html\"");
		this.mapChaineUrl.put("arte", "\"https://www.arte.tv/fr/direct/\"");
   		this.mapChaineUrl.put("fro", "\"https://www.france.tv/france-o/direct.html\"");
   		this.mapChaineUrl.put("bfm", "\"https://www.bfmtv.com/mediaplayer/live-video\"");
   		this.mapChaineUrl.put("cnews", "\"https://www.canalplus.com/live/?channel=480\"");
   		this.mapChaineUrl.put("c8", "\"https://www.canalplus.com/live/?channel=450\"");
   		this.mapChaineUrl.put("cstar", "\"https://www.canalplus.com/live/?channel=513\"");
   		this.mapChaineUrl.put("w9", "\"https://www.6play.fr/w9/direct\"");
   		this.mapChaineUrl.put("tfx", "\"https://www.tf1.fr/tfx/direct\"");
   		this.mapChaineUrl.put("tmc", "\"https://www.tf1.fr/tmc/direct\"");
   	}

    
    @GetMapping("/tv")
    public boolean getTvChannel(@RequestParam(value = "chaine") String chaine) {
		String commandToParse = Constants.getCommand(Constants.CMD_CHROME, this.mapChaineUrl.get(chaine));
		List<String> commandToExecute = this.parser.parseString(commandToParse);

		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		if (this.currentMedia != null) {
			this.currentMedia = this.closeCurrentChromeTab() ? null : this.currentMedia;
		}
		this.currentMedia = commandRunner.executeV2(commandToExecute) ? chaine : this.currentMedia;
		
		return (this.currentMedia != null);
    }


    @GetMapping("/youtube")
    public boolean getYoutube(@RequestParam(value = "idVideo") String idVideo) {
		String commandToParse = Constants.getCommand(Constants.CMD_CHROME, idVideo);
		List<String> commandToExecute = this.parser.parseString(commandToParse);

		return commandRunner.executeV2(commandToExecute);
    }

    
    @GetMapping("/switchPause")
    public boolean getSwitchPause() {
    	return this.commandRunner.pressCombination(new ArrayList<>(Collections.singletonList(KeyEvent.VK_BACK_SPACE)));
    }
    
    
    @PostMapping("/fullscreen")
    public boolean postFullScreen(@RequestBody String body) {
    	if (this.currentMedia.equalsIgnoreCase("bfm")) {
    		System.out.println("equals bfm");
    		commandRunner.runFullScreenBfm();
    		this.fullscreenOn = !this.fullscreenOn;

    	} else if (this.currentMedia.matches("(.*)tf1(.*)")) {
    		commandRunner.runFullScreenTf();
    		this.fullscreenOn = !this.fullscreenOn;
    	} else {
    		if (this.commandRunner.pressCombination(Collections.singletonList((KeyEvent.VK_F)))) {
        		this.fullscreenOn = !this.fullscreenOn;
        	}
    	}
    	
    	
    	return this.fullscreenOn;
    }
    
    
    @GetMapping("/killChrome")
    public boolean killChrome() {
		String commandToParse = Constants.getCommand(Constants.CMD_KILL_CHROME);
		List<String> cmdKillChrome = this.parser.parseString(commandToParse);
		
		return commandRunner.executeV2(cmdKillChrome);
    }
    
    
    @GetMapping("/closeCurrentChromeTab")
    public boolean closeCurrentChromeTab() {
    	// Pour quitter le mode fullscreen, au cas où.
    	commandRunner.pressCombination( Collections.singletonList(KeyEvent.VK_ESCAPE) ); 
    	
		ArrayList<Integer> cmdCloseTab = new ArrayList<Integer>();
    	cmdCloseTab.add(KeyEvent.VK_CONTROL);
    	cmdCloseTab.add(KeyEvent.VK_W);
    	
    	if (commandRunner.pressCombination(cmdCloseTab)) {
    		this.currentMedia = null; 
    		return true;
    	} else {
    		return false;
    	}
    }

    @GetMapping("/currentMedia")
	public ResponseEntity<String> getCurrentMedia() {
		return new ResponseEntity<>(currentMedia, HttpStatus.OK);
	}

	public void setCurrentMedia(String currentMedia) {
		this.currentMedia = currentMedia;
	}

    @GetMapping("/fullscreen")
	public boolean getFullscreen() {
		return fullscreenOn;
	}


	public void setFullscreenOn(boolean fullscreenOn) {
		this.fullscreenOn = fullscreenOn;
	}
}
