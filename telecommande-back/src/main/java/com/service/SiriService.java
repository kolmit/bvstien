package com.service;

import com.model.ShutdownCommand;
import org.springframework.stereotype.Service;

@Service
public interface SiriService {
    ShutdownCommand sendShutdown(ShutdownCommand shutdownCommand);
    boolean muteVolume();
    boolean unmuteVolume();
    int lowerVolume();
    int higherVolume();
}
