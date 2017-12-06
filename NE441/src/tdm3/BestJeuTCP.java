package tdm3;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class BestJeuTCP {
	
	
	public static void main (String [] args) throws IOException{
		new BestJeuTCP().execute();
	}


	private void execute() {
		/* 
		 * Init socket 
		 */
		try {
			Socket socket = new Socket();
			InetSocketAddress adrDest = new InetSocketAddress("127.0.0.1", 7500);
			socket.connect(adrDest);
			
			InputStream isServeur = socket.getInputStream();
			OutputStream osServeur = socket.getOutputStream();
			
			String calcul = "";
			int nbByteLu = 0;
			
			/*
			 * Groupe 1 : ((aaaaaa)+(bbbbb)=?)
			 * Groupe 2 : (aaaaa)
			 * Groupe 3 : (bbbbb)
			 */
			Pattern patternCalcul = Pattern.compile("(([0-9]{1,9})[+]([0-9]{1,9})=[?]).*");
			Matcher matcherCalcul = patternCalcul.matcher(calcul);
			
			while ( nbByteLu >= 0) { // Tant que read() return pas -1
				byte[] bufferReception = new byte[4096];
				nbByteLu = isServeur.read(bufferReception);
				if (nbByteLu == -1) return; 
				
				calcul += new String(bufferReception, 0, nbByteLu); // On concatene le dernier morceau du stream lu
				matcherCalcul = patternCalcul.matcher(calcul); // On vérifie si on match la regex avec le dernier morceau recu
				
				System.out.println("recu :"+calcul);

				/*
				 * Si ça match au moins 1 fois :
				 */
				while (matcherCalcul.matches()) {
					String responseAuServeur = ( Integer.parseInt(matcherCalcul.group(2)) + Integer.parseInt(matcherCalcul.group(3)) ) + ";";
					System.out.println("responseAuServeur : "+responseAuServeur);
					
					osServeur.write(responseAuServeur.getBytes()); // La réponse au serveur
					
					calcul = calcul.substring(matcherCalcul.group(1).length()); // On efface le calcul qu'on vient de faire
					matcherCalcul = patternCalcul.matcher(calcul); // Et on compare ce qui nous reste avec le pattern. 
				}

			}
			
			socket.close();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
	}
}
