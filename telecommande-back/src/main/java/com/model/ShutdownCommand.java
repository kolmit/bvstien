package com.model;

import java.time.LocalDateTime;

public class ShutdownCommand {
    private Boolean isShutdown;
    private LocalDateTime shutdownRequestHour;
    private Integer time;

    public ShutdownCommand(Boolean isShutdown, Integer time) {
        this.isShutdown = isShutdown;
        this.time = time;
    }

    public Boolean isShutdown() {
        return isShutdown;
    }

    public void setShutdown(Boolean shutdown) {
        isShutdown = shutdown;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        time = time;
    }

    public LocalDateTime getShutdownRequestHour() {
        return shutdownRequestHour;
    }

    public void setShutdownRequestHour(LocalDateTime shutdownRequestHour) {
        this.shutdownRequestHour = shutdownRequestHour;
    }
}
