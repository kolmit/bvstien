package udp;

public class State {
	private boolean isYoutube;
	private boolean isText;
	private boolean isOff;
	private boolean isFullScreen;
	private boolean isExpanded;
	private boolean ratLaunched;
	
	public State() {
		isYoutube = false;
		isText = false;
		isOff = false;
		isFullScreen = false;
		isExpanded = false;
	}


	public boolean getYoutube() {
		return isYoutube;
	}
	public boolean getEcranOff() {
		return isOff;
	}	
	public boolean getText() {
		return isText;
	}
	public boolean getFullScreen() {
		return isFullScreen;
	}
	public boolean getExpanded() {
		return isExpanded;
	}
	public boolean getRatLaunched() {
		return ratLaunched;
	}
	

	public void setText(boolean isText) {
		this.isText = isText;
	}
	public void setEcranOff(boolean isOff) {
		this.isOff = isOff;
	}
	public void setYoutube(boolean isYoutube) {
		this.isYoutube = isYoutube;
	}
	public void setFullScreen(boolean isFullScreen) {
		this.isFullScreen = isFullScreen;
	}
	public void setExpanded(boolean isExpanded) {
		this.isExpanded = isExpanded;
	}


	public void setRatLaunched(boolean b) {
		this.ratLaunched = b;
	}
	





}
