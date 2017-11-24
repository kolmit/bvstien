package tdm7;

/**
 * 
 * 
 * 
 * 
 * 
 * Pas fini !
 * 
 * 
 * 
 * 
 */
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ServeurPoolThread {
	ArrayList<ThreadTask> poolThread;
	ArrayList<Boolean> availThread;
	private int taillePoolThread = 5;
	
	public static void main (String[] args) throws IOException, InterruptedException {
		new ServeurPoolThread().execute();
	}

	
	private void execute() throws IOException, InterruptedException {
		/* 
		 * Initialisation de la socket d'écoute
		 */
		ServerSocket socketListen = new ServerSocket(5432);
		System.out.println("En attente de client...");
		
		
		availThread = new ArrayList<>();
		poolThread = new ArrayList<>();
		for (int i = 0; i < taillePoolThread ; i++) {
			availThread.set(i, true);
			poolThread.set(i, new ThreadTask());
        }
		
		while (true) {
			Socket socketConnexion = socketListen.accept();
			
			for (int i = 0; i < taillePoolThread ; i++) {
				if (availThread.get(i)) {
					poolThread.get(i).setSocketConnexion(socketConnexion);
					poolThread.get(i).start();
					availThread.set(i, false);
					
				}
			}
		}
		
		
	}
}
