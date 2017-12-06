package tdm4;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FileTransfertClient {
	final String pathFileRequested = "Fichier=C:\\Users\\utilisateur\\Desktop\\WallPaper.rar$$$";
	final String pathDestFile = "C:\\Users\\utilisateur\\Desktop\\WallPaper2.rar";
	final String ipEcouteServeur = "127.0.0.1";
	final int portEcouteServeur = 5432;
	
	
	public static void main (String[] args) throws UnknownHostException, IOException, InterruptedException {
		new FileTransfertClient().executeWork();
	}
	

	
	private void executeWork() throws UnknownHostException, IOException, InterruptedException {
		/*
		 * 2. Connexion au serveur
		 */
		Socket socketClient = new Socket();
		InetSocketAddress adrDest = new InetSocketAddress(ipEcouteServeur, portEcouteServeur);
		socketClient.connect(adrDest);
		
		
		OutputStream streamVersServeur = socketClient.getOutputStream();
		InputStream is = socketClient.getInputStream();
		
		/*
		 * 3. On envoit le nom du fichier au serveur 
		 */
		System.out.println("Je voudrais le fichier : " + pathFileRequested + " s'il vous plait!" );
		streamVersServeur.write( pathFileRequested.getBytes() ); 

		/*
		 * 7. On récupère la taille envoyée par le serveur : 
		 * Groupe 0 : Taille=(([0-9]{1,9})[$]{3})
		 * Groupe 1 : (([0-9]{1,9})[$]{3})
		 * Groupe 2 : ([0-9]{1,9})
		 */
		String question = "";
		Pattern pattern = Pattern.compile("Taille=(([0-9]{1,9})[$]{3})");
		Matcher matcher = pattern.matcher(question);

		while ( !matcher.matches() ) {
	        byte[] bufR = new byte[2048];
	        int lenBufR = is.read(bufR);
	        String reponse = new String(bufR, 0, lenBufR); // récupération du fragment de données reçu
	        question += reponse; // ajout à notre chaîne de caractères d'accumulation
	        matcher = pattern.matcher(question); // On revérifie la chaîne
		}

		float tailleFichier = Integer.parseInt(matcher.group(2));
		System.out.println("Taille recue du serveur : "+tailleFichier);
		
		/*
		 * 8. Une fois qu'on a match la regex, on peut aller écrire le fichier que le serveur envoie !
		 */
		FileOutputStream fichierAEcrire = new FileOutputStream(pathDestFile);
		
		for (float indexRead = 0 ; indexRead < tailleFichier ; /* Rien */) {
			if (indexRead%100000 == 0) System.out.println( ((indexRead/tailleFichier)*100) +"%");
			
			byte[] bufferPourFichierRecu = new byte[4096];
			int nbByteLu = is.read(bufferPourFichierRecu, 0, 4096);
			if (nbByteLu == -1) break;
			indexRead += nbByteLu;
			fichierAEcrire.write(bufferPourFichierRecu, 0, nbByteLu);
		}
		
		socketClient.close();
	}
}
