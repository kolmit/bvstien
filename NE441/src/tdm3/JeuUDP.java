package tdm3;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.SocketException;

import utils.ServeurUDP;



public class JeuUDP extends ServeurUDP{
	
	public static void main (String[] args ) throws IOException {
		new JeuUDP().execute();
	}
	

	private void execute() throws IOException {
		
		initSocketListen(0);
		
		int i = 0, perfect = 0, error = 0,slow = 0;
		envoyer("JOUER", "127.0.0.1", 7001);

		while (i < 5000) {
			try {Thread.sleep(5);} 
			catch (InterruptedException e) {e.printStackTrace();}
			String calculRecu = recevoir();
			System.out.println(calculRecu);
			//if (calculRecu.matches(".*Excellent.*")) { envoyer("JOUER", "127.0.0.1", 7001); calculRecu = recevoir(); 	System.out.println("2:::::::::::"+calculRecu);}

			if (calculRecu.startsWith("OK100"))
				perfect++;
			else if (calculRecu.startsWith("ERR"))
				error++;
			else if (calculRecu.startsWith("OK1:"))
				slow++;
			if (calculRecu.startsWith("Q")) {
				String numQuestion = calculRecu.substring(calculRecu.indexOf('Q')+1, calculRecu.indexOf(':'));
				//System.out.println(numQuestion);
				String op1 = calculRecu.substring(calculRecu.indexOf(':')+1, calculRecu.indexOf('+'));
				//System.out.println(op1);
				String op2 = calculRecu.substring(calculRecu.indexOf('+')+1, calculRecu.indexOf('='));
				//System.out.println(op2);

			
				envoyer(generateResponse(numQuestion, op1, op2), "127.0.0.1", 7001);
				i++;
				envoyer("JOUER", "127.0.0.1", 7001);
				
			}
			
		}
		envoyer("SCORE", "127.0.0.1", 7001);
		System.out.println("Perfect : "+perfect + "\nSlow : "+slow + "\nErreur : "+error);
	}


	private String generateResponse(String numQuestion, String op1, String op2) {
		String respToServ = "R" + numQuestion + ":" + (String.valueOf(Integer.parseInt(op1) + Integer.parseInt(op2))) ;
		System.out.println( respToServ );
		return respToServ;
	}
	
	
}
