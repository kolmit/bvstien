package xopackage2;

import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.JLabel;
import java.awt.Font;
import javax.swing.JButton;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

public class ReplayFrame extends JFrame {

	private JPanel contentPane;
	private JButton buttonNo;
	private JButton buttonYes;
	private boolean choiceReplay = false;


	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					ReplayFrame frame = new ReplayFrame();
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
	public ReplayFrame() {
		setResizable(false);
		setTitle("Rejouer ?");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 328, 118);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		JLabel lblVoulezvousRej = new JLabel("Voulez-vous rejouer ?");
		lblVoulezvousRej.setFont(new Font("Tahoma", Font.BOLD, 15));
		lblVoulezvousRej.setBounds(77, 0, 170, 37);
		contentPane.add(lblVoulezvousRej);
		
		buttonYes = new JButton("Oui");
		buttonYes.setFont(new Font("Tahoma", Font.BOLD, 12));
		buttonYes.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
			}
		});
		buttonYes.setBounds(49, 41, 101, 37);
		contentPane.add(buttonYes);
		
		buttonNo = new JButton("Non");
		buttonNo.setFont(new Font("Tahoma", Font.BOLD, 12));
		buttonNo.setBounds(161, 41, 101, 37);
		buttonNo.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
			}
		});
		contentPane.add(buttonNo);
	}
	
	public JButton getButtonNo() {return buttonNo;}
	public JButton getButtonYes() {return buttonYes;}
	public void setButtonYes(JButton buttonYes) {this.buttonYes = buttonYes;}
	public void setButtonNo(JButton buttonNo) {this.buttonNo = buttonNo;}

	public boolean getChoice() {return choiceReplay ;}
	public void setChoice(boolean b) {choiceReplay = b;}
}
