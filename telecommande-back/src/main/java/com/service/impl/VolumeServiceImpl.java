package com.service.impl;

import com.constant.Constants;
import com.parser.CommandeParser;
import com.runner.CommandeRunner;
import com.service.CommandeService;
import com.service.VolumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VolumeServiceImpl implements VolumeService {

    @Autowired
    private CommandeService commandeService;

    @Autowired
    private CommandeParser parser;

    @Autowired
    private CommandeRunner commandRunner;

    private Integer currentVolume;
    private boolean muted;

    private final double tickVolume = 655.35; // 65535/100 (100 étant le nombre de pas sur le slider du front)
    private final String speakersOutput = "\"Haut-parleurs\"";
    private final String headsetOutput = "\"Casque\"";
    private String currentSoundDevice;

    /**
     * @param muteOrUnmute : Vaut "1" si l'action est MUTE ou "0" si UNMUTE.
     *                       Note à moi-même 2 ans + tard ; pas ouf cette façon le paramètre...
     */
    @Override
    public boolean muteVolume(String muteOrUnmute) {
        String commandToParse = Constants.getCommand(Constants.CMD_VOLUME_MUTE, muteOrUnmute);
        List<String> commandToExecute = this.parser.parseString(commandToParse);

        this.switchSoundDevice(this.speakersOutput);

        commandRunner.execute(commandToExecute);
        this.muted = muteOrUnmute.matches("1");

        return this.muted;
    }


    @Override
    public int changeVolumeFromSiri(Integer volumeVariation) {
        Double volumeValue = computeVolumeValue(volumeVariation.toString());
        return this.executeVolumeChange(volumeValue);
    }


    @Override
    public int changeVolumeFromSlider(String sliderValue) {
        if (this.currentVolume == null) {
            this.currentVolume = this.firstVolumeAcquisition();
        }
        Double volumeValue = computeVolumeValue(sliderValue);
        return this.executeVolumeChange(volumeValue);
    }


    @Override
    public boolean getCurrentMuted() {
        return false;
    }


    @Override
    public Integer getCurrentVolume() {
        return null;
    }


    private int executeVolumeChange(Double volumeVariation) {
        String commandToParse = Constants.getCommand(Constants.CMD_VOLUME_CHANGE, String.valueOf(volumeVariation));
        List<String> commandToExecute = this.parser.parseString(commandToParse);
        commandRunner.execute(commandToExecute);
        return this.currentVolume != null ? this.currentVolume : 0;
    }

    /**
     * Met le volume à zéro (pour la 1ère acquisition)
     * @return le volume
     */
    private Integer firstVolumeAcquisition() {
        String commandToParse = Constants.getCommand(Constants.CMD_VOLUME_CHANGE, "-65535");
        List<String> commandToExecute = this.parser.parseString(commandToParse);

        if (commandRunner.execute(commandToExecute)) {
            this.switchSoundDevice(this.speakersOutput);
        }
        return 0;
    }


    private String switchSoundDevice(String deviceToSwitchOn) {
        String commandToParse = Constants.getCommand(Constants.CMD_VOLUME_SET_DEVICE, deviceToSwitchOn);
        List<String> commandToExecute = this.parser.parseString(commandToParse);

        if (commandRunner.execute(commandToExecute)){
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
    private Double computeVolumeValue(String volume) {
        Integer valeurSliderConverted = Integer.parseInt(volume.trim());
        double valeurNircmd;
        if (this.currentVolume != null) {
            int coefficient = Math.abs(valeurSliderConverted - this.currentVolume);
            valeurNircmd = coefficient * this.tickVolume;

            if (valeurSliderConverted < this.currentVolume) {
                valeurNircmd = -valeurNircmd;
            }
        } else {
            valeurNircmd = valeurSliderConverted * this.tickVolume;
        }

        this.currentVolume = valeurSliderConverted;

        return valeurNircmd;
    }
}