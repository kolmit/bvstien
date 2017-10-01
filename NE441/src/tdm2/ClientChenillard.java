package tdm2;
import java.awt.Color;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.io.IOException;
import java.net.SocketException;

import javax.swing.JFrame;

import utils.*;

public class ClientChenillard extends ServeurUDP {
	private final String adrServeur = "127.0.0.1";
	private final String myIP = "127.0.0.1";
	private final int portServeur = 12345;
	private JFrame j;
	
	
	public static void main (String[] args) throws IOException, InterruptedException {
		new ClientChenillard().execute();
	}


	private void execute() throws IOException, InterruptedException {
		initSocketListen(0); 		// 0 = Port aléatoire car c'est un client
		helloServeur();
		
		while (true) {
			String ordreServ = recevoir();
			
			if (ordreServ.matches(".*ROUGE.*")){
				j.getContentPane().setBackground(Color.RED);
				envoyer("ACK" , adrServeur, portServeur);
			}
			
			else if (ordreServ.matches(".*VERT.*")) {
				j.getContentPane().setBackground(Color.GREEN);
				envoyer("ACK" , adrServeur, portServeur);
			}
		}
	}


	private void helloServeur() throws IOException {
		System.out.println(myIP + ":" +sockListen.getLocalPort());
		envoyer(myIP + ":" +sockListen.getLocalPort(), adrServeur, portServeur);
		j = new JFrame();
		j.setVisible(true);
		j.setSize(400, 400);
		j.getContentPane().setBackground(Color.GREEN);
		
		j.addWindowListener(new WindowAdapter() {
	        public void windowClosing(WindowEvent event) {
	        	try {envoyer("CIAO!" + myIP + ":" + sockListen.getLocalPort(), adrServeur, portServeur);} 
	        	catch (IOException e) {e.printStackTrace();}
	        }
	    });
	}
	
	
	
}
