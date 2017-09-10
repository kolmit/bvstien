package xopackage2;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.SocketException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Scanner;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;



public class Joueur {

	/** Réseau */ 
		public final int portServeur = 5555;
		public final String ipServeur = "127.0.0.1";
		private DatagramSocket socket_send;
		private DatagramSocket socket_listen;
		private static InetSocketAddress adrDest;
		private static int portClient;
		
		public static String pathExec = System.getProperty("user.dir");


		
		static Map<Integer, String> mapSymboleJoueur;
		public boolean cestMonTour;
		private boolean tour;
		private boolean tourValide;
		
		
		private DatagramPacket dpR;
		private byte[] bufR;
	
	/** Jeu */
		private int dimension;
		private Fenetre frame;

		private static String[] argz;


		
	/** 
	 * ******************** MAIN ********************
	 */
	public static void main (String args[]) throws IOException, InterruptedException{
		Joueur j = new Joueur();
		j.init(args);

		while (true){
			j.execute(getPortClient());
		}
	}
	
	
	/** 
	 * ******************** ENVOYER ********************
	 */
	public void envoyer(String msg, int port) throws IOException{
		this.adrDest = new InetSocketAddress("127.0.0.1", port);
		this.bufR = msg.getBytes();
		this.dpR = new DatagramPacket(bufR, bufR.length, adrDest);
		this.socket_send.send(this.dpR);
		System.out.println("Message à "+port+" : "+new String(bufR, dpR.getOffset(), dpR.getLength()));

		return;
	}
		

	private void init(String args[]) throws IOException {
		this.mapSymboleJoueur = new HashMap<Integer,String>();
		this.socket_listen = new DatagramSocket(null);
		this.socket_send = new DatagramSocket();
		this.setPortClient( Integer.parseInt(args[0]) );

		
		if (socket_listen.isBound() || socket_send.isBound()){
			//socket_listen.close();
			//socket_send.close();
			this.socket_listen = new DatagramSocket(null);
			this.socket_send = new DatagramSocket();
		}
		this.socket_listen.bind(new InetSocketAddress(this.portClient));
		
		
		System.out.println("Demarrage du client ..." + pathExec);
		this.adrDest = new InetSocketAddress(ipServeur, portServeur);
		
		byte[] bufR = new byte[2048];
		DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);
		
		bufR = new String(portClient+"Ready").getBytes();
		dpR = new DatagramPacket(bufR, bufR.length, adrDest);
		this.socket_send.send(dpR);
		
		return;
	}


	private void execute(int port) throws IOException, InterruptedException
	{
		// On attend les colonnes/lignes décidées par le serveur
		String nbColLin = recevoir();
		frame = new Fenetre(nbColLin, getPortClient());
		
		// On attend le symbole décidé par le serveur
		while(true){
			String recu = recevoir();
			if (recu.matches("fin symbole")){
				break;
			}
			System.out.println("Symbole ?\t"+recu);
						
			String symboleRecu = recu.substring(0, recu.indexOf(":"));
			int portRecu = Integer.parseInt( recu.substring( recu.indexOf(":")+1 , recu.length() ) );
			setSymbole(portRecu, symboleRecu);
		}
		
	
		do{
			if ( jattendsMonTour() ){
				return;
			}		
		}while(true);
	}
	
	
	private String recevoir() throws IOException{
		byte[] bufR = new byte[2048];
		DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);		
		socket_listen.receive(dpR);
		return new String(bufR, dpR.getOffset(), dpR.getLength());
	}

	
	private boolean jattendsMonTour() throws IOException, InterruptedException {
		System.out.println(getPortClient()+": Je joue quand ?");
		String recu = recevoir();
		System.out.println("Recu :"+recu);
		
		setTour(false);

		if (recu.matches("joue")){
			System.out.println(getPortClient()+": C'est � moi!");
			frame.setTour(true);
		}
		if (recu.matches("\\d:\\d")){
			frame.marquerActionAutreJoueur(recu, getPortClient(), mapSymboleJoueur.get(getSymboleAutreClient()));
			jattendsMonTour();
		}
		if (recu.matches("ack")){
			System.out.println(getPortClient()+": C'est � l'autre");
		}
		if (recu.matches(".*win")){
			System.out.println("Partie terminée");
			finishGame();
			return true;
		}
		return false;
	}

	
	
	private void finishGame() {
		(new Thread() {
		    public void run() {
		    	ReplayFrame r = new ReplayFrame();
		    	r.setVisible(true);
		    	r.toFront();
		    	//r.setLocationRelativeTo();
			    	/* Bouton OUI */
			    	r.getButtonYes().addActionListener(new ActionListener() {
						public void actionPerformed(ActionEvent e) {
							try {envoyer(portClient + "Ready", portServeur);} 
							catch (IOException e1) {e1.printStackTrace();}	
							r.setChoice(true);
						}
					});
			    	
		    		/* Bouton NON*/
		    		r.getButtonNo().addActionListener(new ActionListener() {
						public void actionPerformed(ActionEvent e) {
							try {envoyer(portClient + "NotReplay", portServeur);} 
							catch (IOException e1) {e1.printStackTrace();}	
							r.setChoice(true);
						}
					});
				while (!r.getChoice()){
					try {
						Thread.sleep(100);
					} catch (InterruptedException e1) {
						e1.printStackTrace();
					}
				}
				r.dispose();
		    }
		}).start();		
	}


	
	
	private int getSymboleAutreClient() {
	    
	    for (Map.Entry<Integer, String> entry : mapSymboleJoueur.entrySet())
	    {	        	
	    	if (entry.getKey() != getPortClient()){
	    		return (int) entry.getKey();
	    	}
    	}
		return 0;
	}
	
	
	
	public static int getPortClient() {return portClient;}
	public int getDimension() {return dimension;}
	public boolean getCestMonTour() {return cestMonTour;}
	public String getSymbole() { return this.mapSymboleJoueur.get(getPortClient()); }
	private boolean getValide() { return this.tourValide; }
	public void setTour(boolean b){this.tour = b;}
	public boolean getTour(){return this.tour;}
	public void setSymbole(int portClient, String s){ this.mapSymboleJoueur.put(portClient, s);}

	public void setPortClient(int portClient) {this.portClient = portClient;}
	public void setDimension(int dimension) {this.dimension = dimension;}
	public void setCestMonTour(boolean b) {cestMonTour = b;}
	private void setValide(boolean b) { this.tourValide = b; }

}
