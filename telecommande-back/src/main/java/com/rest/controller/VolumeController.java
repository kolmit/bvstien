package com.rest.controller;

import com.service.VolumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class VolumeController {

	@Autowired
    VolumeService volumeService;
    
    @GetMapping("/volume")
    public Integer getCurrentVolume() {
    	return this.volumeService.getCurrentVolume();
    }
    
    @GetMapping("/muted")
    public boolean getCurrentMuted() {
		return this.volumeService.getCurrentMuted();
    }

	
    @PostMapping("/volume")
    public int changeVolume(@RequestBody String cmd) {
		return this.volumeService.changeVolume(cmd);
    }

	@PostMapping("/muteVolume")
    public boolean muteVolume(@RequestBody String muteOrUnmute) {
		return this.volumeService.muteVolume(muteOrUnmute);
    }
}