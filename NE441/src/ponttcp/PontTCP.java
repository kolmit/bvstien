package ponttcp;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;

public class PontTCP { 
	
	
	public static void main (String [] args) throws IOException {
		int nbByteLu = 0,nbByteTotal = 0;

		try {
			Socket socketServeru2 = new Socket();
			InetSocketAddress adrDest2 = new InetSocketAddress("127.0.0.1" , 8200);
			socketServeru2.connect(adrDest2);
			
			Socket socketConnexionPont = new Socket();
			InetSocketAddress adrDest = new InetSocketAddress("127.0.0.1" , 8201);
			socketConnexionPont.connect(adrDest);
		
			InputStream isPont = socketConnexionPont.getInputStream();
			OutputStream osServ = socketServeru2.getOutputStream();
			byte[] bufferTmpPont = new byte [10000];
			
			
			System.out.println("On lit l'is venant du PontTCPTaille");
			while ((nbByteLu = isPont.read(bufferTmpPont)) >= 0) {
				
				System.out.println(nbByteLu + " / " +nbByteTotal);
				osServ.write(bufferTmpPont, 0, nbByteLu);
				nbByteTotal += nbByteLu;
			}
			
			System.out.println("Terminéloul");
		}
		catch (IOException e ) {
			System.out.println("dernier chunk : "+nbByteLu+"\nTotal : "+nbByteTotal);
		}

		
	}
}
