package com.rest.controller;

import com.constant.Constants;
import com.parser.CommandeParser;
import com.runner.CommandeRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class VolumeController {
	
	@Autowired
	private CommandeParser parser;
	@Autowired
	private CommandeRunner commandRunner;
	
	private Integer currentVolume = null;
	private boolean muted;

	private final double tickVolume = 655.35; // 65535/100 (100 étant le nombre de pas sur le slider du front)
	private final String speakersOutput = "\"Haut-parleurs\"";
	private final String headsetOutput = "\"Casque pour téléphone\"";
	private String currentSoundDevice;

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

	/**
	 * Met le volume à zéro (pour la 1ère acquisition)
	 * @return le volume
	 */
	private Integer firstVolumeAcquisition() {
		String commandToParse = Constants.getCommand(Constants.CMD_VOLUME_CHANGE, "-65535");
		List<String> commandToExecute = this.parser.parseString(commandToParse);

		if (commandRunner.executeV2(commandToExecute)) {
			this.switchSoundDevice(this.speakersOutput);
		}
		return 0;
	}
	
    @PostMapping("/volume")
    public int changeVolume(@RequestBody String cmd) {
		if (this.currentVolume == null) {
			this.currentVolume = this.firstVolumeAcquisition();
		}

		int volumeValue = computeVolumeValue(cmd);

		String commandToParse = Constants.getCommand(Constants.CMD_VOLUME_CHANGE, String.valueOf(volumeValue));
		List<String> commandToExecute = this.parser.parseString(commandToParse);

		commandRunner.executeV2(commandToExecute);

    	return this.currentVolume;
    }
    
    @PostMapping("/muteVolume")
    public boolean muteVolume(@RequestBody String muteOrUnmute) {
		String commandToParse = Constants.getCommand(Constants.CMD_VOLUME_MUTE, muteOrUnmute);
		List<String> commandToExecute = this.parser.parseString(commandToParse);

		this.switchSoundDevice(this.speakersOutput);

		commandRunner.executeV2(commandToExecute);
		this.muted = muteOrUnmute.matches("1");

		return this.muted;
    }


	private String switchSoundDevice(String deviceToSwitchOn) {
		String commandToParse = Constants.getCommand(Constants.CMD_VOLUME_SET_DEVICE, deviceToSwitchOn);
		List<String> commandToExecute = this.parser.parseString(commandToParse);

		if (commandRunner.executeV2(commandToExecute)){
			this.currentSoundDevice = deviceToSwitchOn;
		}

		return this.currentSoundDevice;
	}

   /*
    * On fait la différence notée "x" entre : 
    * - la valeur (entre 0 et 100) du volume actuel
    * - la valeur envoyée depuis le front
    *  
    * 
    * Pour ensuite multiplier le résultat obtenu (+x ou -x) 
    * */
	private int computeVolumeValue(String volume) {
		Integer valeurSliderConverted = Integer.parseInt(volume.trim());
		boolean valeurNircmdPositive = (valeurSliderConverted > this.currentVolume);
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
		this.currentVolume = valeurSliderConverted;

		return (int) valeurNircmd;
	}
}
