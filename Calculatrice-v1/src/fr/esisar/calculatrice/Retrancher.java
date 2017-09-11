package fr.esisar.calculatrice;

public class Retrancher extends OperationBinaire/*implements Operation*/ {

	@Override
	public String getNom() {
		return "-";
	}

	@Override
	public double calculer(double[] parametres) {
		double resultat = 0;
		
		for (double operande : parametres) {
			resultat -= operande;
		}
		
		return resultat;
	}

}
