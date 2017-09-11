package fr.esisar.calculatrice;

public class Diviser extends OperationBinaire/*implements Operation*/ {

	@Override
	public String getNom() {
		return "/";
	}

	@Override
	public double calculer(double[] parametres) {
		double resultat = parametres[0] / parametres[1];

		for (int i = 2 ; i < parametres.length ; i++) {
			resultat /= parametres[i];
		}
		
		return resultat;
	}

}
