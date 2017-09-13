package typeracer;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;

public class Nickname extends JFrame {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4949800908078422833L;
	private JPanel contentPane;
	private JTextField textField;
	private String NickNameJoueur;
	private boolean accessed;
	private boolean clicked;


	/**
	 * Create the frame.
	 */
	public Nickname() {
		setTitle("Entrez votre nom");
		setResizable(false);
		setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		setBounds(100, 100, 353, 104);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		textField = new JTextField();
		textField.setBounds(50, 0, 250, 39);
		contentPane.add(textField);
		textField.setColumns(10);
		
		JButton btnNewButton = new JButton("Valider");
		btnNewButton.setBounds(113, 46, 135, 23);
		btnNewButton.addActionListener(new ActionListener() {
			
			public void actionPerformed(ActionEvent arg0) {
				setClicked(true);
				setNickNameJoueur(textField.getText());
				while (!accessed){
					try { Thread.sleep(20); } 
					catch (InterruptedException e) { e.printStackTrace(); }
				}
				setVisible(false);
				dispose();
			}

			
		});
		contentPane.add(btnNewButton);
	}
	
	public void setNickNameJoueur(String text) {
		this.NickNameJoueur = text;
	}
	public String getNickNameJoueur() {
		accessed = true;
		return this.NickNameJoueur;
	}
	
	public void setClicked(boolean b) {
		this.clicked = b;
	}
	public boolean getClicked() {
		return this.clicked;
	}

}
