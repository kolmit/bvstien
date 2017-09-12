package commonframes;

import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import java.awt.Color;
import javax.swing.border.EtchedBorder;
import javax.swing.border.BevelBorder;
import javax.swing.JLabel;
import java.awt.Font;


import javax.swing.JFrame;

public class PrintAdress extends JFrame {
	private JPanel contentPane;
	private JLabel lblPrintAdress;
	private String myIP;
	private int myPort;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					PrintAdress frame = new PrintAdress();
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
	public PrintAdress() throws InterruptedException {
		setResizable(false);
		setBackground(new Color(0, 51, 102));
		setDefaultCloseOperation(JFrame.HIDE_ON_CLOSE);
		setBounds(100, 100, 360, 108);
		setTitle("IP : Port");
		contentPane = new JPanel();
		contentPane.setBackground(new Color(253, 245, 230));
		contentPane.setBorder(null);
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		setLblPrintAdress(new JLabel());//"IP : " + getIP() + "\nPORT : " + getMyPort() );
		getLblPrintAdress().setFont(new Font("Source Sans Pro", Font.BOLD, 15));
		getLblPrintAdress().setBounds(41, 0, 266, 73);
		contentPane.add(getLblPrintAdress());
	}

	public int getMyPort() {return myPort;}
	public void setPort(int port) {myPort = port;}

	public void setIP(String ip) {myIP = ip;}
	public String getIP() {return myIP;}

	public JLabel getLblPrintAdress() {
		return lblPrintAdress;
	}

	public void setLblPrintAdress(JLabel lblPrintAdress) {
		this.lblPrintAdress = lblPrintAdress;
	}

}
