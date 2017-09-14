package client;

import java.awt.AWTException;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.EventQueue;
import java.awt.GridLayout;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.io.IOException;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

public class FrameClientScreen extends JFrame {

	private JPanel contentPane;
	private JLayeredPane layeredPane;
	private JLabel backgroundScreen;
	private JLayeredPane mainLayer;
	private JPanel subLayer;


	public JLayeredPane getMainLayer() {
		return mainLayer;
	}


	public void setMainLayer(JLayeredPane mainLayer) {
		this.mainLayer = mainLayer;
	}


	public JPanel getSubLayer() {
		return subLayer;
	}


	public void setSubLayer(JPanel subLayer) {
		this.subLayer = subLayer;
	}


	/**
	 * Create the frame.
	 */
    public FrameClientScreen() throws IOException {
        JFrame frame = new JFrame("FrameDemoaze");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        mainLayer = new JLayeredPane();
        frame.add(mainLayer, BorderLayout.CENTER);

        JLabel label = new JLabel("LABEL", JLabel.CENTER);
        label.setBounds(100, 100, 200, 100);
        label.setOpaque(true);
        label.setBackground(Color.cyan);
        mainLayer.add(label, 1);

        subLayer = new JPanel(new BorderLayout());
		
        backgroundScreen = new JLabel(FullScreenCaptureExample(960, 540) );//lp.getLayeredPane().getWidth() , lp.getLayeredPane().getHeight() ) );
		backgroundScreen.setBounds(5, 5, 800, 600);
		backgroundScreen.setOpaque(true);
		backgroundScreen.setBackground(Color.green);
        subLayer.add(backgroundScreen, BorderLayout.SOUTH);
        mainLayer.add(backgroundScreen, 2);

        frame.pack();
        frame.setSize(980, 540);
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
        
    }

	
    public JLabel getBackgroundScreen() {
		return backgroundScreen;
	}


	public void setBackgroundScreen(JLabel backgroundScreen) {
		this.backgroundScreen = backgroundScreen;
	}
	
	public JLayeredPane getLayeredPane() {
		return layeredPane;
	}

	public void setLayeredPane(JLayeredPane layeredPane) {
		this.layeredPane = layeredPane;
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
	
	/*public JLabel getLblImage() {
		return lblImage;
	}

	public void setLblImage(JLabel lblImage) {
		this.lblImage = lblImage;
	}*/

}
