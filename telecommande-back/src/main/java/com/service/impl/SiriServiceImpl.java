package com.service.impl;

import com.model.ShutdownCommand;
import com.service.CommandeService;
import com.service.SiriService;
import com.service.VolumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SiriServiceImpl implements SiriService {

    @Autowired
    private CommandeService commandeService;

    @Autowired
    private VolumeService volumeService;

    @Override
    public Integer sendShutdown(ShutdownCommand shutdownCommand) {
       return this.commandeService.sendShutdown(shutdownCommand);
    }

    @Override
    public boolean muteVolume() {
        return this.volumeService.muteVolume("1");
    }

    @Override
    public boolean unmuteVolume() {
        return this.volumeService.muteVolume("0");
    }

    @Override
    public int lowerVolume() {
        return this.volumeService.changeVolumeFromSiri(-33);
    }

    @Override
    public int higherVolume() {
        return this.volumeService.changeVolumeFromSiri(33);
    }
}