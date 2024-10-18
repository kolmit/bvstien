package com.rest.controller;

import com.model.ShutdownCommand;
import com.service.SiriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController()
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SiriController {

    @Autowired
    private SiriService siriService;

    @GetMapping("/siri/shutdown/now")
    public ShutdownCommand sendShutdown() {
        ShutdownCommand shutdownCommand = new ShutdownCommand(true, 0);
        return this.siriService.sendShutdown(shutdownCommand);
    }

    @GetMapping("/siri/muteVolume")
    public boolean muteVolume() {
        return this.siriService.muteVolume();
    }

    @GetMapping("/siri/unmuteVolume")
    public boolean unmuteVolume() {
        return this.siriService.unmuteVolume();
    }

    @GetMapping("/siri/lowerVolume")
    public int lowerVolume() {
        return this.siriService.lowerVolume();
    }

    @GetMapping("/siri/higherVolume")
    public int higherVolume() {
        return this.siriService.higherVolume();
    }
}