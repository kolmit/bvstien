package tdm3;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;

public class JeuTCP {
	
	private Socket socket;
	
	public static void main (String[] args ) throws IOException {
		new JeuTCP().execute();
	}


	
	private void execute() throws IOException {
		/* Init socket */
		socket = new Socket();
		InetSocketAddress adrDest = new InetSocketAddress("127.0.0.1", 7500);
		socket.connect(adrDest);	
				
		
		String msg = new String();
		while (true) { 
			//msg = readInputStream(1, socket.getInputStream()).toString(); 
			lireServeur();

		}
	}
	
	
	private void lireServeur() throws IOException {
		StringBuffer buffer = new StringBuffer();
		
		int returnRead, nbByteLu = 0;
		byte[] bufReception = new byte[2048];
		
		while ((returnRead = socket.getInputStream().read(bufReception)) > -1) {
			nbByteLu += returnRead;
			buffer.append(new String(bufReception, 0, returnRead));
			
			System.out.println("Recu : "+buffer.toString() );

			
			String[] otherCalcul = buffer.toString().split("[?]");
			String multiReponse = new String();
			
			for (String s : otherCalcul) {
				if (s.charAt(s.length()-1) != '=') {
					break;
				}
				System.out.println("Calcul en cours : "+s);
				multiReponse = calculFromString(s);
				//envoyerAuServeur(multiReponse);
			}
			envoyerAuServeur(multiReponse);

		}
	}


	

	private void envoyerAuServeur(String resultatNumerique) throws IOException {
		OutputStream os = socket.getOutputStream();
		//byte[] responseServeur = new String(resultatNumerique+";").getBytes();
		System.out.println("\tEnvoye: "+resultatNumerique);
		os.write(resultatNumerique.getBytes());
	}
	

	private String calculFromString(String msg) {
		String firstOp = msg.substring(0, msg.indexOf('+'));
		String secondOp = msg.substring(msg.indexOf('+') + 1, msg.indexOf('='));
		
		return  new String(Integer.parseInt(firstOp) + Integer.parseInt(secondOp) + ";");
	}
	
	
}
