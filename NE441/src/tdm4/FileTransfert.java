package tdm4;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileTransfert {
	
	
	public static void main (String[] args ) throws IOException {
		new FileTransfert().execute();
	}
	

	private void execute() throws IOException {
		/* On attend le client */
		ServerSocket socketListen = new ServerSocket(5432);
		System.out.println("En attente de client...");
		Socket socketConnexion = socketListen.accept();
		
		
		/* On recupere l'inputstream, etc...*/
		System.out.println("Client : "+socketConnexion.getInetAddress().getHostAddress()+":"+socketConnexion.getPort());
		byte[] readBuffer = new byte[2048];
		InputStream is = socketConnexion.getInputStream();
		int nbLu = 0;

		
		/* On lit le stream entrant */
		if ((nbLu = is.read(readBuffer)) == -1) {
			throw new IOException();
		}
		
		String fileName = new String(readBuffer, 0, nbLu);
		
		System.out.println("Fichier demande : " + fileName.toString());
		OutputStream os = socketConnexion.getOutputStream();
		
		/* On r�cup�re la taille du fichier � envoyer et on utilise un s�parateur (�) pour indiquer au
		 * client que la taille s'arr�te et que le transfert du fichier commence apr�s */
		File fichierAEnvoyer = new File(fileName);
		byte[] tailleFichier = new String (fichierAEnvoyer.length() + "§").getBytes("UTF-8");
		System.out.println("Taille envoyee : "+fichierAEnvoyer.length());
		os.write(tailleFichier);
		
		
		/* On envoit le fichier */
		os.write(Files.readAllBytes(fichierAEnvoyer.toPath()));
		
		
		System.out.println("Termine.");
	}
}
