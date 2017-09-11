package fr.esisar.calculatrice;

public class Sinus implements Operation {

	@Override
	public String getNom() {
		return "sin";
	}

	@Override
	public double calculer(double[] parametres) throws OperationInvalide {
		if (parametres.length > 1) throw new OperationInvalide("Sinus avec plusieurs arguments !");
		return Math.sin(parametres[0]);
	}

}
