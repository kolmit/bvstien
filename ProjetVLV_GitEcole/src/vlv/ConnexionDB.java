package vlv;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.*;

public class ConnexionDB {
	private final static String usernameOracle = "SYSTEM";
	private final static String passwordOracle = "root";

	private static Connection con;
	
	private ConnexionDB () throws SQLException {
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			String url = "jdbc:oracle:thin:@//127.0.0.1:1521/xe";
			con =  (Connection) DriverManager.getConnection(url, usernameOracle, passwordOracle);
			
		} catch (ClassNotFoundException e) {
			System.out.println("Erreur de connexion: "+e.getMessage()+" | "+e.toString());
		}	
	}
	
	public static Connection getConnection () throws SQLException {
		if (con == null) {
			new ConnexionDB();
			System.out.println("Connecté à la base de donnée");
		}
		return con;
	}
	
	
	public static void closeConnection () throws SQLException {
		try {
			con.close();
			System.out.println("Connexion terminée");
			con = null;
		}
		catch (SQLException e) {
			e.printStackTrace();
			System.out.println("Erreur de fermeture: "+e.getMessage()+" | "+e.toString());
		}
	}
	
	
	static void initialiserDB() {
		
	    try {      	       
	    	/*
	    	 * La commande à taper dans cmd :
	    	 * sqlplus SYSTEM/root @C:\Users\autilisateur\Desktop\GitVLV_Ecole\CS440_13\ProjetVLV_GitEcole\ressources\VLV_BDD_Final.sql
	    	 */
	    	ProcessBuilder processBuilder = new ProcessBuilder("sqlplus", usernameOracle + "/" + passwordOracle, "@" + "C:\\Users\\utilisateur\\Desktop\\GitVLV_Ecole\\CS440_13\\ProjetVLV_GitEcole\\ressources\\BDD_Soutenance.sql");

            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();
            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String currentLine = null;
            while ((currentLine = in.readLine()) != null) {
                System.out.println(" "  + currentLine);
            }
            
            System.out.println("La DB a été initialisée.");
	        
	    } catch (IOException e) {
	        e.printStackTrace();
	    }catch(Exception ex){
	        ex.printStackTrace();
	    }		
	}
	
	static void executerEtAfficherSelect(Connection con, String requeteSQL) {
		try {
			PreparedStatement selectListe = con.prepareStatement(requeteSQL);
			ResultSet resultatSelect = selectListe.executeQuery();		
			ResultSetMetaData metaDonnees = resultatSelect.getMetaData();
	
			
			/* Boucle for pour afficher le nom des attributs */
			for (int i = 1 ; i <= metaDonnees.getColumnCount() ; i++) {
				System.out.print(metaDonnees.getColumnName(i) + " | " );
			}
			System.out.println("");
			if (metaDonnees.getColumnCount() == 0) System.out.println("Il n'y a rien à afficher.");

			
			while (resultatSelect.next()) {
					
				/* Boucle for pour afficher les tuples */
			    for (int i = 1; i <= metaDonnees.getColumnCount(); i++) {
			        if (i > 1) System.out.print(" | ");
			        String columnValue = resultatSelect.getString(i);
			        System.out.print(columnValue);
			    }
			    System.out.println("");
			    
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
}
