package fr.esisar.calculatrice;

public class Max implements Operation {

	@Override
	public String getNom() {
		return "max";
	}

	@Override
	public double calculer(double[] parametres) throws OperationInvalide {
		if (parametres.length > 2) throw new OperationInvalide("Trop de paramètres !");
		return Math.max(parametres[0], parametres[1]);
	}
}