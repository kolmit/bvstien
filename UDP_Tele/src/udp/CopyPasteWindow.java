package udp;

import java.awt.BorderLayout;
import java.awt.Button;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import java.awt.FlowLayout;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.swing.JScrollPane;
import javax.swing.JTextField;
import javax.swing.BoxLayout;
import javax.swing.JToolBar;
import javax.swing.JButton;
import java.awt.Component;
import javax.swing.JScrollBar;

public class CopyPasteWindow extends JFrame {

	private JPanel contentPane;
	private JTextField textField;
	private JTextField textField_1;
	private JTextField textField_2;
	private JTextField textField_3;
	private JTextField textField_4;
	private JTextField textField_5;
	private JTextField textField_6;
	private Button textField_7;

	/**
	 * Launch the application.
	 */
	/*public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					CopyPasteWindow frame = new CopyPasteWindow();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}*/

	/**
	 * Create the frame.
	 * @throws SQLException 
	 * @throws ClassNotFoundException 
	 */
	public CopyPasteWindow() throws ClassNotFoundException, SQLException {
		ResultSet dbResult = initDatabase();
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 450, 300);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(new BoxLayout(contentPane, BoxLayout.Y_AXIS));
		
		JPanel panel = new JPanel();
		contentPane.add(panel);
		panel.setLayout(new FlowLayout(FlowLayout.CENTER, 5, 5));
		
		JButton boutonAjouter = new JButton("Ajouter");
		panel.add(boutonAjouter);
		
		JButton boutonSupprimer = new JButton("Supprimer");
		panel.add(boutonSupprimer);
		
		JPanel panel_1 = new JPanel();
		contentPane.add(panel_1);
		panel_1.setLayout(new BoxLayout(panel_1, BoxLayout.X_AXIS));
		
		JPanel panel_2 = new JPanel();
		panel_1.add(panel_2);
		panel_2.setLayout(new BoxLayout(panel_2, BoxLayout.Y_AXIS));
		
		JScrollBar scrollBar = new JScrollBar();
		panel_1.add(scrollBar);
		
		
		while (dbResult.next()) {
            String name = dbResult.getString("string");
            System.out.println(name);
            textField_7 = new Button(name);
    		panel_2.add(textField_7);
    		// textField_7.setColumns(10);
    		textField_7.addActionListener(new ActionListener() {
				
				@Override
				public void actionPerformed(ActionEvent e) {
					System.out.println(e.getActionCommand());

					StringSelection stringSelection = new StringSelection(e.getActionCommand());
					Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
					clipboard.setContents(stringSelection, null);
				}
			});
    		
    		/*
    		textField_7.addMouseListener(new MouseListener() {
				
				@Override
				public void mouseReleased(MouseEvent e) {				
				}
				
				@Override
				public void mousePressed(MouseEvent e) {					
				}
				
				@Override
				public void mouseExited(MouseEvent e) {					
				}
				
				@Override
				public void mouseEntered(MouseEvent e) {					
				}
				
				@Override
				public void mouseClicked(MouseEvent e) {
					System.out.println(e.());
					System.out.println("FDP");					
				}
			});*/
        }
	}

	
	private ResultSet initDatabase() throws SQLException, ClassNotFoundException {
		Class.forName("com.mysql.jdbc.Driver");
		String url = "jdbc:mysql://localhost:3306/copypaste?useSSL=false";
		String user = "root";
		String pwd = "";
		Connection con = DriverManager.getConnection(url, user, pwd);
		Statement statement = con.createStatement();
        ResultSet result = statement.executeQuery("SELECT * FROM stringtocopy");
        return result;
	}

}
