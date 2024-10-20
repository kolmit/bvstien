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
import java.util.Timer;
import java.util.TimerTask;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ImageController {
	
	@Autowired
	CommandeRunner commandRunner;

	private Webcam webcam;

	private Timer closeWebcamTimer;
	private TimerTask timerTask;
	private final int CLOSE_WEBCAM_DELAY = 10000;

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
	public void sendLeftClick(@RequestBody Position body) {
		commandRunner.doLeftClick(body.getxPosition(), body.getyPosition());
	}


	@GetMapping(value = "/imageWebcam", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<StreamingResponseBody> webcamStream() {
		try {
			if (this.webcam == null) {
				this.webcam = Webcam.getDefault();
				this.webcam.setViewSize(new Dimension(640, 480));
			}
			this.openWebcamAndStartCount();
			byte[] data = getImageData();

			StreamingResponseBody body = (outputStream) -> {
				try {
					outputStream.write(data);
					outputStream.flush();
				} catch (ClientAbortException e) {
					System.out.println("Client Abort. Fermeture de la webcam.");
					this.closeWebcam();
				}
			};

			return new ResponseEntity<>(body, HttpStatus.OK);
		} catch (Exception e) {
			this.closeWebcam();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	private byte[] getImageData() throws IOException {
		BufferedImage bImage = this.webcam.getImage();
		ByteArrayOutputStream bos = new ByteArrayOutputStream();

		if (bImage != null) {
			ImageIO.write(bImage, "jpeg", bos);
		} else {
			bos.close();
			throw new IOException("Fermeture du stream.");
		}

		return bos.toByteArray();
	}


	private void openWebcamAndStartCount() {
		if (this.webcam.isOpen()) {
			this.refreshCount();
		} else {
			this.webcam.open();
		}
	}


	/**
	 * Permet de faire en sorte que la webcam se ferme après 10s d'inactivté
	 */
	private void refreshCount() {
		if (this.closeWebcamTimer == null){
			this.closeWebcamTimer = new java.util.Timer();
		} else {
			this.timerTask.cancel();
		}
		this.timerTask = new java.util.TimerTask() {
			@Override
			public void run() {
				closeWebcam();
			}
		};
		this.closeWebcamTimer.schedule(timerTask, CLOSE_WEBCAM_DELAY);
	}


	@GetMapping(value = "/closeWebcam")
	public boolean closeWebcam() {
		return this.webcam.close();
	}
}