package hacker;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.SocketException;

public class HackerExe {
	private static DatagramSocket m_sock;
	
	/* Réseau */
	private static final int portServeur = 5555;
	private DatagramSocket socket_listen;
	private DatagramPacket dpR;
	private byte[] bufR;
	
	private DatagramSocket socket_send;
	private DatagramPacket dpE;
	private byte[] bufE;
	
	private InetSocketAddress adrDest;

	public static void main (String [] args) throws IOException {
		HackerExe h = new HackerExe();
		h.init();
		execute();
	}
	
	
	private static void execute() throws IOException {
		while (true) {
			String msg = receiveUDP(m_sock);
			System.out.println("msg = "+msg);
			
		}
	}


	private void init() throws SocketException {
		m_sock = new DatagramSocket(null);		
	}


	public void envoyer(String msg, String adresse, int port) throws IOException{
		this.adrDest = new InetSocketAddress(adresse, port);
		this.bufE = msg.getBytes();
		this.dpE = new DatagramPacket(bufE, bufE.length, adrDest);
		this.socket_send.send(this.dpE);
		System.out.println("Message à :"+adresse+":"+port+" : "+new String(bufE, dpE.getOffset(), dpE.getLength()));

		return;
	}
	
	private static String receiveUDP(DatagramSocket socket) throws IOException
	{
		System.out.println("wait");
		byte[] bufR = new byte[2048];
		DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);
		socket.receive(dpR);
		return new String(bufR, dpR.getOffset(), dpR.getLength());
	}
}
