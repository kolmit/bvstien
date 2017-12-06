package tdm3;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;

/**
 * Client basique TCP
 * pour UPLOAD un fichier vers un Serveur
 */
public class ClientTCP
{

	public static void main(String[] args) throws Exception {
		new ClientTCP().execute();	
	}
	
								
	/**
	 * Le client cree une socket, envoie un message au serveur
	 * et attend la reponse 
	 * 
	 */
	private void execute() throws IOException
	{
		System.out.println("Demarrage du client ...");
		
		//Creation de la socket
		Socket socket = new Socket();
		InetSocketAddress adrDest = new InetSocketAddress("127.0.0.1", 8400);
		socket.connect(adrDest);
		
		OutputStream os = socket.getOutputStream();
		FileInputStream fis = new FileInputStream(new File("C:\\Users\\utilisateur\\Desktop\\CV Ingénieur.pdf"));
		
				
		byte [] bufferTamponFichier = new byte[1999];
		int nbLuFichier = 0;
		while (nbLuFichier >= 0) {
			fis.read(bufferTamponFichier);
			os.write(bufferTamponFichier);
		}
		
		System.out.println("Temriné!");
	}
}
