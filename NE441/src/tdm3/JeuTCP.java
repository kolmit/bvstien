package tdm3;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;

public class JeuTCP {
	
	public static void main (String[] args ) throws IOException {
		new JeuTCP().execute();
		
	}

	private Socket socket;
	
	private void execute() throws IOException {
		socket = new Socket();
		InetSocketAddress adrDest = new InetSocketAddress("127.0.0.1", 7500);
		socket.connect(adrDest);	
				
		String msg = new String();
		while (true) { 
			msg = readInputStream(1, socket.getInputStream()).toString(); 

			int resNumerique = calculFromString(msg);
			envoyerAuServeur(resNumerique);
		}
	}
	
	
	private StringBuffer readInputStream(int nbByte, InputStream is) throws IOException
	{
		StringBuffer buf = new StringBuffer();
		
		// Nombre de caracteres reellement lus au total
		int nb, nbByteRead=0;
		byte[] bufR = new byte[2048];

		
		do {
			nb = is.read(bufR);
			
			//if (nb==-1) throw new IOException("Fin du stream atteinte avant d'avoir lu "+nbByte+" octets");
			if (nb != -1) {
				nbByteRead = nbByteRead+nb;
				buf.append(new String(bufR,0,nb));
			}
		} while (buf.toString().charAt(buf.length()-1) != '?');
		
		
		String[] otherCalcul = buf.toString().split("[?]");
		
		for (String s : otherCalcul) {
			System.out.println("\tOtherCalcul : "+s);
			int resultatNumerique = calculFromString(s);
			envoyerAuServeur(resultatNumerique);
		}
		
		System.out.println("bufToString :"+buf.toString());
		return buf;
	}
	

	private void envoyerAuServeur(int resultatNumerique) throws IOException {
		OutputStream os = socket.getOutputStream();
		byte[] responseServeur = new String(resultatNumerique+";").getBytes();
		System.out.println("Envoyé : "+resultatNumerique+";");
		os.write(responseServeur);
	}
	

	private int calculFromString(String msg) {
		String firstOp = msg.substring(0, msg.indexOf('+'));
		String secondOp = msg.substring(msg.indexOf('+') + 1, msg.indexOf('='));
		
		int resultatNumerique = Integer.parseInt(firstOp) + Integer.parseInt(secondOp);	
		return resultatNumerique;
	}
	
	
}
