package serveur;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.SocketException;
import java.util.ArrayList;


public class ServeurJeu
{
	private DatagramSocket socket_listen;
	private DatagramPacket dpR;
	private byte[] bufR;
	
	private DatagramSocket socket_send;
	private DatagramPacket dpE;
	private byte[] bufE;
		
	private ArrayList<Integer> listePort;
	private InetSocketAddress adrDest;
	
	private final short NBPLAYER = 2;
	private short CompteurJoueur;
	private final String nbColLin = "5";
	private final String[] symboleJoueur = {"croix.png", "rond.png", "triangle.png"};
	
	private int[][] sauvegardePartie;
	private boolean alreadyPlayed = false;


	
	public static void main(String[] args) throws Exception
	{
		ServeurJeu serveurUDP = new ServeurJeu();
		serveurUDP.init();

		while (true){
			serveurUDP.waitJoueur();
			serveurUDP.execute();
		}
	}
	
	public void init() throws SocketException{
		this.bufR = new byte[2048];
		this.dpR = new DatagramPacket(this.bufR, this.bufR.length);
		this.socket_listen = new DatagramSocket(null);
		this.socket_send = new DatagramSocket();
		
		if (this.socket_listen.isBound() || this.socket_send.isBound()){
			//this.socket_listen.close();
			//this.socket_send.close();
			this.socket_listen = new DatagramSocket(null);
			this.socket_send = new DatagramSocket();
		}
		/*if (!alreadyPlayed){
			alreadyPlayed = true;
		}*/
		
		this.socket_listen.bind(new InetSocketAddress(5555));

		listePort = new ArrayList<Integer>();
		initSauvegarde();
		return;
	}
	
	
	private void initSauvegarde() {
		sauvegardePartie = new int[Integer.parseInt(nbColLin)][Integer.parseInt(nbColLin)];

	    for(int i=0; i < this.sauvegardePartie.length; i++) {
	        for(int j=0 ; j < this.sauvegardePartie[i].length; j++) {
	        	this.sauvegardePartie[i][j] = 0;
	        }
	    }
	}
	

	public void envoyer(String msg, int port) throws IOException{
		this.adrDest = new InetSocketAddress("127.0.0.1", port);
		this.bufE = msg.getBytes();
		this.dpE = new DatagramPacket(bufE, bufE.length, adrDest);
		this.socket_send.send(this.dpE);
		System.out.println("Message à "+port+" : "+new String(bufE, dpE.getOffset(), dpE.getLength()));

		return;
	}
		

	private void waitJoueur() throws IOException {
		CompteurJoueur = 0;
		listePort.clear();
		System.out.println("En attente de joueur...\n");
		
		// On attend le nombre NBPLAYER de joueurs 
		while (CompteurJoueur < NBPLAYER){
			this.socket_listen.receive(this.dpR);

			String message = new String(bufR, dpR.getOffset(), dpR.getLength());
			
			int portClient = Integer.parseInt(message.substring(0,5));	
			this.listePort.add(portClient);
			
			System.out.println("Message: "+message+" de "+dpR.getAddress()+":"+dpR.getPort());
			if (message.contains("Ready")){
				System.out.println("Joueur n°"+ ++CompteurJoueur+" prêt!");
			}
			if (message.contains("NotReplay")){
				System.out.println("Joueur déconnecté");
			}
		}
		
		
		// On envoit le nombre de col/lignes aux clients
		// Et leurs symboles !
		for (int p : listePort){
			int symboleNum = CompteurJoueur;
			envoyer(nbColLin, p);
			
			int numberIteration = 0;
			for (String numSymbole : symboleJoueur){
				if (numberIteration == NBPLAYER) break;
				
				envoyer(numSymbole +":" +listePort.get(numberIteration), p);
				numberIteration++;
			}
			envoyer("fin symbole", p);
		}
				
		return;
	}


	private void execute() throws IOException
	{
		int compteurCoup = 0;
		
		while (compteurCoup < Integer.parseInt(nbColLin)*Integer.parseInt(nbColLin)){
			for (int p : listePort){
				
				joueEtAck(p);
				for (int portAutre : listePort){
					if (portAutre != p)
						repercuteActionAutreJoueur(portAutre);
				}
				if ( checkWin(p) ){
					System.out.println("Partie terminée!");
					return;
				}
				compteurCoup++;
			}
		}
		return;
	}
	

	private void repercuteActionAutreJoueur(int portAutre) throws IOException {
		System.out.println("Repercute :"+new String(bufR, dpR.getOffset(), dpR.getLength())+" à "+portAutre);
		envoyer(new String(bufR, dpR.getOffset(), dpR.getLength()), portAutre);
	}
	

