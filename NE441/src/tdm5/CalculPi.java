package tdm5;

public class CalculPi extends Thread {
	
	private int stopAt;
	private int startAt;
	private double result;

	public CalculPi(int f, int g) {
		this.startAt = f;
		this.stopAt = g;
	}
	
	public void run() {
		result = 0;
		
		for (float i = startAt ; i < stopAt ; i++) {
			if (i%2 == 0) {
				result += (1/(2*i +1));
			}
			else if (i%2 == 1){
				result -= (1/(2*i +1));
			}
		}
		System.out.println("rest " +result);

		setResult(result);
	}

	public double getResult() {
		return result;
	}

	public void setResult(double result) {
		this.result = result;
	}
}
