package client;

import java.awt.AWTException;
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

	
	
	public static void main (String args[]) throws InterruptedException, IOException {
		ClientExe c = new ClientExe();
		c.testIt();
	}
	
	public void testIt() throws InterruptedException, IOException {		
		getSystemProperties();
		FullScreenCaptureExample();
		
		FrameClientScreen fcs = new FrameClientScreen();
		fcs.setBounds(new Rectangle(600, 400, (int)screenResolutionWidth/2, (int)screenResolutionHeight/2));
		fcs.setVisible(true);
		
		while (true) {
			getMouse();
			Thread.sleep(50);
			fcs.getLblImage().setIcon(FullScreenCaptureExample());
			//System.out.println("Mouse : " + getMousePositionX() + ":" + getMousePositionY());
		}
		

	}
	
	public void getSystemProperties() {
		setScreenResolutionHeight( Toolkit.getDefaultToolkit().getScreenSize().getHeight() );
		setScreenResolutionWidth( Toolkit.getDefaultToolkit().getScreenSize().getWidth() );
		System.out.println(screenResolutionWidth + " x " +screenResolutionHeight);
	}
	
	
	public void getMouse() {
			new Thread(new Runnable() {
				public void run() {
						setMousePositionX(MouseInfo.getPointerInfo().getLocation().getX());
						setMousePositionY(MouseInfo.getPointerInfo().getLocation().getY());
				}
			}).start();	
	}

	
	public ImageIcon FullScreenCaptureExample() throws IOException {
	       try {
	            Rectangle screenRect = new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());          
	            return (new ImageIcon(new Robot().createScreenCapture(screenRect)));
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
