package client;

import java.awt.AWTException;
import java.awt.MouseInfo;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
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
	private static final int portServeur = 5555;
	private DatagramSocket socket_listen;
	private DatagramPacket dpR;
	private byte[] bufR;
	
	private DatagramSocket socket_send;
	private DatagramPacket dpE;
	private byte[] bufE;
	
	private InetSocketAddress adrDest;
	
	
	public static void main (String args[]) throws InterruptedException, IOException, AWTException {
		ClientExe c = new ClientExe();
		c.testIt();
	}
	
	public void envoyer(String msg, String adresse, int port) throws IOException{
		this.adrDest = new InetSocketAddress(adresse, port);
		this.bufE = msg.getBytes();
		this.dpE = new DatagramPacket(bufE, bufE.length, adrDest);
		this.socket_send.send(this.dpE);
		System.out.println("Message à :"+adresse+":"+port+" : "+new String(bufE, dpE.getOffset(), dpE.getLength()));

		return;
	}
	
	
	public void testIt() throws InterruptedException, IOException, AWTException {		
		getSystemProperties();
		FrameClientScreen fcs = new FrameClientScreen();
		
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
	

	
	public ImageIcon FullScreenCaptureResized(int width, int height) throws IOException, AWTException {
	       try {
	            Rectangle screenRec = new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());  
	            BufferedImage bi = new Robot().createScreenCapture(screenRec);
	            BufferedImage cursor = ImageIO.read(new File(ressourcesDirectory + "cursor.gif"));
	            bi.getGraphics().drawImage(cursor, getMousePositionX(), getMousePositionY(), null);
	            
	            ImageIcon nativeScreen = new ImageIcon(bi);
	            java.awt.Image imgResized = nativeScreen.getImage().getScaledInstance(width, height, java.awt.Image.SCALE_SMOOTH);

	            return new ImageIcon(imgResized);
	        }
	        catch (AWTException ex) {System.err.println(ex);}
		return null;
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


	
}
