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


public class Joueur extends JFrame implements ActionListener{

	/** Réseau */ 
		public final int portServeur = 5555;
		public final String ipServeur = "127.0.0.1";
		private DatagramSocket socket_send;
		private DatagramSocket socket_listen;
		private InetSocketAddress adrDest;
		private int portClient;

		
		private DatagramPacket dpR;
		private byte[] bufR;
	
	/** Jeu */
		private int dimension;
		public boolean cestMonTour;
	
	/** La Fenêtre */
		private Panneau pan = new Panneau();
		private JButton[] tabButton;
	    private JLabel label;
	    private Joueur j;
	    
	    private int nbColonne;
	    private int nbLigne;
		private int lastX;
		private int lastY;
		
		private boolean tour;
		private Map<Integer, String> mapSymboleJoueur;
		private boolean tourValide;
	
		
	/** 
	 * ******************** MAIN ********************
	 */
	public static void main (String args[]) throws IOException, InterruptedException{
		Joueur j = new Joueur(args);
		
		j.init(args[0]);
		j.execute(j.getPortClient());
	}
	
	/** 
	 * ******************** CONSTRUCTEUR ********************
	 */
	public Joueur (String args[]) throws SocketException{
		System.out.println(args[0]);
		this.setPortClient(Integer.parseInt(args[0]));
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
		

	

	private void init(String port) throws IOException {
		this.socket_listen = new DatagramSocket(null);
		this.socket_send = new DatagramSocket();
		
		if (socket_listen.isBound() || socket_send.isBound()){
			socket_listen.close();
			socket_send.close();
			this.socket_listen = new DatagramSocket(null);
			this.socket_send = new DatagramSocket();
		}
		
		this.socket_listen.bind(new InetSocketAddress(this.portClient));

		System.out.println("Demarrage du client ...");
		this.adrDest = new InetSocketAddress(ipServeur, portServeur);
		
		byte[] bufR = new byte[2048];
		DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);
		
		bufR = new String(port+"Ready").getBytes();
		dpR = new DatagramPacket(bufR, bufR.length, adrDest);
		this.socket_send.send(dpR);
		
		return;
	}