	private void joueEtAck(int p) throws IOException {
		envoyer("joue", p);
		
		//On reçoit ce que la fenêtre a envoyé
		this.socket_listen.receive(this.dpR);
		String recu = new String(bufR, dpR.getOffset(), dpR.getLength());

		saveGame(recu);
		
		System.out.println("recu serv :"+recu);
		envoyer("ack", p);		
	}



	private boolean checkWin(int p) throws IOException {

		if (checkHorizontal() || checkVertical() || checkDiagonal() || checkDiagonal2()){
			System.out.println("============Y'a un gagnant!=============");
			for (int port : listePort){
				envoyer(p+":win", port);
			}
			return true;
		}
		return false;
	}
	
	
	private boolean checkHorizontal() {
		/** On check pour trouver :
		 * 		
		 * 	X X X 
		 *  	
		 */
		for (int j = 0 ; j < this.sauvegardePartie.length ; j++){
			for (int i = 0 ; i < this.sauvegardePartie[j].length ; i++){
				if (i+2 > Integer.parseInt(nbColLin)-1){
					continue;
				}
				else if (this.sauvegardePartie[i][j] == this.sauvegardePartie[i+1][j] && 
					this.sauvegardePartie[i][j] == this.sauvegardePartie[i+2][j] &&
					this.sauvegardePartie[i][j] != 0){
					return true;
				}
			}
		}
		return false;
	}
	
	
	private boolean checkVertical() {
		/** On check pour trouver :
		 * 	X	
		 * 	X  
		 *  X	
		 */
		for (int i = 0 ; i < this.sauvegardePartie.length ; i++){
			for (int j = 0 ; j < this.sauvegardePartie[i].length ; j++){
				System.out.println("save:"+this.sauvegardePartie[i][j]+" i="+i+" et j="+j);
				if (j+2 > Integer.parseInt(nbColLin)-1){
					continue;
				}
				else if (this.sauvegardePartie[i][j] == this.sauvegardePartie[i][j+1] && 
					this.sauvegardePartie[i][j] == this.sauvegardePartie[i][j+2] &&
					this.sauvegardePartie[i][j] != 0){
					return true;
				}
			}
		}
		return false;
	}
	
	
	private boolean checkDiagonal() {
		/** On check pour trouver :
		 * 	X	
		 * 	  X
		 *  	X
		 */
		for (int i = 0 ; i < this.sauvegardePartie.length ; i++){
			for (int j = 0 ; j < this.sauvegardePartie[i].length ; j++){
				if (j+2 > Integer.parseInt(nbColLin)-1 ||
					i+2 > Integer.parseInt(nbColLin)-1 ||
					j+1 > Integer.parseInt(nbColLin)-1 ||
					i+1 > Integer.parseInt(nbColLin)-1)
				{
					continue;
				}
				else if ((this.sauvegardePartie[i][j] == this.sauvegardePartie[i+1][j+1] && 
					this.sauvegardePartie[i][j] == this.sauvegardePartie[i+2][j+2]) 
					&&
					this.sauvegardePartie[i][j] != 0)
				{
					return true;
				}

				
			}
		}
		return false;
	}
	
	private boolean checkDiagonal2() {
		/** On check pour trouver :
		 * 		X
		 * 	  X
		 *  X
		 */
		for (int i = 0 ; i < this.sauvegardePartie.length ; i++){
			for (int j = 0 ; j < this.sauvegardePartie[i].length ; j++){
				if (j+2 > Integer.parseInt(nbColLin)-1 ||
					i-2 < 0 ||
					j+1 > Integer.parseInt(nbColLin)-1 ||
					i-1 < 0)
				{
					continue;
				}
				else if((this.sauvegardePartie[i][j] == this.sauvegardePartie[i-1][j+1] && 
						this.sauvegardePartie[i][j] == this.sauvegardePartie[i-2][j+2])
						&&
						this.sauvegardePartie[i][j] != 0)
				{
						return true;
				}
			}
		}
		return false;
	}


	private void saveGame(String recu) {
		int x = Integer.parseInt(recu.substring(0, recu.indexOf(":")));
		int y = Integer.parseInt(recu.substring(recu.indexOf(":") + 1, recu.length()));
		
		this.sauvegardePartie[x-1][y-1] = dpR.getPort();
		
		System.out.println("x = "+x+" y = "+y+"\n\tPort : "+dpR.getPort());
		return;
	}
}
	