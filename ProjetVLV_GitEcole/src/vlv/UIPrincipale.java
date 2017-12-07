package vlv;
import java.sql.SQLException;
import java.util.InputMismatchException;
import java.util.Scanner;

public class UIPrincipale {
	private static Scanner scannerRole = new Scanner(System.in);
	
	/**
	 * Point d'entrée de l'application
	 */
	public static void main (String[] args) {
		UIPrincipale.choixActeur();
	}
	

	/**
	 * Fonction permettant d'afficher le menu principal de l'application 
	 * et de se connecter selon son rôle.
	 */
	private static void choixActeur() {
		while (true) {
			try {
				afficherMenuPrincipale();
				traitementChoixMenuPrincipal();
			}
			catch (InputMismatchException e) {
				System.err.println("Vous avez un choix incorrect");
				choixActeur();
			}
		}
	}
	

	/**
	 * Fonction d'affichage du menu principal
	 */
	private static void afficherMenuPrincipale() {
	    nouvelleFenetre();
		System.out.println("=====================");
		System.out.println("Vous êtes :");
		System.out.println("1. Administrateur");
		System.out.println("2. Responsable");
		System.out.println("3. Moniteur");
		System.out.println("4. Initialiser la BDD");
		System.out.println("=====================");		
	}
	
	
	/**
	 * Fonction de traitement du choix fait par l'utilisateur.
	 * En fonction du choix, une UI est appelée.
	 */
	private static void traitementChoixMenuPrincipal() {
		switch (scannerRole.nextInt()) {
		case 1:
			Administrateur.UIAdministrateur();
			break;
		case 2: 
			Responsable.LoginResponsable();
			break;
		case 3:
			Moniteur.LoginMoniteur();
			break;
		case 4:
			try {
				ConnexionDB.getConnection();
				new Thread(new Runnable() {
					@Override
					public void run() {
						ConnexionDB.initialiserDB();						
					}
				}).start();
			} catch (SQLException e) {
				System.err.println("Problème avec la BDD");
				e.printStackTrace();
			}
			break;
		default:
			System.err.println("Veuillez selectionner un rôle valide.\n");
			break;
		}
	}
	
	/***************************************************************************
     *                  Methode de rafraichissement des pages
     ***************************************************************************/
	public static void nouvelleFenetre(){
        try{
            //System.out.print("\033[H\033[2J");
            System.out.flush();
        }catch(Exception e){
            System.out.println("Erreur dans le clear console");
        }
    }
}