	private void execute(int port) throws IOException, InterruptedException
	{
		// On attend les colonnes/lignes décidées par le serveur
		String recu = recevoir();

		Fenetre(Integer.parseInt(recu));
		
		// On attend le symbole décidé par le serveur
		while(true){
			recu = recevoir();
			if (recu.matches("fin symbole")){
				break;
			}
			System.out.println("Symbole ?\t"+recu);
						
			String symboleRecu = recu.substring(0, recu.indexOf(":"));
			int portRecu = Integer.parseInt( recu.substring( recu.indexOf(":")+1 , recu.length() ) );
			setSymbole(portRecu, symboleRecu);
		}
		
		
		setVisible(true);

		do{
			jattendsMonTour();
			// La méthode de Fenêtre envoie la case cliquée
			
		}while(true);
	}
	
	
	private String recevoir() throws IOException{
		byte[] bufR = new byte[2048];
		DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);		
		this.socket_listen.receive(dpR);
		return new String(bufR, dpR.getOffset(), dpR.getLength());
	}

	
	private void jattendsMonTour() throws IOException {
		System.out.println(getPortClient()+": Je joue quand ?");
		String recu = recevoir();
		System.out.println("Recu :"+recu);
		
		setTour(false);

		if (recu.matches("joue")){
			System.out.println(getPortClient()+": C'est à moi!");
			setTour(true);
			
			return;
		}
		if (recu.matches("\\d:\\d")){
			marquerActionAutreJoueur(recu,getPortClient());
			jattendsMonTour();
		}
		if (recu.matches("ack")){
			System.out.println(getPortClient()+": C'est à l'autre");
			return;
		}
		if (recu.matches(".*win")){
			System.out.println("Partie terminée");
			finishGame();
			fenetreRejouer();
		}

	}

	
	
	private void finishGame() {
		for (int i = 0 ; i < tabButton.length ; i++){
			tabButton[i].setEnabled(false);
		}
		JButton yesButton = new JButton();
    	this.getContentPane().add(yesButton);
	}

	public void actionPerformed(ActionEvent arg) {
		if (!getTour()){return;}
		ImageIcon image = new ImageIcon("C:\\Users\\utilisateur\\Desktop\\Cours\\eclipse\\Projets\\XO\\src\\xopackage\\"+mapSymboleJoueur.get(portClient));
		
		for (int i = 0 ; i < tabButton.length ; i++){
			if (arg.getSource() == tabButton[i]){
				tabButton[i].setIcon(
						new ImageIcon(
								image.getImage().getScaledInstance(this.getHeight()/this.getNbLigne(), this.getWidth()/this.getNbColonne(), 100)));
				tabButton[i].setDisabledIcon(new ImageIcon (image.getImage().getScaledInstance(this.getHeight()/this.getNbLigne(), this.getWidth()/this.getNbColonne(), 100)));
				tabButton[i].setEnabled(false);
				
				setLastButton(i);
			
			try {envoyer(getLastButton(), portServeur);} 
			catch (IOException e) {e.printStackTrace();}

			return;
			}
		}
	}
	
	
	/** 
	 * ****************** Fenetre ********************
	**/
	
	public void Fenetre(int nbColLin){
		this.mapSymboleJoueur = new HashMap<Integer,String>();

		setNbLigne(nbColLin);
		setNbColonne(nbColLin);
	    GridLayout grille = new GridLayout(nbColLin,nbColLin);
		grille.setHgap(1);
		grille.setVgap(1);
	    int tailleGrille = nbColonne*nbLigne;
	    
		tabButton = new JButton[tailleGrille];
	    this.setTitle("XO "+getPortClient());
	    this.setSize(300, 300);
	    this.setLocationRelativeTo(null);               
	    this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	    this.setContentPane(pan);     

	    this.setLayout(grille);

	    for (int i = 0; i < (tailleGrille)  ; i++){
	    	tabButton[i] = new JButton();
	    	this.getContentPane().add(tabButton[i]);
	    	tabButton[i].addActionListener(this);
	    }
	
	    this.setVisible(true);	
	}
	
	
	public void fenetreRejouer(){
	    JButton yesButton = new JButton("Go");
	    JButton noButton = new JButton("Stop");
	    JOptionPane jop = new JOptionPane();
	    


	    class BoutonListener implements ActionListener{
	      public void actionPerformed(ActionEvent arg0) {  
	  	    
	    	boolean animated = true;
	        JOptionPane jop = new JOptionPane();    	
	        
	        int option = jop.showConfirmDialog(null, 
	          "Voulez-vous lancer l'animation ?", 
	          "Lancement de l'animation", 
	          JOptionPane.YES_NO_OPTION, 
	          JOptionPane.QUESTION_MESSAGE);

	        if(option == JOptionPane.OK_OPTION){
	          animated = true;
	          noButton.setEnabled(false);
	          noButton.setEnabled(true);    	
	        }
	      }    
	    }

	    class Bouton2Listener  implements ActionListener{
	      public void actionPerformed(ActionEvent e) {
	  	    
	    	boolean animated = true;
	        JOptionPane jop = new JOptionPane();    	
	        int option = jop.showConfirmDialog(null, 
	          "Voulez-vous arrêter l'animation ?",
	          "Arrêt de l'animation", 
	          JOptionPane.YES_NO_CANCEL_OPTION, 
	          JOptionPane.QUESTION_MESSAGE);

	        if(option != JOptionPane.NO_OPTION && 
	        option != JOptionPane.CANCEL_OPTION && 
	        option != JOptionPane.CLOSED_OPTION){
	          animated = false;	
	          yesButton.setEnabled(true);
	          yesButton.setEnabled(false);
	        }
	      }    
	    } 
	}
	

	
	
	public void marquerActionAutreJoueur(String coord, int portClient){
		int x = Integer.parseInt(coord.substring(0, coord.indexOf(":")));
		int y = Integer.parseInt(coord.substring(coord.indexOf(":") + 1, coord.length()));
		int i = (y-1)*getNbColonne() + (x-1);
		
		String symboleAutreJoueur = mapSymboleJoueur.get(getSymboleAutreClient());
		
		
		ImageIcon image = new ImageIcon("C:\\Users\\utilisateur\\Desktop\\Cours\\eclipse\\Projets\\XO\\src\\xopackage\\"+symboleAutreJoueur);
		
		this.tabButton[i].setIcon(
				new ImageIcon(
						new ImageIcon("C:\\Users\\utilisateur\\Desktop\\Cours\\eclipse\\Projets\\XO\\src\\xopackage\\"+symboleAutreJoueur).getImage().getScaledInstance(this.getHeight()/this.getNbLigne(), this.getWidth()/this.getNbColonne(), 100)));
		
		tabButton[i].setDisabledIcon(new ImageIcon (image.getImage().getScaledInstance(this.getHeight()/this.getNbLigne(), this.getWidth()/this.getNbColonne(), 100)));
		tabButton[i].setEnabled(false);
		
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

	public int getNbColonne() {return nbColonne;}
	public int getNbLigne() {return nbLigne;}
	public void setNbColonne(int nbColonne) {this.nbColonne = nbColonne;}
	public void setNbLigne(int nbLigne) {this.nbLigne = nbLigne;}
	
	public void setTour(boolean b){this.tour = b;}
	public boolean getTour(){return this.tour;}
	public void setSymbole(int portClient, String s){ this.mapSymboleJoueur.put(portClient, s);}
	/* ***********************/
	
	
	
	public int getPortClient() {return portClient;}
	public int getDimension() {return dimension;}
	public boolean getCestMonTour() {return cestMonTour;}
	public String getSymbole() { return this.mapSymboleJoueur.get(getPortClient()); }
	private boolean getValide() { return this.tourValide; }
	public String getLastButton(){return new String(this.lastX+":"+this.lastY); }
	

	public void setPortClient(int portClient) {this.portClient = portClient;}
	public void setDimension(int dimension) {this.dimension = dimension;}
	public void setCestMonTour(boolean b) {cestMonTour = b;}
	private void setValide(boolean b) { this.tourValide = b; }
	private void setLastButton(int i) {
		this.lastX = (i%getNbColonne()+1);
		this.lastY = (i/getNbColonne())+1;
	}
}
