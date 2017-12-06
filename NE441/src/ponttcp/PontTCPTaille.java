package ponttcp;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;


/**
 * Pour choper la taille avec netcat : 
 * netcat 127.0.0.1 8000 | wc --bytes
 *
 */

public class PontTCPTaille {
	
	private final String ipEcouteServeur1 = "127.0.0.1";
	private final int portEcouteServeur1 = 8000;
	
	
	public static void main (String [] args) throws IOException {
		new PontTCPTaille().execute();
	}

	
	private void execute() throws IOException {
		/*
		 *  Connexion au serveur1
		 */
		Socket socketClient = new Socket();
		InetSocketAddress adrDest = new InetSocketAddress(ipEcouteServeur1 , portEcouteServeur1 );
		socketClient.connect(adrDest);

		/*
		 * On attend que le PontTCP se connecte à notre socket 
		 */
		ServerSocket socketPont = new ServerSocket(8201); 
		System.out.println("On attend le PontTCP ...");
		Socket socketConnexionPont = socketPont.accept(); // on attend PontTCP sur le port 8201
		System.out.println("PontTCP connecté !");
		
		/*
		 * On ouvre les stream
		 */
		InputStream isServeur1 = socketClient.getInputStream();
		OutputStream osPont = socketConnexionPont.getOutputStream();
		
		int nbByteLu = 0;
		
		while (true) { // Boucle sans grande importance puisque la vérif se fait DANS la boucle
			byte[] bufferTmp = new byte[10000];
			nbByteLu = isServeur1.read(bufferTmp , 0, bufferTmp.length);
			if (nbByteLu == -1) return;
			osPont.write(bufferTmp, 0, nbByteLu);
		}
		
		
		/* 
		 * Serveur1 --> PontTCPTaille --> Fichier 
		 */
		/*
		InputStream is = socketClient.getInputStream();		
		FileOutputStream fichierAEcrire =  new FileOutputStream("dummy");
		int nbByteLu = 0;
		int totalFile = 0;
		

		
		while (nbByteLu >= 0) {
			byte[] bufferPourFichierRecu = new byte[100000];
			nbByteLu = is.read(bufferPourFichierRecu, 0, 100000)
			totalFile += nbByteLu;
			fichierAEcrire.write(bufferPourFichierRecu, 0, nbByteLu);
		}
		
		System.out.println("Le fichier a une taille de : "+totalFile);
		*/
		
	}
}
