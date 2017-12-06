package tdm3;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Serveur basique TCP
 */
public class ServeurTCP
{

	public static void main(String[] args) throws Exception{
		new ServeurTCP().execute();
	}
		
		

	private void execute() throws IOException
	{
		System.out.println("Demarrage du serveur ...");

		ServerSocket socketEcoute = new ServerSocket();
		socketEcoute.bind(new InetSocketAddress(8400));
		Socket socketConnexion = socketEcoute.accept(); // wait le client-
		
		
		System.out.println("***************************\n"+ "Client : "+socketConnexion.getInetAddress().toString().substring(1)+":"+socketConnexion.getPort() + "\n***************************");
	
		InputStream isClient = socketConnexion.getInputStream();
		FileOutputStream fos = new FileOutputStream(new File("C:\\Users\\utilisateur\\Desktop\\KIKIKI.pdf"));

		String pathRecuClient = "";
		int nbByteLu = 0;
		while (nbByteLu >= 0) {
			byte[] buffeurRecClient = new byte[4096];
			nbByteLu = isClient.read(buffeurRecClient, 0, buffeurRecClient.length);
			if (nbByteLu == -1) return;
			fos.write(buffeurRecClient, 0, nbByteLu);
		}
		
		System.out.println("Recu : "+pathRecuClient);
		
	}		
}
