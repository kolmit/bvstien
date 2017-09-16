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
import java.awt.MenuBar;

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
import javax.swing.JMenuBar;
import javax.swing.JMenu;
import javax.swing.JMenuItem;
import java.awt.Color;
import java.awt.Font;
import javax.swing.GroupLayout;
import javax.swing.GroupLayout.Alignment;

@SuppressWarnings("serial")
public class FrameClientScreen extends JFrame {

	private JLayeredPane contentPane;
	private JLabel lblImage;
	private JMenuBar menuBar;
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
		setResizable(false);

		contentPane = new JLayeredPane();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(new BoxLayout(contentPane, BoxLayout.X_AXIS));
		
		Box verticalBox = Box.createVerticalBox();
		contentPane.add(verticalBox);
		
		Box horizontalBox = Box.createHorizontalBox();
		verticalBox.add(horizontalBox);
		
		menuBar = new JMenuBar();
		horizontalBox.add(menuBar);
		
		JMenu mnNewMenu = new JMenu("Ecran");
		menuBar.add(mnNewMenu);
		
		JMenuItem mntmEcran = new JMenuItem("Ecran 1");
		mntmEcran.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				System.out.println("Yelala");
			}
		});
		mnNewMenu.add(mntmEcran);
		
		JMenu mnWebcam = new JMenu("Webcam");
		menuBar.add(mnWebcam);
		
		JMenuItem mntmWebcam = new JMenuItem("Webcam");
		mnWebcam.add(mntmWebcam);
		
		Box horizontalBox_1 = Box.createHorizontalBox();
		verticalBox.add(horizontalBox_1);
		
		lblImage = new JLabel();
		horizontalBox_1.add(lblImage);
		
		labelMouse = new JLabel(".");
		horizontalBox_1.add(labelMouse);
		labelMouse.setForeground(Color.RED);
		labelMouse.setFont(new Font("Tahoma", Font.BOLD, 15));
	}
	
	
	public JLabel getLblImage() {
		return lblImage;
	}

	public void setLblImage(JLabel lblImage) {
		this.lblImage = lblImage;
	}

	public void setMenuBar(JMenuBar menuBar) {
		this.menuBar = menuBar;
	}

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

