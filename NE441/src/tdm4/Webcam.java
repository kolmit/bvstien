package tdm4;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.regex.*;
import java.net.*;

import com.sun.org.apache.xalan.internal.xsltc.compiler.Pattern;


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
		
		/*
		 * La regex : 	groupe 0 : ([\\s\\S]*--ipcamera\r\nContent-Type: image/jpeg\r\nContent-Length: ([0-9]*)\r\n\r\n)[\\s\\S]*
		 * 				groupe 1 : ([\\s\\S]*--ipcamera\r\nContent-Type: image/jpeg\r\nContent-Length: ([0-9]*)\r\n\r\n)
		 * 				groupe 2 : ([0-9]*)
		 */
        java.util.regex.Pattern pat = java.util.regex.Pattern.compile("([\\s\\S]*--ipcamera\r\nContent-Type: image/jpeg\r\nContent-Length: ([0-9]*)\r\n\r\n)[\\s\\S]*"); // On recherche le chunk "ipcamera" ainsi que ses attributs
        String question = "";
        Matcher mat = pat.matcher(question); // On initialise le matcher.
        
         
        while (!mat.matches()) {
            byte[] bufR = new byte[4096];
            int lenBufR = is.read(bufR, 0 , 4096);
            
            if (lenBufR <= 0) return;
            
            String reponse = new String(bufR, 0, lenBufR); // récupération du fragment de données reçu
            question += reponse; // ajout à notre chaîne de caractères d'accumulation
            mat = pat.matcher(question); // On revérifie la chaîne
        }
        
        int lenImage = Integer.parseInt(mat.group(2));
        System.out.println("Taille de l'image : "+lenImage);
		/*
		while ((tailleLuRead = is.read(bufferReception)) != -1) {
			
			int nbLuTotal = tailleLuRead;
			msg = new String(bufferReception, 0, nbLuTotal, "UTF-8");

			/*
			 * Le substring permet de r�cup�rer la ligne du content-length !
			 */
			
	        
	        
	        /*
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
				}
				
				System.out.println("Transfert #"+counterImage+" (taille : +"+tailleImage+") termine!");
				//FileOutputStream fos = new FileOutputStream("C:\\Users\\utilisateur\\Desktop\\img\\image"+counterImage+".jpeg");
				FileOutputStream fos = new FileOutputStream("/home/userir/Documents/"+counterImage+".jpg");

				counterImage++;
				fos.write(bufferReceptionImage);
			}
			
			
		}*/
		
		
	}
}
