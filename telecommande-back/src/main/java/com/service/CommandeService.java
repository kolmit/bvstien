package com.service;

import com.model.ShutdownCommand;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public interface CommandeService {
    ShutdownCommand sendShutdown(ShutdownCommand shutdownCommand);
    boolean cancelShutdown();
    Duration getCount();
    boolean switchMonitor();
}
