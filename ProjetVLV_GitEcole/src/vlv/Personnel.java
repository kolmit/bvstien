package vlv;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLDataException;
import java.sql.SQLException;
import java.util.*;

public abstract class Personnel extends Personne {

	public Personnel() {}
	public Personnel(String nom, String prenom, String mail, java.sql.Date dateDeNaissance, int tel, Adresse adressePersonne, int badge) {
		super(nom, prenom, mail, dateDeNaissance, tel, adressePersonne);
		this.badge = badge;
	}

	protected int badge;

	/**
	 * @return the badge
	 */
	protected int getBadge() {
		return badge;
	}

	/**
	 * @param badge the badge to set
	 */
	protected void setBadge(int badge) {
		this.badge = badge;
	}
	
	protected static void supprimerPersonnel(Connection con, int idPersonnel) {
		int idPersonne = 0;
		try {
			/*
			 * On doit d'abord récupérer l'ID de la Personne avant 
			 * de la supprimer dans la table Personnel.
			 */
			PreparedStatement selectIdPersonne = con.prepareStatement("SELECT idPersonne FROM Personnel WHERE idPersonnel = "+idPersonnel);
			ResultSet resultatIdPersonne = selectIdPersonne.executeQuery();

			while (resultatIdPersonne.next()) {
				idPersonne = resultatIdPersonne.getInt("idPersonne");
			}

			PreparedStatement requeteDeletePersonnel = con.prepareStatement("DELETE FROM Personnel WHERE idPersonnel = "+idPersonnel);
			requeteDeletePersonnel.executeQuery();
			System.out.println("|- Le personnel (id: "+ idPersonnel +") a été supprimé");			

		} catch (SQLException e) { 
			e.printStackTrace();
		}
		
		/*
		 * On supprime la personne correspondant au personnel.
		 */
		supprimerPersonne(con, idPersonne);

	}

	
	protected static void executerEtAfficherSelect(Connection con, String requeteSQL) {
		try {
			PreparedStatement selectListe = con.prepareStatement(requeteSQL);
			ResultSet resultatSelect = selectListe.executeQuery();		
			ResultSetMetaData metaDonnees = resultatSelect.getMetaData();
	
			
			/* Boucle for pour afficher le nom des attributs */
			for (int i = 1 ; i <= metaDonnees.getColumnCount() ; i++) {
				System.out.print(metaDonnees.getColumnName(i) + " | " );
			}
			System.out.println("");

			int compteurTuple = 0;
			while (resultatSelect.next()) {
				
				/* Boucle for pour afficher les tuples */
			    for (int i = 1; i <= metaDonnees.getColumnCount(); i++) {
			        if (i > 1) System.out.print(" | ");
			        String columnValue = resultatSelect.getString(i);
			        System.out.print(columnValue);
			    }
			    System.out.println("");
			    compteurTuple++;
			}
			if (compteurTuple == 0) throw new SQLDataException("Il n'y a aucune données");

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}