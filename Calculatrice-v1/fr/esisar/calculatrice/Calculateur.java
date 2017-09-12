package fr.esisar.calculatrice;

import java.util.ArrayList;

public class Calculateur {
	
	public static void main (String args[]) throws OperationInvalide {

		/**
		 * Exercice 1 & 2
		 * 
		c.ajouter(1, 2);
		c.soustraire(2, 2);
		c.multiplier(2, 5);
		try {c.diviser(3, 0);}
		catch (OperationInvalide opInv) { opInv.printStackTrace(); }
		*/
		
		
		ArrayList<Operation> tableauStatique = new ArrayList<>();
		tableauStatique.add(new Ajouter());
		tableauStatique.add(new Multiplier());
		tableauStatique.add(new Diviser());
		tableauStatique.add(new Ajouter());
		tableauStatique.add(new Diviser());
		tableauStatique.add(new Ajouter());
		
		
		Calculatrice c = new Calculatrice(tableauStatique);
		double[] parametres = {20, 2, 5};
		System.out.println( "Soustraction = " + c.calculer("-", parametres) );
		System.out.println( "Addition = " + c.calculer("+", parametres) );
		System.out.println( "Multiplication = " + c.calculer("*", parametres) );
		System.out.println( "Division = " + c.calculer("/", parametres) );
		
		double[] parametresUnaire = {20};
		System.out.println( "Cos("+parametresUnaire[0] +") = " + c.calculer("cos", parametresUnaire) );
		System.out.println( "Sin("+parametresUnaire[0] +") = " + c.calculer("sin", parametresUnaire) );
		
		double[] parametresMinMax = {12, 15};
		System.out.println( "Min(" + parametresMinMax[0] +","+ parametresMinMax[1] +") = " + c.calculer("min", parametresMinMax) );
		System.out.println( "Max(" + parametresMinMax[0] +","+ parametresMinMax[1] +") = " + c.calculer("max", parametresMinMax) );
		

	}
}
