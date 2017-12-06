package ponttcp;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;

public class PontTCPTaille {
	
	private final String ipEcouteServeur1 = "127.0.0.1";
	private final int portEcouteServeur1 = 8000;
	
	
	public static void main (String [] args) throws IOException {
		new PontTCPTaille().execute();
	}

	
	private void execute() throws IOException {
		/*
		 * 1. Connexion au serveur
		 */
		Socket socketClient = new Socket();
		InetSocketAddress adrDest = new InetSocketAddress(ipEcouteServeur1 , portEcouteServeur1 );
		socketClient.connect(adrDest);
		
		
		InputStream is = socketClient.getInputStream();		
		FileOutputStream fichierAEcrire =  new FileOutputStream("dummy");
		byte[] bufferPourFichierRecu = new byte[100000];
		int nbByteLu = 0;
		int totalFile = 0;
		

		while ((nbByteLu = is.read(bufferPourFichierRecu, 0, 100000)) >= 0) {
			totalFile += nbByteLu;
			fichierAEcrire.write(bufferPourFichierRecu, 0, nbByteLu);
		}
		
		System.out.println("Le fichier a une taille de : "+totalFile);

		
	}
}
