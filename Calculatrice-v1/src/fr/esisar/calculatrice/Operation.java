package fr.esisar.calculatrice;

public interface Operation {
	
	public String getNom();
	public double calculer(double[] parametres) throws OperationInvalide;
	
}
