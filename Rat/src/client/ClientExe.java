package client;

import java.awt.AWTException;
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
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

public class ClientExe {
	private int screenResolution;	
	private int screenResolutionHeight;
	private int screenResolutionWidth;
	
	private final String ressourcesDirectory = System.getProperty("user.dir") + "\\ressources\\";

	private int frameClientWidth; 
	private int frameClientHeight;
	
	private boolean fullscreenSelected = false;

	/* Réseau */
	private static final int portServeur = 13337;
	private final int portClient = 13338;
	private InetSocketAddress adrDest = new InetSocketAddress("127.0.0.1", portClient);

	private static Socket socketClient;
	
	
	
	public static void main (String args[]) throws InterruptedException, IOException, AWTException {
		ClientExe c = new ClientExe();
		c.init();
		while(true) {
			Thread.sleep(200);
			c.FullScreenCaptureResized(1280, 720);
		}
	}
	
	
	private void init() throws HeadlessException, IOException {
		initSocket();
		NetworkgetSystemProperties();
	}

	public void NetworkgetSystemProperties() throws HeadlessException, IOException {
		envoyer("Resolution=" +(int) Toolkit.getDefaultToolkit().getScreenSize().getWidth()+ ":"+(int) Toolkit.getDefaultToolkit().getScreenSize().getHeight());
	}
	
	private void initSocket() throws IOException {
		socketClient = new Socket();
		socketClient.connect(adrDest);
	}

	public void envoyer(String msg) throws IOException {
		byte[] bufE = msg.getBytes();
		OutputStream os = socketClient.getOutputStream();
		os.write(bufE);
		System.out.println("Message à :"+portServeur+" : "+msg.toString());
		return;
	}
	
	public void envoyer(byte[] msg) throws IOException {
		OutputStream os = socketClient.getOutputStream();
		os.write(msg);
		System.out.println("Message à :"+portServeur+" : "+msg.toString());
		return;
	}

	
	
	private static String receiveTCP(DatagramSocket socket) throws IOException {
		byte[] bufR = new byte[2048];
		InputStream is = socketClient.getInputStream();
		int lenBufR = is.read(bufR);
		String msgRecu = new String(bufR, 0 , lenBufR );
		System.out.println("Reponse recue = "+msgRecu);
		return msgRecu;
	}
	
	public ImageIcon FullScreenCaptureResized(int width, int height) throws IOException, AWTException {
	       try {
	    	   	int mX = (int)MouseInfo.getPointerInfo().getLocation().getX();
	    	   	int mY = (int)MouseInfo.getPointerInfo().getLocation().getY();

				envoyer("Mouse=" + mX + ":" + mY);
	            Rectangle screenRec = new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());  
	            BufferedImage bi = new Robot().createScreenCapture(screenRec);
	            BufferedImage cursor = ImageIO.read(new File(ressourcesDirectory + "cursor.gif"));
	            bi.getGraphics().drawImage(cursor, mX, mY, null);
	            
	            ImageIcon nativeScreen = new ImageIcon(bi);
	            java.awt.Image imgResized = nativeScreen.getImage().getScaledInstance(width, height, java.awt.Image.SCALE_SMOOTH);

	            ByteArrayOutputStream baos = new ByteArrayOutputStream();
	            ImageIO.write(bi, "gif", baos);
	            System.out.println("SIZE : "+baos.size());
	            envoyer( baos.toByteArray() );
	            baos.close();

	    		
	            return new ImageIcon(imgResized);
	        }
	        catch (AWTException ex) {System.err.println(ex);}
		return null;
	}
	
	/*
	public static void main (String args[]) throws InterruptedException, IOException, AWTException {
		ClientExe c = new ClientExe();
		c.testIt();
	}
	

	
	
	public void testIt() throws InterruptedException, IOException, AWTException {		
		getSystemProperties();
		FrameClientScreen fcs = new FrameClientScreen();
		NetworkgetSystemProperties();
		fcs.setBounds(2000, 200, frameClientWidth+10, frameClientHeight+90);
		fcs.setVisible(true);
		
		while (true) {
			Thread.sleep(250);
			fcs.getLblImage().setIcon(FullScreenCaptureResized( frameClientWidth , frameClientHeight ));
			fcs.getLabelMouse().setLocation((int)MouseInfo.getPointerInfo().getLocation().getX(), (int)MouseInfo.getPointerInfo().getLocation().getY());
		}
	}
	
	public void getSystemProperties() {
		setScreenResolutionHeight( (int) Toolkit.getDefaultToolkit().getScreenSize().getHeight() );
		setScreenResolutionWidth( (int) Toolkit.getDefaultToolkit().getScreenSize().getWidth() );
		
		frameClientHeight = (int) ( 2*getScreenResolutionHeight()/3 );
		frameClientWidth = (int) ( 2*getScreenResolutionWidth()/3 ); 

		System.out.println(getScreenResolutionWidth() + " xxx " +getScreenResolutionHeight());
		System.out.println(frameClientWidth + " xxx " +frameClientHeight);
	}
	
	public void NetworkgetSystemProperties() throws HeadlessException, IOException {
		envoyer((int) Toolkit.getDefaultToolkit().getScreenSize().getWidth()+ ":"+(int) Toolkit.getDefaultToolkit().getScreenSize().getHeight(), "127.0.0.1");
	}
	

	

	

	
	
	public int getScreenResolution() {
		return screenResolution;
	}
	public void setScreenResolution(int screenResolution) {
		this.screenResolution = screenResolution;
	}

	public double getScreenResolutionHeight() {
		return screenResolutionHeight;
	}

	public void setScreenResolutionHeight(int screenResolutionHeight) {
		this.screenResolutionHeight = screenResolutionHeight;
	}

	public double getScreenResolutionWidth() {
		return screenResolutionWidth;
	}

	public void setScreenResolutionWidth(int screenResolutionWidth) {
		this.screenResolutionWidth = screenResolutionWidth;
	}

	public int getMousePositionX() {
		return (int) MouseInfo.getPointerInfo().getLocation().getX();
	}


	public int getMousePositionY() {
		return (int) MouseInfo.getPointerInfo().getLocation().getY();
	}

*/
	
}
