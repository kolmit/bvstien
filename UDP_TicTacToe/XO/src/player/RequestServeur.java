package player;

import java.awt.Font;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;

@SuppressWarnings("serial")
public class RequestServeur extends JDialog {

	private JPanel contentPane;
	private JTextField textFieldAdresse;
	private JTextField textFieldPort;
	private JButton buttonValid;


	/**
	 * Create the frame.
	 */
	public RequestServeur() {
		setDefaultCloseOperation(JDialog.DISPOSE_ON_CLOSE);
		setBounds(100, 100, 400, 171);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		textFieldAdresse = new JTextField();
		textFieldAdresse.setBounds(11, 33, 252, 48);
		contentPane.add(textFieldAdresse);
		textFieldAdresse.setColumns(10);
		textFieldAdresse.setText("192.168.1.10");
		
		textFieldPort = new JTextField();
		textFieldPort.setColumns(10);
		textFieldPort.setBounds(283, 33, 86, 48);
		textFieldPort.setText("5555");

		contentPane.add(textFieldPort);
		
		JLabel lblAdresseIpServeur = new JLabel("Adresse IP Serveur");
		lblAdresseIpServeur.setFont(new Font("Arial", Font.BOLD, 13));
		lblAdresseIpServeur.setBounds(10, 11, 138, 18);
		contentPane.add(lblAdresseIpServeur);
		
		JLabel label = new JLabel(":");
		label.setFont(new Font("Arial", Font.BOLD, 13));
		label.setBounds(270, 41, 11, 31);
		contentPane.add(label);
		
		JLabel lblPort = new JLabel("Port");
		lblPort.setFont(new Font("Arial", Font.BOLD, 13));
		lblPort.setBounds(283, 14, 46, 14);
		contentPane.add(lblPort);
		
		buttonValid = new JButton("Valider");
		
		buttonValid.setBounds(111, 92, 170, 29);
		contentPane.add(buttonValid);
		setVisible(true);
	}
	
	public JButton getbuttonValid() {return buttonValid;}
	public void setbuttonValid(JButton buttonValid) {this.buttonValid = buttonValid;}

	public JTextField getTextFieldAdresse() {return textFieldAdresse;}
	public void setTextFieldAdresse(JTextField textFieldAdresse) {this.textFieldAdresse = textFieldAdresse;}
	
	public JTextField getTextFieldPort() {return textFieldPort;}
	public void setTextFieldPort(JTextField textFieldPort) {this.textFieldPort = textFieldPort;}

}
