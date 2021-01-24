package com.rest.controller;

import com.github.sarxos.webcam.Webcam;
import com.model.Position;
import com.runner.CommandeRunner;
import org.apache.catalina.connector.ClientAbortException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ImageController {
	
	@Autowired
	private CommandeRunner commandRunner;

	private Webcam webcam;

	@GetMapping(value = "/imageBureau", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<StreamingResponseBody> desktopStream() {

		BufferedImage bImage = this.commandRunner.generateScreenshot();
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		try {
			ImageIO.write(bImage, "jpeg", bos );
		} catch (IOException e) {
			System.out.println("Fermeture du stream.");
			try {
				bos.close();
			} catch (IOException ioException) {
				System.out.println("Même la fermeture de l'OutputStream a bugué, lol.");
			}
		}
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

	@GetMapping(value = "/imageWebcam", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<StreamingResponseBody> webcamStream() {

		if (this.webcam == null){
			this.webcam = Webcam.getDefault();
			this.webcam.setViewSize(new Dimension(640, 480));
		}

		if (!this.webcam.isOpen()) {
			this.webcam.open();
		}

		BufferedImage bImage = this.webcam.getImage();
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		try {
			if (bImage != null){
				ImageIO.write(bImage, "jpeg", bos );
			}
		} catch (IOException | IllegalArgumentException iae) {
			System.out.println("Fermeture du stream. " + iae.getMessage());
			try {
				bos.close();
				this.closeWebcam();
			} catch (IOException ioException) {
				System.out.println("Même la fermeture de l'OutputStream a bugué, lol.");
			}
		}
		byte [] data = bos.toByteArray();


		StreamingResponseBody body = (outputStream) -> {
			try {
				outputStream.write(data);
				outputStream.flush();
			} catch (ClientAbortException abort){
				System.out.println("Client Abort. Fermeture de la webcam.");
				this.closeWebcam();
				return;
			}
		};

		return new ResponseEntity<StreamingResponseBody>(body, HttpStatus.OK);
	}

	@GetMapping(value = "/closeWebcam")
	public boolean closeWebcam() {
		return this.webcam.close();
	}
}