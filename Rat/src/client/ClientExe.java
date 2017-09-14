package client;

import java.awt.AWTException;
import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.MouseInfo;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Locale;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.plugins.jpeg.JPEGImageWriteParam;
import javax.imageio.stream.ImageOutputStream;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;

import javafx.scene.image.Image;

public class ClientExe {
	private int screenResolution;	
	private double screenResolutionHeight;
	private double screenResolutionWidth;
	
	private double mousePositionX;
	private double mousePositionY;
	
	private final String screenshotFormat = "jpg";
	private final String screenshotClient = "tmpScreen." + screenshotFormat;
	private final String screenshotDirectory = System.getProperty("user.dir") + "\\screenDir\\";
	private int id = 0;
	private int frameClientWidth; 
	private int frameClientHeight;

	
	
	public static void main (String args[]) throws InterruptedException, IOException {
		ClientExe c = new ClientExe();

	    //FrameClientScreen lp = new FrameClientScreen();
		/*SimpleLayers lp = new SimpleLayers();
		JLabel screen = new JLabel( c.FullScreenCaptureExample( 500,500 ));//fcs.getLayeredPane().getWidth() , fcs.getLayeredPane().getHeight()
		lp.setBackgroundScreen(new JLabel( c.FullScreenCaptureExample(1500,800) ) );//fcs.getLayeredPane().getWidth() , fcs.getLayeredPane().getHeight()
		lp.setBounds(2000, 400, 900, 540);
	    */
	    
		c.testIt();
	}
	
	public void testIt() throws InterruptedException, IOException {		
		getSystemProperties();
		FrameClientScreen fcs = new FrameClientScreen();
		//fcs.setBounds(2000, 400, frameClientWidth, frameClientHeight);
		//fcs.setVisible(true);
		
		while (true) {
			getMouse();
			Thread.sleep(250);
			JLabel screen = new JLabel( FullScreenCaptureExample( 500,500/*fcs.getLayeredPane().getWidth() , fcs.getLayeredPane().getHeight()*/ ) );
			
			fcs.getSubLayer().add(screen, BorderLayout.SOUTH);
			fcs.getMainLayer().add(screen, 2);
			//fcs.getLayeredPane().setIcon(  );
		}
	}
	
	public void getSystemProperties() {
		setScreenResolutionHeight( Toolkit.getDefaultToolkit().getScreenSize().getHeight() );
		setScreenResolutionWidth( Toolkit.getDefaultToolkit().getScreenSize().getWidth() );
		frameClientHeight = (int) (getScreenResolutionHeight()/2);
		frameClientWidth = (int) (getScreenResolutionWidth()/2); 

		//System.out.println(frameClientWidth + " x " +frameClientHeight);
	}
	
	
	public void getMouse() {
			new Thread(new Runnable() {
				public void run() {
						setMousePositionX(MouseInfo.getPointerInfo().getLocation().getX());
						setMousePositionY(MouseInfo.getPointerInfo().getLocation().getY());
				}
			}).start();	
	}

	
	public ImageIcon FullScreenCaptureExample(int width, int height) throws IOException {
	       try {
	            Rectangle screenRect = new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());        
	            ImageIcon nativeScreen = new ImageIcon(new Robot().createScreenCapture(screenRect));
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

	public void setScreenResolutionHeight(double screenResolutionHeight) {
		this.screenResolutionHeight = screenResolutionHeight;
	}

	public double getScreenResolutionWidth() {
		return screenResolutionWidth;
	}

	public void setScreenResolutionWidth(double screenResolutionWidth) {
		this.screenResolutionWidth = screenResolutionWidth;
	}

	public double getMousePositionX() {
		return mousePositionX;
	}

	public void setMousePositionX(double mousePositionX) {
		this.mousePositionX = mousePositionX;
	}

	public double getMousePositionY() {
		return mousePositionY;
	}

	public void setMousePositionY(double mousePositionY) {
		this.mousePositionY = mousePositionY;
	}

	
}
