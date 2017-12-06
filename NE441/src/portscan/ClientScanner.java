package portscan;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.PortUnreachableException;
import java.net.SocketException;
import java.net.SocketTimeoutException;

public class ClientScanner {
	private static final String ipToListen = "127.0.0.1";
	
	public static void main (String [] args) throws IOException {
		new ClientScanner().execute();
	}

	private void execute() throws IOException {
		DatagramSocket socket = new DatagramSocket();
		byte[] bufTest = "hello".getBytes();
		System.out.println("Début du scanning des ports UDP de 30 000 à 32000 sur la machine "+ ipToListen);
		
		
		for (int port = 30000 ; port < 32000 ; port ++) {
			try {
					DatagramPacket dpE = new DatagramPacket(bufTest, bufTest.length, new InetSocketAddress(ipToListen, port));
					socket.send(dpE);
					socket.setSoTimeout(2);
					
					byte[] bufR = new byte[2048];
					DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);
					socket.receive(dpR);
					System.out.println("Le serveur écoute sur le port X = "+ dpR.getPort() + "\nFin du programme");
				}
			
			catch (SocketTimeoutException ignored) {}
		}
	}
}
