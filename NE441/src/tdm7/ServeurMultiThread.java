package tdm7;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class ServeurMultiThread {
	
	public static void main (String[] args) throws IOException {
		new ServeurMultiThread().execute();
	}

	private void execute() throws IOException {
		/* On attend le client */
		ServerSocket socketListen = new ServerSocket(5432);
		System.out.println("En attente de client...");
		
		while (true) {
			Socket socketConnexion = socketListen.accept();
			ThreadTask send = new ThreadTask(socketConnexion); 
			send.start();
		}
	}
}
