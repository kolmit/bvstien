package typeracer;

import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.Rectangle;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.StringReader;
import java.util.HashMap;
import java.util.Random;

import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JFormattedTextField;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTable;
import javax.swing.JTextPane;
import javax.swing.border.EmptyBorder;
import javax.swing.border.LineBorder;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;


public class Windo extends JFrame {
	
	private static final long serialVersionUID = 1L;
	private static String texteAEcrire;
	private static String[] arrayAEcrire;
	  
	private static int nombreDeCaracteres;
	private static boolean started = false;
	private static boolean otherSentenceRequested = false;
	
	private static boolean regexDejaTrouve = false;
	
	private static HashMap<String, JTable> tabMap;
	private JPanel contentPane;
	private static Box verticalBox_2;
	private JFormattedTextField textField;
	private JTextPane textArea;
	private JLabel labelCountDown;
	private JLabel labelScore;
	private boolean countingDown = false;
	
	public static String pathExec = System.getProperty("user.dir");
	private final static String textInitial = "On ne manie pas la poix sans se poisser.Besace bien promenée nourrit son maître.En close bouche n'entre mouche.L'homme est son plus grand ennemi.Homme fin, se lève matin.Qui donne tôt, donne deux fois.";


	/**
	 * Launch the application.
	 */
	public static void main(String[] args) throws FileNotFoundException, IOException {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {

					Windo frame = new Windo();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	  	
	  
	}


	private static void parseText(String textToAdd) throws FileNotFoundException, IOException {
		System.out.println(pathExec+"\\text");
		

		if (textToAdd != textInitial ){
			tabMap.clear();
		}
		try(BufferedReader br = new BufferedReader(new StringReader(textToAdd))) {
			  int ch;			  
			  StringBuilder sb = new StringBuilder();
			  
			  while ((ch = br.read()) >= 0) {
			     if (ch == '.') {
			    	 int indexEspace = 0;
			    	 while (sb.toString().charAt(indexEspace) == ' ' ){
			    		 indexEspace++;
			    	 }
			    	 	tabMap.put(sb.toString().substring(indexEspace)+".", createTableHighscore());
				        sb.setLength(0);
			     } 
			     else {
			         sb.append((char)ch);
			     }
			  } 
		}
		
		
		texteAEcrire = getPhrase(); 
		arrayAEcrire = texteAEcrire.split(" ");
	}
	
	
	public static JTable createTableHighscore(){
		JTable t = new JTable();
		DefaultTableCellRenderer centerRenderer = new DefaultTableCellRenderer();
		centerRenderer.setHorizontalAlignment( JLabel.CENTER );
		t.setBounds(new Rectangle(2, 2, 2, 2));
		t.setBorder(new LineBorder(new Color(0, 0, 0), 2, true));
		t.setModel(new DefaultTableModel(
				new Object[][] {
					{null, null},
					{null, null},
					{null, null},
					{null, null},
					{null, null},
					{null, null},
				},
				new String[] {
					"Nom", "Score"
				}
			) {
				/**
				 * 
				 */
				private static final long serialVersionUID = -570420774980096886L;
				@SuppressWarnings("rawtypes")
				Class[] columnTypes = new Class[] {
					String.class, Integer.class
				};
				@SuppressWarnings({ "rawtypes", "unchecked" })
				public Class getColumnClass(int columnIndex) {
					return columnTypes[columnIndex];
				}
			});
		return t;
	}
	  
		
		public static String getPhrase(){
			Object[] randomAccess = tabMap.keySet().toArray();
			return (String) randomAccess[new Random().nextInt(randomAccess.length)];
		}


		private void initWindow() {
			setBounds(100, 100, 628, 453);
			setTitle("TypeRacer");
			setResizable(false);
			contentPane = new JPanel();
			contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
			setContentPane(contentPane);
			contentPane.setLayout(new BoxLayout(contentPane, BoxLayout.X_AXIS));
			
			verticalBox_2 = Box.createVerticalBox();
			verticalBox_2.setBorder(new EmptyBorder(0, 20, 0, 20));
			contentPane.add(verticalBox_2);
			
			JLabel labelHighscores = new JLabel("HIGHSCORES");
			labelHighscores.setFont(new Font("Verdana", Font.BOLD, 14));
			labelHighscores.setAlignmentX(Component.CENTER_ALIGNMENT);
			verticalBox_2.add(labelHighscores);
			verticalBox_2.add(tabMap.get(texteAEcrire));

			
			Component verticalStrut = Box.createVerticalStrut(250);
			verticalBox_2.add(verticalStrut);
			
			Box verticalBox = Box.createVerticalBox();
			verticalBox.setBorder(new EmptyBorder(10, 10, 10, 10));
			contentPane.add(verticalBox);
			
			Box horizontalBox_2 = Box.createHorizontalBox();
			verticalBox.add(horizontalBox_2);
			
			textArea = new JTextPane();
			textArea.setBounds(new Rectangle(20, 20, 20, 20));
			textArea.setBorder(new LineBorder(new Color(0, 0, 0), 2, true));
			
			textArea.setPreferredSize(new Dimension(350, 300));
			textArea.setEditable(false);
			textArea.setText(texteAEcrire);
			textArea.setFont(new Font("Arial", Font.BOLD, 17));
			horizontalBox_2.add(textArea);
			
			Box horizontalBox = Box.createHorizontalBox();
			verticalBox.add(horizontalBox);
			
			Component rigidArea_3 = Box.createRigidArea(new Dimension(20, 100));
			horizontalBox.add(rigidArea_3);
			
			Box verticalBox_1 = Box.createVerticalBox();
			horizontalBox.add(verticalBox_1);
			
			Component verticalGlue = Box.createVerticalGlue();
			verticalGlue.setBackground(new Color(107, 142, 35));
			verticalBox_1.add(verticalGlue);
			
			Component rigidArea_2 = Box.createRigidArea(new Dimension(100, 20));
			rigidArea_2.setPreferredSize(new Dimension(100, 10));
			verticalBox_1.add(rigidArea_2);
			
			textField = new JFormattedTextField();
			textField.setFont(new Font("Arial", Font.BOLD, 15));
			textField.setPreferredSize(new Dimension(60, 20));
			verticalBox_1.add(textField);
			textField.setColumns(60);
			
			labelCountDown = new JLabel("");
			labelCountDown.setFont(new Font("Arial", Font.BOLD, 14));
			labelCountDown.setAlignmentX(Component.CENTER_ALIGNMENT);
			verticalBox_1.add(labelCountDown);
			
			labelScore = new JLabel("");
			labelScore.setForeground(new Color(255, 0, 0));
			labelScore.setFont(new Font("Arial", Font.BOLD, 17));
			labelScore.setAlignmentX(0.5f);
			verticalBox_1.add(labelScore);
			
			Component rigidArea_1 = Box.createRigidArea(new Dimension(100, 20));
			rigidArea_1.setPreferredSize(new Dimension(100, 10));
			verticalBox_1.add(rigidArea_1);
			
			Component rigidArea = Box.createRigidArea(new Dimension(20, 100));
			horizontalBox.add(rigidArea);
			
			
			Box barreBouton = Box.createHorizontalBox();
			verticalBox.add(barreBouton);
			JButton buttonAutrePhrase = new JButton("Autre Phrase");
			JButton buttonCommencer = new JButton("Commencer");
			JButton buttonModifTexte = new JButton("Changer Texte");
			

			buttonModifTexte.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
				(new Thread() {
				    public void run() {
						if (e.getSource() == buttonModifTexte){ 
							AddText at = new AddText();
							while (!at.getValidey()){
								try {Thread.sleep(100);} 
								catch (InterruptedException e1) {e1.printStackTrace();}
							}
								try {
									parseText( at.getNouveauTexte() );
								} catch (IOException e1) { e1.printStackTrace();	}
						}
				    }
				}).start();
				}
			});
			
			buttonCommencer.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					if (e.getSource() == buttonCommencer){ 
						if (getCountingDown()){
							setCountingDown(false);
							try {Thread.sleep(1000);} 
							catch (InterruptedException e1) {e1.printStackTrace();}
						}
						start(); 
					}
					
				}
			});
			
			buttonAutrePhrase.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					if (e.getSource() == buttonAutrePhrase){
						if (getCountingDown()){
							setCountingDown(false);
							try {Thread.sleep(1000);} 
							catch (InterruptedException e1) {e1.printStackTrace();}
						}
			    		try { autrePhrase(); }
			    		catch (IOException | InterruptedException e1) { e1.printStackTrace(); }
			    	}
				}
			});
			barreBouton.add(buttonCommencer);
			barreBouton.add(buttonAutrePhrase);	
			barreBouton.add(buttonModifTexte);
		}

	/**
	 * Create the frame.
	 */
	public Windo() throws FileNotFoundException, IOException {
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		tabMap = new HashMap<>();

		parseText(textInitial);
		initWindow();
	}
	
	/** ============ Bouton Commencer ============ **/
	private void start() {
		(new Thread() {
		    public void run() {
	    	    	setCountingDown(true);

		    		textField.setEditable(false);
		    		labelScore.setText("");
		        	for (int i = 3 ; i > 0 ; i--){
		        		if ( !getCountingDown() ) {
		        			labelCountDown.setText("");
		        			return;
		        		}
			    		labelCountDown.setText("Préparez-vous : "+i);
			    		try {Thread.sleep(1000);} 
			    		catch (InterruptedException e1) {e1.printStackTrace();}			
		        	}
		        	
	        		setCountingDown(false);
	        		setStarted(true);
		    	    textField.setEditable(true);
		    	    textField.requestFocusInWindow();
		        	
		        	try {execute();}
		        	catch (InterruptedException e) { e.printStackTrace(); }
		    }
		}).start();			
	}
	

	/** ============ Bouton Autre Phrase ============ **/
	private void autrePhrase() throws FileNotFoundException, IOException, InterruptedException {
		contentPane.removeAll();
		
		setOtherSentence(true);
	   	setStarted(false);
	   	labelCountDown.setText("");
	   	labelScore.setText("");
	  	texteAEcrire = getPhrase(); 
	  	arrayAEcrire = texteAEcrire.split(" ");
	  	textArea.setText(texteAEcrire);
	  	Thread.sleep(10);
		setOtherSentence(false);
		initWindow();

	}


	public void execute() throws InterruptedException {
		  testIfCorrect(arrayAEcrire);
	}
	

	  public void testIfCorrect(String[] mots) throws InterruptedException{
	    	int compteurMot = 0;
    		float timeCounted = 0;
	    	String regexDebutMot = new String();
	    	resetnombreDeCaracteres(0);
	    	boolean lastWord = false;
	    	long chronoStart = java.lang.System.currentTimeMillis();
	    			
		    while (compteurMot < mots.length){
		    	/* On ne calcule une nouvelle regex que si on vient de trouver un mot */
		    	if (!getRegex()){
		    		regexDebutMot = getDebutMot(mots[compteurMot]);
		    		setnombreDeCaracteres( mots[compteurMot].length() + 1 ); /* On rajoute 1 pour l'espace entre les mots*/
		    	}
		    	
		    	Thread.sleep(5);
		    	labelScore.setText ( "" + (float)(java.lang.System.currentTimeMillis() - chronoStart) / 1000 );
		    	if (getOtherSentence() || getCountingDown()) return;
		    	if (getStarted()){labelCountDown.setText(mots[compteurMot]);}
		    	
		    	/* Si le mot est incorrect */
		    	if (!textField.getText().matches(regexDebutMot)) textField.setBackground(Color.red);
		    	if (textField.getText().matches(regexDebutMot)) textField.setBackground(Color.white);
		    	
		    	
		    	/* Si le mot est correct */
		    	if (compteurMot == mots.length-1){
	    			mots[compteurMot].substring(0, mots[compteurMot].length() - 1 );
	    			lastWord = true;
	    		}
		    	if (textField.getText().matches( mots[compteurMot] + " " ) || (lastWord && textField.getText().matches( mots[compteurMot] )) ){
	    			setRegex(false);
	    			textField.setBackground(Color.white);
			    	System.out.println("compteurMot"+compteurMot+" - "+textField.getText()+" - "+mots[compteurMot]);
	    			compteurMot++;
	    			textField.setText("");
	    			
	    			if (lastWord) {
	    	    		timeCounted = (java.lang.System.currentTimeMillis() - chronoStart) / 1000;
	    			   	setStarted(false);
	    				labelCountDown.setText("Félicitations !");
	    				setScore(timeCounted);
	    				return;
		    		}
		    	}
		    }
	  }
	  
	private void setScore(float timeCounted) {
		Nickname n = new Nickname();
		n.setVisible(true);
		n.toFront();
		JTable tableauScore = tabMap.get(texteAEcrire);
		for (String s : tabMap.keySet()){
			if ( s.equals(texteAEcrire) ){
				System.out.println("Trouvéééééééééééé: "+s);
			}
		}
		

		while (!n.getClicked()){
			try { Thread.sleep(20); } 
			catch (InterruptedException e) { e.printStackTrace(); }
			/* On attend que le joueur entre son nom */
		}
		
		String nomJoueur = new String();
		nomJoueur = n.getNickNameJoueur();
		
		
		for (int i = 0 ; i < tableauScore.getRowCount() ; i++){
			if (tableauScore.getValueAt(i, 0) == null && tableauScore.getValueAt(i, 1) == null){
				System.out.println("next");
				tableauScore.setValueAt(nomJoueur, i, 0);		
				tableauScore.setValueAt(timeCounted, i, 1);	
				break;
			}
		}
			
		return;
	}





	private static String getDebutMot(String string) {
		  
		  String debutMot = new String();
		  for (int c = 0 ; c < string.length()+1 ; c++){
			  debutMot = debutMot + string.substring(0,c) + "|";
		  }
		  setRegex(true);
		  return debutMot.substring(0, debutMot.length()-1);
	}

	  private static boolean getRegex() {return regexDejaTrouve;}
	  public static void setRegex (boolean b){ regexDejaTrouve = b;}
	  
	  private static boolean getStarted() {return started;}
	  public static void setStarted (boolean b){ started = b;}
	  
	  public static void setOtherSentence (boolean b){ otherSentenceRequested = b; }  
	  public static boolean getOtherSentence (){ return otherSentenceRequested;}
	  
	  public static int getnombreDeCaracteres() {return nombreDeCaracteres;}
	  public static void resetnombreDeCaracteres(int nb) {nombreDeCaracteres = 0;}
	  public static void setnombreDeCaracteres(int nb) {nombreDeCaracteres += nb;}
	  
	  private void setCountingDown(boolean b) { countingDown  = b; }
	  private boolean getCountingDown(){ return countingDown; }

}
