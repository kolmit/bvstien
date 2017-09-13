package client;

import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.JLabel;

public class FrameClientScreen extends JFrame {

	private JPanel contentPane;
	private JLabel lblImage;




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
		contentPane.setLayout(new BorderLayout(0, 0));
		setContentPane(contentPane);
		
		lblImage = new JLabel("");
		contentPane.add(lblImage, BorderLayout.NORTH);
	}
	
	
	public JLabel getLblImage() {
		return lblImage;
	}

	public void setLblImage(JLabel lblImage) {
		this.lblImage = lblImage;
	}

}
