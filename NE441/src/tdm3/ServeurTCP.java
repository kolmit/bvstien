package tdm3;

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

	public static void main(String[] args) throws Exception
	{
		ServeurTCP serveurTCP = new ServeurTCP();
		serveurTCP.execute();
		
	}
		
		

	private void execute() throws IOException
	{
		System.out.println("Demarrage du serveur ...");

		ServerSocket socketEcoute = new ServerSocket();
		socketEcoute.bind(new InetSocketAddress(5099));

			Socket socketConnexion = socketEcoute.accept();
			
			System.out.println("***************************\n"
					+ "Client : "+socketConnexion.getInetAddress().toString().substring(1)+":"+socketConnexion.getPort()
					+ "\n***************************");
			
			while (true) {
				System.out.print( readInputStream(1, socketConnexion.getInputStream()).toString() + "");
			}
	}
	
	
	private StringBuffer readInputStream(int nbByte, InputStream is) throws IOException
	{
		StringBuffer buf = new StringBuffer();

		// Nombre de caracteres reellement lus au total
		int nbByteRead=0;
		int nb;
		byte[] bufR = new byte[1024];
		while(nbByteRead<nbByte)
		{
			nb = is.read(bufR);
			
			if (nb==-1)
			{
				throw new IOException("Fin du stream atteinte avant d'avoir lu "+nbByte+" octets");
			}
			nbByteRead = nbByteRead+nb;
			buf.append(new String(bufR,0,nb));
			
		}
		return buf;
		
	}
		
}
