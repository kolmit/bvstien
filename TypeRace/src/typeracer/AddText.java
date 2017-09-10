package typeracer;

import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;

public class AddText extends JFrame {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6017202621491481181L;
	private JPanel contentPane;
	private JTextField textField;
	private String nouveauTexte;
	private boolean accessed = false;
	private boolean validey;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					AddText frame = new AddText();
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
	public AddText() {
		setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		setBounds(100, 100, 450, 300);
		setTitle("Entrez votre texte");
		setResizable(false);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		textField = new JTextField();
		textField.setToolTipText("Ajoutez un texte :)");
		textField.setBounds(10, 11, 414, 195);
		contentPane.add(textField);
		textField.setColumns(10);
		JButton btnNewButton = new JButton("Valider");
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				setNouveauTexte(textField.getText());
				setValidey(true);
				while (!accessed){
					try {Thread.sleep(50);} 
					catch (InterruptedException e) {e.printStackTrace();}
				}
				setVisible(false);
				dispose();
			}
		});
		btnNewButton.setBounds(168, 217, 103, 33);
		contentPane.add(btnNewButton);
		setVisible(true);
	}

	protected void setValidey(boolean b) { validey = b; }
	public boolean getValidey(){ return validey; }

	protected void setNouveauTexte(String text) {nouveauTexte = text;}
	protected String getNouveauTexte() {
		accessed = true;
		return nouveauTexte;
	}
}
