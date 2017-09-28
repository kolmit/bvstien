package utils;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.SocketException;

	/**
	 * Serveur basique UDP
	 */
	public abstract class ServeurUDP
	{
		protected DatagramSocket sockListen;

		protected void initSocket(int portServeur) throws SocketException {
			sockListen = new DatagramSocket(null);
			sockListen.bind(new InetSocketAddress(portServeur));
		}
		
		
		protected String recevoir() throws IOException{
			byte[] bufR = new byte[2048];
			DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);
			sockListen.receive(dpR);
			return new String(bufR, dpR.getOffset(), dpR.getLength());
		}
			
		
		protected void envoyer(String message, String adresse, int port) throws IOException{
			try {
				byte[] bufE = new String(message).getBytes();
				DatagramPacket dpE = new DatagramPacket(bufE, bufE.length, new InetSocketAddress(adresse, port));
				sockListen.send(dpE);
			} 
			catch (Exception e) {
				e.printStackTrace();
			}
		}
	}