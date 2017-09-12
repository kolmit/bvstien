package xopackage2;

import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Fenetre extends JFrame {

	private JPanel contentPane;
	private JButton[] tabButton;
    
    private int nbColonne;
    private int nbLigne;
	private int lastX;
	private int lastY;
	private final int widthFrame = 400;
	private final int heightFrame = 400;
	private boolean cestMonTour;
	

	


	/**
	 * Create the frame.
	 */
	public Fenetre(String nbColLin, int portClient) {
		int IntNbColLin = Integer.parseInt(nbColLin);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, widthFrame, heightFrame);
		contentPane = new JPanel();
		
	    GridLayout grille = new GridLayout(IntNbColLin,IntNbColLin);
		setContentPane(contentPane);
		contentPane.setLayout(grille);
		setNbLigne(IntNbColLin);
		setNbColonne(IntNbColLin);
		grille.setHgap(1);
		grille.setVgap(1);
	    int tailleGrille = nbColonne*nbLigne;
	    
		tabButton = new JButton[tailleGrille];
	    setTitle("XO "+portClient);
	    setLocationRelativeTo(null);               
	    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	    

	    for (int i = 0; i < (tailleGrille)  ; i++){
	    	tabButton[i] = new JButton();
	    	contentPane.add(tabButton[i]);
	    	tabButton[i].addActionListener(new ActionListener() {


				public void actionPerformed(ActionEvent arg) {
	    			if (!getTour())
	    				return; 
	    			
	    			ImageIcon image = new ImageIcon(Joueur.pathExec + "\\img\\" +Joueur.mapSymboleJoueur.get(portClient));
	    			
	    			for (int i = 0 ; i < tabButton.length ; i++){
	    				if (arg.getSource() == tabButton[i]){
	    					tabButton[i].setIcon(
	    							new ImageIcon(
	    									image.getImage().getScaledInstance(heightFrame/IntNbColLin, widthFrame/IntNbColLin, 100)));
	    					tabButton[i].setDisabledIcon(new ImageIcon (image.getImage().getScaledInstance(heightFrame/IntNbColLin, widthFrame/IntNbColLin, 100)));
	    					tabButton[i].setEnabled(false);
	    					
	    					setLastButton(i);
	    					setTour(false);
		    				
		    				
		    				
		    				return;
	    				}
	    			}
	    		}				
			});	    
	    	}
	
	    this.setVisible(true);	
	}
	

	/** 
	 * ****************** Fenetre ********************
	**/
	
	
	
	
	public void marquerActionAutreJoueur(String coord, int portClient, String symboleAutreJoueur){
		int x = Integer.parseInt(coord.substring(0, coord.indexOf(":")));
		int y = Integer.parseInt(coord.substring(coord.indexOf(":") + 1, coord.length()));
		int i = (y-1)*getNbColonne() + (x-1);
				
		
		ImageIcon image = new ImageIcon(Joueur.pathExec + "\\img\\" +symboleAutreJoueur);
		
		this.tabButton[i].setIcon(
				new ImageIcon(
						new ImageIcon(Joueur.pathExec + "\\img\\" +symboleAutreJoueur).getImage().getScaledInstance(this.getHeight()/this.getNbLigne(), this.getWidth()/this.getNbColonne(), 100)));
		
		tabButton[i].setDisabledIcon(new ImageIcon (image.getImage().getScaledInstance(this.getHeight()/this.getNbLigne(), this.getWidth()/this.getNbColonne(), 100)));
		tabButton[i].setEnabled(false);
	}
	




	public boolean getTour() {
		return cestMonTour;
	}
	public void setTour(boolean b) {
		cestMonTour = b;
	}

	/* ***********************/

	
	
	public int getNbColonne() {return nbColonne;}
	public int getNbLigne() {return nbLigne;}
	public void setNbColonne(int nbColonne) {this.nbColonne = nbColonne;}
	public void setNbLigne(int nbLigne) {this.nbLigne = nbLigne;}
	private void setLastButton(int i) {
		this.lastX = (i%getNbColonne()+1);
		this.lastY = (i/getNbColonne())+1;
	}
	public String getLastButton(){return new String(this.lastX+":"+this.lastY); }

}
