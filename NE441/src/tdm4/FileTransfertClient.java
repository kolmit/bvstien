package tdm4;

import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;
import java.net.UnknownHostException;

public class FileTransfertClient {
	
	
	public static void main (String[] args) throws UnknownHostException, IOException {
		new FileTransfertClient().execute();
	}

	private void execute() throws UnknownHostException, IOException {
		Socket socketClient = new Socket("127.0.0.1", 54321);
		
		OutputStream os = socketClient.getOutputStream();
		os.write("/home/userir/cursor/cursor.gif".getBytes());
		System.out.println("On écrit !");
		os.close();
		
	}
	
	
}
