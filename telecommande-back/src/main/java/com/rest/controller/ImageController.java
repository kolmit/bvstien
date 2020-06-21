package com.rest.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.support.ServletContextResource;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import com.model.Position;
import com.runner.CommandeRunner;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ImageController {
	
	@Autowired
	private CommandeRunner commandRunner;

	/*@GetMapping(value= "/imageBureau", produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] getImageWithMediaType() throws IOException {
		BufferedImage bImage = this.commandRunner.generateScreenshot();
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		ImageIO.write(bImage, "jpeg", bos );
		byte [] data = bos.toByteArray();
		
		bImage.flush();
		bos.close();
	    return data;
	}*/
	
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

			
			/*
	public ResponseEntity<InputStreamResource> image() throws IOException {
	    BufferedImage canvas = ImageIO.read(new File("ressource/screenshot_dualmonitor.png"));

	    StreamingResponseBody stream = outputStream ->
	            ImageIO.write(canvas, "png", outputStream);

	    return ResponseEntity.ok()
	        .contentType(MediaType.IMAGE_PNG)
	        .body(stream);
	}*/
	
	@PostMapping(value="/leftclick", consumes = "application/json")
	public boolean sendLeftClick(@RequestBody Position body) {
		commandRunner.doLeftClick(body.getxPosition(), body.getyPosition());
		return false;
		
	}
}
