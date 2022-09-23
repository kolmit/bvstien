package com.rest.controller;

import com.constant.Constants;
import com.model.ShutdownCommand;
import com.runner.CommandeRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class VocalController {

    @Autowired
    private CommandeRunner commandRunner;

    @Autowired
    private CommandeController commandeController;

    @Autowired
    private VolumeController volumeController;


    @PostMapping(value="/vocalCommand")
    public boolean vocalCommand(@RequestBody String vocal) throws NoSuchFieldException, IllegalAccessException {
        return findMatchingMethod(vocal);
    }

    private boolean findMatchingMethod(String vocal) {
        String cmdFound = findMatchingCommand(vocal);
        if (cmdFound == null) return false;

        switch ( cmdFound ) {
            case Constants.SHUTDOWN_REGEX: {
                ShutdownCommand shutdownCommand = new ShutdownCommand(true, 0);
                return commandeController.sendShutdown(shutdownCommand) != null;
            }
            default:
                return false;
        }
    }

    private String findMatchingCommand(String vocal) {
        return Constants.REGEX_COMMANDS.stream()
                .filter(cmdRegex -> vocal.matches(cmdRegex))
                .findFirst()
                .orElse(null);
    }
}