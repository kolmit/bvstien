package com.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public interface VolumeService {
    boolean muteVolume(@RequestBody String muteOrUnmute);
    int changeVolumeFromSlider(@RequestBody String cmd);
    boolean getCurrentMuted();
    Integer getCurrentVolume();
    int changeVolumeFromSiri(Integer volumeVariation);
}
