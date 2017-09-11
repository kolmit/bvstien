package fr.esisar.calculatrice;

public class Multiplier extends OperationBinaire/*implements Operation*/ {

	@Override
	public String getNom() {
		return "*";
	}

	@Override
	public double calculer(double[] parametres) {
		double resultat = 1;
		
		for (double operande : parametres) {
			resultat *= operande;
		}
		
		return resultat;
	}

}
