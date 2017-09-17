package hacker;

import java.awt.MouseInfo;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;

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

	/* Réseau */
	private static final int portServeur = 13337;
	private final int portClient = 13338;
	private InetSocketAddress adrDest = new InetSocketAddress("127.0.0.1", portClient);

	private static ServerSocket listenSocket;
	private static Socket socketConnexion;

	
	
	public static void main (String [] args) throws IOException {
		HackerExe h = new HackerExe();
		h.initListen();
		h.execute();
		printClientInterface();
	}
	
	
	private static void printClientInterface() {
		new Thread(new Runnable() {
			@Override
			public void run() {
					FrameClientScreen fcs = new FrameClientScreen();
					fcs.setBounds(2000, 200, frameWidth+10, frameHeight+90);
					fcs.setVisible(true);
					System.out.println("print");
					while (true) {
						//Thread.sleep(250);
						//fcs.getLblImage().setIcon(FullScreenCaptureResized( frameWidth , frameHeight ));
						//fcs.getLabelMouse().setLocation(clientMousePostionX, clientMousePostionY);
					}
			}
		}).start();		
	}


	private void execute() throws IOException {
		
		/*new Thread(new Runnable() {
			@Override
			public void run() {*/
				while (true) {
			
					String msg = null;
					try { msg = receiveTCP();} 
					catch (IOException e) {e.printStackTrace();	}
					System.out.println("msg = "+msg);
					
					if (msg.matches(".*Resolution.*")) {
						String[] resolution = msg.split(":");
		
						clientResolutionX = Integer.parseInt(msg.substring(msg.indexOf("=")+1, msg.indexOf(":")));
						clientResolutionY = Integer.parseInt(msg.substring(msg.indexOf(":")+1, msg.length()));
						frameWidth = (2*clientResolutionX/3);
						frameHeight = (2*clientResolutionY/3);
					}
					
					if (msg.matches(".*Mouse.*")) {
						String[] resolution = msg.split(":");
						
						clientMousePostionX = Integer.parseInt(msg.substring(msg.indexOf("=")+1, msg.indexOf(":")));
						clientMousePostionY = Integer.parseInt(msg.substring(msg.indexOf(":")+1, msg.length()));
					}
					else {
						printClientInterface();
					}
				}
			//}
		//}).start();
	}


	private void initListen() throws IOException {
		listenSocket = new ServerSocket();
		listenSocket.bind(adrDest);
	}

	public void envoyer(String msg, String adresse, int port) throws IOException {
		this.adrDest = new InetSocketAddress(adresse, port);
		byte[] bufE = msg.getBytes();
		OutputStream os = socketConnexion.getOutputStream();
		System.out.println("Message à :"+adresse+":"+port+" : "+msg.toString());
		return;
	}
	
	private String receiveTCP() throws IOException {
		socketConnexion = listenSocket.accept();
		byte[] bufR = new byte[2048];
		InputStream is = socketConnexion.getInputStream();
		int lenBufR = is.read(bufR);
		String msgRecu = new String(bufR, 0 , lenBufR );
		System.out.println("Reponse recue = "+msgRecu);
		return msgRecu;
	}
}
