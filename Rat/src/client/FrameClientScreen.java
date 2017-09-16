package client;

import java.awt.EventQueue;
import java.awt.GridLayout;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import javax.swing.border.EmptyBorder;
import java.awt.Button;
import java.awt.GridBagLayout;
import java.awt.GridBagConstraints;
import java.awt.Insets;
import javax.swing.JButton;
import java.awt.FlowLayout;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.BoxLayout;
import com.jgoodies.forms.layout.FormLayout;
import com.jgoodies.forms.layout.ColumnSpec;
import com.jgoodies.forms.layout.RowSpec;
import com.jgoodies.forms.layout.FormSpecs;
import javax.swing.Box;
import java.awt.BorderLayout;

@SuppressWarnings("serial")
public class FrameClientScreen extends JFrame {

	private JLayeredPane contentPane;
	private JLabel lblImage;

	private JButton btnFullscreen;
	private JButton btnEcran;
	private JButton btnWebcam;




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

		contentPane = new JLayeredPane();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(new BorderLayout(0, 0));
		
		Box verticalBox = Box.createVerticalBox();
		contentPane.add(verticalBox);
		
		Box horizontalBox = Box.createHorizontalBox();
		verticalBox.add(horizontalBox);
		
		btnEcran = new JButton("Ecran");
		horizontalBox.add(btnEcran);
		
		btnFullscreen = new JButton("FullScreen");
		horizontalBox.add(btnFullscreen);
		
		btnWebcam = new JButton("New button");
		horizontalBox.add(btnWebcam);
		
		Box horizontalBox_1 = Box.createHorizontalBox();
		verticalBox.add(horizontalBox_1);
		
		lblImage = new JLabel();
		horizontalBox_1.add(lblImage);
	}
	
	
	public JLabel getLblImage() {
		return lblImage;
	}

	public void setLblImage(JLabel lblImage) {
		this.lblImage = lblImage;
	}

	public JButton getBtnFullscreen() {
		return btnFullscreen;
	}

	public void setBtnFullscreen(JButton btnFullscreen) {
		this.btnFullscreen = btnFullscreen;
	}

	public JButton getBtnEcran() {
		return btnEcran;
	}

	public void setBtnEcran(JButton btnEcran) {
		this.btnEcran = btnEcran;
	}

	public JButton getBtnWebcam() {
		return btnWebcam;
	}

	public void setBtnWebcam(JButton btnWebcam) {
		this.btnWebcam = btnWebcam;
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

