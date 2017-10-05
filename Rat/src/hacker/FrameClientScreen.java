package hacker;

import java.awt.EventQueue;
import java.awt.GridLayout;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import javax.swing.border.EmptyBorder;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.Box;

@SuppressWarnings("serial")
public class FrameClientScreen extends JFrame {

	private JLayeredPane contentPane;
	private JLabel lblImage;
	private JLabel labelMouse;




	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					FrameClientScreen frame = new FrameClientScreen();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 */
	public FrameClientScreen() {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setResizable(true);

		contentPane = new JLayeredPane();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(new GridLayout(0, 1, 0, 0));
		
		Box verticalBox = Box.createVerticalBox();
		contentPane.add(verticalBox);
		
		
		lblImage = new JLabel();
		verticalBox.add(lblImage);
		
	}
	
	
	public JLabel getLblImage() {
		return lblImage;
	}

	public void setLblImage(JLabel lblImage) {
		this.lblImage = lblImage;
	}

	/*public void setMenuBar(JMenuBar menuBar) {
		this.menuBar = menuBar;
	}*/

	public JLabel getLabelMouse() {
		return labelMouse;
	}

	public void setLabelMouse(JLabel labelMouse) {
		this.labelMouse = labelMouse;
	}

}



	
    /*
     * OUT OF MEMORY
     * 
     * private void getScreen() throws IOException, InterruptedException {
    	new Thread(new Runnable() {
			@Override
			public void run() {
				while (true) {
					try {
						Thread.sleep(200);
						backgroundScreen = new JLabel(FullScreenCaptureExample(960, 540) );
					} 
					catch (IOException | InterruptedException e) { e.printStackTrace(); }
					backgroundScreen.setBounds(5, 5, 800, 600);
					backgroundScreen.setOpaque(true);
					backgroundScreen.setBackground(Color.green);
			        subLayer.add(backgroundScreen, BorderLayout.SOUTH);
			        mainLayer.add(backgroundScreen, 2);		
		    	}				
			}
		}).start();
    	
	}*/

