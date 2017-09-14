package client;

import java.awt.AWTException;
import java.awt.GraphicsDevice;
import java.awt.GraphicsEnvironment;
import java.awt.MouseInfo;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;

import javax.swing.ImageIcon;

public class ClientExe {
	private int screenResolution;	
	private int screenResolutionHeight;
	private int screenResolutionWidth;
	
	private double mousePositionX;
	private double mousePositionY;
	
	private final String screenshotFormat = "jpg";
	private final String screenshotClient = "tmpScreen." + screenshotFormat;
	private final String screenshotDirectory = System.getProperty("user.dir") + "\\screenDir\\";
	private int id = 0;
	private int frameClientWidth; 
	private int frameClientHeight;
	
	private boolean fullscreenSelected = false;

	
	
	public static void main (String args[]) throws InterruptedException, IOException {
		ClientExe c = new ClientExe();
		c.testIt();
	}
	
	public void testIt() throws InterruptedException, IOException {		
		getSystemProperties();
		FrameClientScreen fcs = new FrameClientScreen();
		System.out.println(frameClientWidth + " x " +frameClientHeight);
		fcs.getBtnFullscreen().addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				fullscreenSelected = true;			
			}
		});
		fcs.setBounds(2000, 400, frameClientWidth, frameClientHeight);
		fcs.setVisible(true);
		
		while (true) {
			getMouse();
			Thread.sleep(250);
			if (fullscreenSelected) {
				fcs.getLblImage().setIcon(FullScreenCaptureBig(screenResolutionHeight, screenResolutionWidth));
			}
			else {
				fcs.getLblImage().setIcon(FullScreenCaptureResized( frameClientWidth , frameClientHeight ));
			}
		}
	}
	
	public void getSystemProperties() {
		setScreenResolutionHeight( (int) Toolkit.getDefaultToolkit().getScreenSize().getHeight() );
		setScreenResolutionWidth( (int) Toolkit.getDefaultToolkit().getScreenSize().getWidth() );
		frameClientHeight = (int) (getScreenResolutionHeight()/2);
		frameClientWidth = (int) (getScreenResolutionWidth()/2); 

		System.out.println(frameClientWidth + " x " +frameClientHeight);
	}
	
	
	public void getMouse() {
			new Thread(new Runnable() {
				public void run() {
						setMousePositionX(MouseInfo.getPointerInfo().getLocation().getX());
						setMousePositionY(MouseInfo.getPointerInfo().getLocation().getY());
				}
			}).start();	
	}

	
	public ImageIcon FullScreenCaptureResized(int width, int height) throws IOException {
	       try {
	            Rectangle screenRec = new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());        
	            ImageIcon nativeScreen = new ImageIcon(new Robot().createScreenCapture(screenRec));
	            java.awt.Image imgResized = nativeScreen.getImage().getScaledInstance(width, height, java.awt.Image.SCALE_SMOOTH);
	            return new ImageIcon(imgResized);
	        }
	        catch (AWTException ex) {System.err.println(ex);}
		return null;
	}
	
	public ImageIcon FullScreenCaptureBig(int width, int height) throws IOException {
	       try {
	            Rectangle screenRec = new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());        
	            ImageIcon nativeScreen = new ImageIcon(new Robot().createScreenCapture(screenRec));
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
