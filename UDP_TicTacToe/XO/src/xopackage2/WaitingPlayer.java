package xopackage2;

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

public class WaitingPlayer extends JFrame {

	private JPanel contentPane;
	private JLabel lblEnAttenteDautres;
	

	/**
	 * Create the frame.
	 */
	public WaitingPlayer() throws InterruptedException {
		setResizable(false);
		setBackground(new Color(0, 51, 102));
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 360, 108);
		contentPane = new JPanel();
		contentPane.setBackground(new Color(253, 245, 230));
		contentPane.setBorder(null);
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		lblEnAttenteDautres = new JLabel("En attente d'autres joueurs");
		lblEnAttenteDautres.setFont(new Font("Source Sans Pro", Font.BOLD, 20));
		lblEnAttenteDautres.setBounds(41, 0, 266, 73);
		contentPane.add(lblEnAttenteDautres);
	}

}
