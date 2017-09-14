package client;

import java.awt.EventQueue;
import java.awt.GridLayout;

import javax.swing.JFrame;
import javax.swing.JLayeredPane;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

public class FrameClientScreen extends JFrame {

	private JPanel contentPane;
	private JLayeredPane layeredPane;




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
		//setBounds(100, 100, 450, 300);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(new GridLayout(0, 1, 0, 0));
		
		layeredPane = new JLayeredPane();
		contentPane.add(layeredPane);
		layeredPane.setLayout(new GridLayout(1, 0, 0, 0));
	}

	public JLayeredPane getLayeredPane() {
		return layeredPane;
	}

	public void setLayeredPane(JLayeredPane layeredPane) {
		this.layeredPane = layeredPane;
	}
	
	
	/*public JLabel getLblImage() {
		return lblImage;
	}

	public void setLblImage(JLabel lblImage) {
		this.lblImage = lblImage;
	}*/

}
