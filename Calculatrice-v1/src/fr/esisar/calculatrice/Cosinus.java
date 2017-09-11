package fr.esisar.calculatrice;

public class Cosinus implements Operation {

	@Override
	public String getNom() {
		return "cos";
	}

	@Override
	public double calculer(double[] parametres) throws OperationInvalide {
		if (parametres.length > 1) throw new OperationInvalide("Cosinus avec plusieurs arguments !");
		return Math.cos(parametres[0]);
	}

}
