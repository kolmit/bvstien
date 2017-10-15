package tdm4;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageOutputStream;




public class Webcam {
	
	public static void main (String[] args ) throws IOException{
		new Webcam().execute();
	}
	

	private void execute() throws IOException {
		Socket socketConnexion = new Socket("192.168.130.225", 80); // 8080 pour le jar

		
		byte[] bufferR = new byte[1448];
		int longueurLu = 0, nbRead = 0;
		InputStream is = socketConnexion.getInputStream();

		while (longueurLu < nbRead ) {
			System.out.println("read");
			nbRead = is.read(bufferR);
			longueurLu += nbRead;
		}
		//FileOutputStream fos = new FileOutputStream("/home/gouzercb/Documents/png001");
		//System.out.println("Write");
		//fos.write(bufferR);
	}
}


