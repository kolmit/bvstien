package xopackage2;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.util.HashMap;
import java.util.Map;



public class Joueur {

		/** RÈseau */ 
		private int portServeur = 5555;
		protected String adresseServeur;
		
		private DatagramPacket dpR;
		private byte[] bufR;

		private DatagramSocket socket_send;
		private DatagramSocket socket_listen;
		private InetSocketAddress adrDest;
		private int portClient;
		
		public static String pathExec = System.getProperty("user.dir");

		
		static Map<Integer, String> mapSymboleJoueur;
		public boolean cestMonTour;
		private boolean tour;		
		

	
	/** Jeu */
		private Fenetre frame;
		private WaitingPlayer wp;
		private boolean playAgain;



		
	/** 
	 * ******************** MAIN ********************
	 */
	public static void main (String args[]) throws IOException, InterruptedException{
		Joueur j = new Joueur();
		j.askServerAdress();
		j.initNetwork(args);

		while (true){
			j.initGame();
			j.execute(j.getPortClient());
		}
	}
	
	
	private void askServerAdress() throws InterruptedException {
		RequestServeur rs = new RequestServeur();
		rs.getbuttonValid().addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				portServeur = Integer.parseInt( rs.getTextFieldPort().getText() );
				adresseServeur = rs.getTextFieldAdresse().getText();
				rs.setValided(true);
				rs.setVisible(false);
				rs.dispose();
			}
		});
		
		while ( !rs.getValided() ) {
			Thread.sleep(100);
		}		
	}


	private void initGame() throws InterruptedException {
		wp = new WaitingPlayer();

		if (getPlayAgain()) {
			frame.setVisible(false);
			frame.dispose();
			wp.setVisible(true);
			wp.setLocationRelativeTo(frame);
		}
		setPlayAgain(false);
	}


	/** 
	 * ******************** ENVOYER ********************
	 */
	public void envoyer(String msg, int port) throws IOException{
		this.adrDest = new InetSocketAddress(adresseServeur, port);
		this.bufR = msg.getBytes();
		this.dpR = new DatagramPacket(bufR, bufR.length, adrDest);
		this.socket_send.send(this.dpR);
		System.out.println("Message √† "+port+" : "+new String(bufR, dpR.getOffset(), dpR.getLength()));

		return;
	}
		

	private void initNetwork(String args[]) throws IOException, InterruptedException {
		Joueur.mapSymboleJoueur = new HashMap<Integer,String>();
		this.socket_listen = new DatagramSocket(null);
		this.socket_send = new DatagramSocket();
		
		
		if (socket_listen.isBound() || socket_send.isBound()){
			this.socket_listen = new DatagramSocket(null);
			this.socket_send = new DatagramSocket();
		}
		
		this.socket_listen.bind( new InetSocketAddress(0) );
		this.setPortClient( this.socket_listen.getLocalPort() );
		System.out.println("Demarrage du client ..." + pathExec);
		this.adrDest = new InetSocketAddress(adresseServeur, portServeur);
		
		byte[] bufR = new byte[2048];
		DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);
		
		bufR = new String(portClient+"Ready").getBytes();
		dpR = new DatagramPacket(bufR, bufR.length, adrDest);
		this.socket_send.send(dpR);
		

		
		return;
	}


	private void execute(int port) throws IOException, InterruptedException
	{
		// On attend les colonnes/lignes d√©cid√©es par le serveur
		String nbColLin = recevoir();
		wp.setVisible(false);
		frame = new Fenetre(nbColLin, getPortClient());
		
		// On attend le symbole d√©cid√© par le serveur
		while(true){
			String recu = recevoir();
			if (recu.matches("fin symbole")){
				break;
			}
			System.out.println("Symbole ?\t"+recu);
						
			String symboleRecu = recu.substring(0, recu.indexOf(":"));
			int portRecu = Integer.parseInt( recu.substring( recu.lastIndexOf(":")+1/*recu.indexOf(":")+1*/ , recu.length() ) );
			setSymbole(portRecu, symboleRecu);
		}
		
	
		do{
			/* Quand on est arrivÈ ‡ la fin d'une partie, on regarde si le joueur veut rejouer. 
			 * Si oui, on return pour repartir dans execute */
			if ( getPlayAgain() ){
				System.out.println("Je disparaiiiiiiiiiiis !");
				return;
			}
			else {
				jattendsMonTour();
			}
		}while(true);
	}
	
	
	
	private String recevoir() throws IOException{
		byte[] bufR = new byte[2048];
		DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);		
		socket_listen.receive(dpR);
		return new String(bufR, dpR.getOffset(), dpR.getLength());
	}

	
	private void jattendsMonTour() throws IOException, InterruptedException {
		System.out.println(getPortClient()+": Je joue quand ?");
		String recu = recevoir();
		System.out.println("Recu :"+recu);
		
		setTour(false);

		if (recu.matches("joue")){
			System.out.println(getPortClient()+": C'est ‡† moi!");
			frame.setTour(true);
			
			while ( frame.getTour() ) { Thread.sleep(50); }
			try {envoyer(frame.getLastButton(), portServeur);} 
			catch (IOException e) {e.printStackTrace();}
		}
		if (recu.matches("\\d:\\d")){
			frame.marquerActionAutreJoueur(recu, getPortClient(), mapSymboleJoueur.get( getSymboleAutreClient() ));
			jattendsMonTour();
		}
		if (recu.matches("ack")){
			System.out.println(getPortClient()+": C'est ‡† l'autre");
		}
		if (recu.matches(".*win")){
			System.out.println("Partie terminÈe");
			finishGame();
			System.out.println("out of finish");
			return;
		}
	}

	
	
	private void finishGame() throws InterruptedException {
		Thread t = new Thread() {
		    public void run() {
		    	ReplayFrame r = new ReplayFrame();
		    	r.setVisible(true);
		    	r.toFront();
		    	r.setLocationRelativeTo(frame);
		    	r.setChoice(false);
		    	
			    	/* Bouton OUI */
			    	r.getButtonYes().addActionListener(new ActionListener() {
						public void actionPerformed(ActionEvent e) {
							try {envoyer(portClient + "Ready", portServeur);} 
							catch (IOException e1) {e1.printStackTrace();}	
							r.setChoice(true);
							setPlayAgain(true);
						}

						
					});
			    	
		    		/* Bouton NON*/
		    		r.getButtonNo().addActionListener(new ActionListener() {
						public void actionPerformed(ActionEvent e) {
							try {envoyer(portClient + "NotReplay", portServeur);} 
							catch (IOException e1) {e1.printStackTrace();}	
							r.setChoice(true);
							setPlayAgain(false);
							
						}
					});
		    		

				while (!r.getChoice()){
					try { Thread.sleep(5); } 
					catch (InterruptedException e1) { e1.printStackTrace(); }
				}
				r.dispose();
		    }
		};
		t.start();
		t.join();
		
		if (!getPlayAgain()) { 
			frame.setVisible(false);
			frame.dispose();
		}
	}

	private void setPlayAgain(boolean b) {playAgain = b;}
	public boolean getPlayAgain() {return playAgain;}

	
	private int getSymboleAutreClient() {
	    
	    for (Map.Entry<Integer, String> entry : mapSymboleJoueur.entrySet())
	    {	        	
	    	System.out.println("entry :"+entry.getKey()+" - "+entry.getValue());
	    	if (entry.getKey() != getPortClient()){
	    		return (int) entry.getKey();
	    	}
    	}
		return 0;
	}
	
	
	
	public int getPortClient() {return portClient;}
	public boolean getCestMonTour() {return cestMonTour;}
	public String getSymbole() { return Joueur.mapSymboleJoueur.get(getPortClient()); }
	public void setTour(boolean b){this.tour = b;}
	public boolean getTour(){return this.tour;}
	public void setSymbole(int portClient, String s){ Joueur.mapSymboleJoueur.put(portClient, s);}

	public void setPortClient(int portClient) {this.portClient = portClient;}
	public void setCestMonTour(boolean b) {cestMonTour = b;}
}
