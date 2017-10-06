package tdm4;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.net.UnknownHostException;

public class FileTransfertClient {
	final String pathFileRequested = "C:\\Users\\utilisateur\\Desktop\\Key.txt";

	
	public static void main (String[] args) throws UnknownHostException, IOException, InterruptedException {
		new FileTransfertClient().execute();
	}
	

	private void execute() throws UnknownHostException, IOException, InterruptedException {
		Socket socketClient = new Socket("127.0.0.1", 5432);
		
		OutputStream os = socketClient.getOutputStream();
		System.out.println("Je voudrais le fichier : " + pathFileRequested + " s'il vous plait!" );
		os.write(pathFileRequested.getBytes());
		
		
		/* On attend que le serveur envoie la taille du fichier */
		InputStream is = socketClient.getInputStream();
		
		byte[] bufferReception = new byte[4096];
		int tailleLuRead = 0;
		String msg = new String();
		
		while (!msg.contains("§")) {
			tailleLuRead = is.read(bufferReception);
			int nbLuTotal = tailleLuRead;
			msg = new String(bufferReception, 0, nbLuTotal, "UTF-8");
		}
		
		int tailleFile = Integer.parseInt( msg.substring(0, msg.length()-1) );
		System.out.println("Taille du fichier : "+tailleFile+" octets.");
		
		
		
		/* Il faut OBLIGATOIREMENT changer la taille du buffeur de réception 
		 * Si on le laisse à 4096, on ne recevra tout le fichier mais le début 
		 * sera écrasé par les 4096 derniers octets.
		 */
		bufferReception = new byte[tailleFile];
		int nbLuTotal = 0;
		tailleLuRead = 0;
		//Thread.sleep(2000);
		
		
		/* On lit l'inputstream jusqu'à atteindre la taille envoyée */
		while (nbLuTotal < tailleFile ) {
			tailleLuRead = is.read(bufferReception);
			nbLuTotal += tailleLuRead;
		}
		System.out.println("Recu : "+nbLuTotal+" octets.");
		FileOutputStream fos = new FileOutputStream("C:\\Users\\utilisateur\\Desktop\\Key2.txt");
		fos.write(bufferReception);
		
		os.close();
		fos.close();
		is.close();
	}
	
	
}
