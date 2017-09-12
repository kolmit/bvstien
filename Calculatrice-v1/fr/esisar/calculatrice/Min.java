package fr.esisar.calculatrice;

public class Min implements Operation {

	@Override
	public String getNom() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public double calculer(double[] parametres) throws OperationInvalide {
		if (parametres.length > 2) throw new OperationInvalide("Trop de paramètres !");
		return Math.min(parametres[0], parametres[1]);
	}
}
