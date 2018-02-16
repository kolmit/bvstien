
package tdm4;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FileTransfert {
	final int portEcouteServeur = 5432;
	
	public static void main (String[] args ) throws IOException, InterruptedException {
		FileTransfert serveur = new FileTransfert();
		serveur.execute();
	}
	

	private void execute() throws IOException, InterruptedException {
		/* 
		 * 1. On attend le client 
		 */
		ServerSocket socketListen = new ServerSocket();
		socketListen.bind(new InetSocketAddress(portEcouteServeur));
		System.out.println("En attente de client...");
		Socket socketConnexion = socketListen.accept();
		
		
		/* 
		 * 4. On recupere l'inputstream, et on se prépare à lire le nom du fichier 
		 */
		System.out.println("Client : "+socketConnexion.getInetAddress().getHostAddress()+":"+socketConnexion.getPort());
		
		InputStream is = socketConnexion.getInputStream();
		OutputStream os = socketConnexion.getOutputStream();
		
		
		String concatene = new String("");
		Pattern patternFichierEgal = Pattern.compile("Fichier=((.*)[$]{3}).*");
		Matcher matcher = patternFichierEgal.matcher(concatene);
		
		/*
		 * Groupe 0 : Fichier=((.*)[$]{3}).*
		 * Groupe 1 : ((.*)[$]{3})
		 * Groupe 2 : (.*) 
		 */
        while (!matcher.matches()) // tant qu'on ne match pas la regex
        {
            byte[] bufR = new byte[2048];
            int lenBufR = is.read(bufR);
            String bufRtoString = new String(bufR, 0, lenBufR); // récupération du fragment de données reçu
            concatene += bufRtoString; // ajout à notre string de concaténation 
            matcher = patternFichierEgal.matcher(concatene); // On revérifie la chaîne après avoir concaténé le dernier block de stream reçu
        }
        
        String nomFichierDemande = matcher.group(2);
        System.out.println("Le client demande : " + nomFichierDemande);
        
        /*
         * 5. On ouvre le fichier et on calcule sa taille
         */
        FileInputStream fis = new FileInputStream(nomFichierDemande);
        File fichierTaille = new File(nomFichierDemande);
        long len = fichierTaille.length();
        
        /*
         * 6. On envoit la taille
         */
        System.out.println("Taille du fichier :" + len);
        String taille = "Taille=" + len + "$$$";
        os.write(taille.getBytes());
        
        /*
         *  7bis. On envoit le fichier au client à la suite.
         */
        int count = 0;
        byte[] buffer = new byte[8192];
        
        /* Tant qu'on peut lire le FileInputStream, 
         * ça veut dire qu'on a pas atteint la fin du fichier à envoyer*/
        while ((count = fis.read(buffer)) > 0)
        {
        	os.write(buffer, 0, count);
        }
	

		System.out.println("Termine.");
	}
}
