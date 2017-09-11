package fr.esisar.calculatrice;

public abstract class OperationBinaire implements Operation {

	@Override
	public String getNom() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public double calculer(double[] parametres) throws OperationInvalide {
		if (parametres.length < 2) throw new OperationInvalide("Il n'y a qu'un seul paramètre !");
		return 0;
	}

}
