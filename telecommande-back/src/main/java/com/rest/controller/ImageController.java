package com.rest.controller;

import com.model.Position;
import com.runner.CommandeRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ImageController {
	
	@Autowired
	private CommandeRunner commandRunner;

	
	@GetMapping(value = "/imageBureau", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<StreamingResponseBody> runJobAndGetLogs() throws IOException {

		BufferedImage bImage = this.commandRunner.generateScreenshot();
		ByteArrayOutputStream bos = new ByteArrayOutputStream();		
		ImageIO.write(bImage, "jpeg", bos );
		byte [] data = bos.toByteArray();
		
	    
	    StreamingResponseBody body = (outputStream) -> {
                outputStream.write(data);
                outputStream.flush();
	        };
	    

	    return new ResponseEntity<StreamingResponseBody>(body, HttpStatus.OK);
	}

	
	@PostMapping(value="/leftclick", consumes = "application/json")
	public boolean sendLeftClick(@RequestBody Position body) {
		commandRunner.doLeftClick(body.getxPosition(), body.getyPosition());
		return false;
	}
}