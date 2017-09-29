package tdm2;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import utils.*;

public class ServeurOrdonnanceur extends ServeurUDP{
	ArrayList<Integer> listeClient;
	ArrayList<Integer> listeClientUpdateAdd = new ArrayList<>();
	ArrayList<Integer> listeClientUpdateRemove = new ArrayList<>();
	
	
	public static void main (String[] args) throws IOException, InterruptedException {
		new ServeurOrdonnanceur().execute();
	}
	
	
	private void execute() throws IOException, InterruptedException {
		listeClient = new ArrayList<>();
		initSocket(12345);
		
		String msgClient = recevoir();
		if (msgClient.matches("127.0.0.1:.*")) {
			String adresseClient = msgClient.substring(0, msgClient.indexOf(':'));
			Integer portClient = Integer.parseInt( msgClient.substring( msgClient.indexOf(':')+1) );
			listeClient.add(portClient);
		}
		
		
		while (true) {
			recevoirClient();
			
			for (Integer p : listeClient) {
				envoyer("ROUGE", "127.0.0.1", p);
				System.out.println("On send");
				Thread.sleep(1000);
				envoyer("VERT", "127.0.0.1", p);
				msgClient = recevoir();
				
				
				
				System.out.println("Msg:" + msgClient);
			}
			listeClient.addAll(listeClientUpdateAdd);
			listeClient.removeAll(listeClientUpdateRemove);
		}
	}


	private void recevoirClient() {
		new Thread(new Runnable() {
			@Override
			public void run() {
				String msgClient = new String();
				try {
					msgClient = recevoir();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				if (msgClient.matches("127.0.0.1:.*")) {
					Integer portClient = Integer.parseInt( msgClient.substring( msgClient.indexOf(':')+1) );
					listeClientUpdateAdd.add(portClient);
				}
				if (msgClient.matches(".*CIAO.*")) {
					Integer portClient = Integer.parseInt( msgClient.substring( msgClient.indexOf(':')+1) );
					listeClientUpdateRemove.remove(portClient);
				}	
				System.out.println("TH : "+msgClient);
			}
		}).start();

	}
	

}
