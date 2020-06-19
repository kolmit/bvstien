package com.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.model.Commande;
import com.parser.CommandeParser;
import com.runner.CommandeRunner;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class VolumeController {
	
	@Autowired
	private CommandeParser parser;
	@Autowired
	private CommandeRunner commandRunner;
	
	private Integer currentVolume = null;
	private boolean muted;

	private final double tickVolume = 655.35; // 
	private final String speakersOutput = "Haut-parleurs";

    public VolumeController() {
    }

    
    @GetMapping("/volume")
    public Integer getCurrentVolume() {
    	return currentVolume;
    }
    
    @GetMapping("/muted")
    public boolean getCurrentMuted() {
    	return muted;
    }

	
	private Integer firstVolumeAcquisition() {
		String[] initOutput = {"nircmd", "setdefaultsounddevice", "\""+ speakersOutput + "\""};
		commandRunner.execute(initOutput);
		
		String[] initVolume = {"nircmd", "changesysvolume", "-65535"};
		commandRunner.execute(initVolume);
		return 0;
	}
	
    @PostMapping("/volume")
    public int sendCommande(@RequestBody Commande cmd) {
    	if (cmd.getRadical() == null && cmd.getArguments() == null) {
    		return -1;
    	}
    	else {
    		if (this.currentVolume == null) {
    			this.currentVolume = this.firstVolumeAcquisition();
    		}
    		
    		int volumeValue = computeVolumeValue(cmd);
        	String[] commandToExecute = this.parser.parse(cmd);
        	
        	if (commandRunner.execute(commandToExecute)) {
    			this.currentVolume = volumeValue;
    		}
    	}
    	
    	return this.currentVolume;
    }
    
    @PostMapping("/muteVolume")
    public boolean muteVolume(@RequestBody Commande cmd) {
    	String[] commandToExecute = this.parser.parse(cmd);
    	
    	if (commandRunner.execute(commandToExecute)) {
			this.muted = cmd.getArguments().matches("1") ? true : false;
		}
    	return this.muted;
    }

   /*
    * On fait la différence notée "x" entre : 
    * - la valeur (entre 0 et 100) du volume actuel
    * - la valeur envoyée depuis le front
    *  
    * 
    * Pour ensuite multiplier le résultat obtenu (+x ou -x) 
    * */
	private int computeVolumeValue(Commande cmd) {
		Integer valeurSliderConverted = Integer.parseInt(cmd.getArguments().trim());
		Boolean valeurNircmdPositive = (valeurSliderConverted > this.currentVolume);
		int coefficient;
		double valeurNircmd;
		
		if (valeurNircmdPositive) {
			coefficient = valeurSliderConverted - this.currentVolume;
			valeurNircmd = (coefficient * this.tickVolume);
		}
		else {
			coefficient = this.currentVolume - valeurSliderConverted;
			valeurNircmd = (coefficient * this.tickVolume);
			valeurNircmd = -valeurNircmd; // On baisse le volume, donc négatif
		}
		cmd.setArguments(new String(valeurNircmd + ""));
		
		return valeurSliderConverted;
	}
}
