package tdm4;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.*;


public class Webcam {
	
	public static void main (String [] args0) throws IOException  {
		new Webcam().execute();
	}

	private void execute() throws IOException {
		URL url = new URL("http://127.0.0.1:8080/videostream.cgi?user=userir&pwd=userir&rate=14");
		URLConnection conn = url.openConnection();
		
		InputStream is = conn.getInputStream();
		
		byte[] bufferReception = new byte[4096];
		int tailleLuRead = 0;
		String msg = new String();
		
		int counterImage = 0;
		while ((tailleLuRead = is.read(bufferReception)) != -1) {
			
			int nbLuTotal = tailleLuRead;
			msg = new String(bufferReception, 0, nbLuTotal, "UTF-8");

			/*
			 * Le substring permet de récupérer la ligne du content-length !
			 */
			if (msg.contains("Content-Length: ")){
				String len = msg.substring(msg.indexOf("Content-Length: "), msg.lastIndexOf("\r\n"));
				int tailleImage = Integer.parseInt( len.substring(len.indexOf(' ')+1, len.lastIndexOf("\r\n")));
				System.out.println("taille "+tailleImage);
				
				byte[] bufferReceptionImage = new byte[tailleImage];
				int tailleImgLu = 0, readLen = 0;
				
				while (tailleImgLu < tailleImage){
					readLen  = is.read(bufferReceptionImage);
					float progression = ((float)tailleImgLu/(float)tailleImage)*100; 
					System.out.println("Progression : "+progression);
					tailleImgLu += readLen;
					/* */
				}
				System.out.println("Transfert #"+counterImage+" (taille : +"+tailleImage+") terminé!");
				FileOutputStream fos = new FileOutputStream("C:\\Users\\utilisateur\\Desktop\\img\\image"+counterImage+".jpeg");
				counterImage++;
				fos.write(bufferReceptionImage);
			}
		}
		
		
	}
}
