package tdm4;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class FileTransfert {
	
	
	public static void main (String[] args ) throws IOException {
		new FileTransfert().execute();
	}
	

	private void execute() throws IOException {
		ServerSocket socketListen = new ServerSocket(54321);
		Socket socketConnexion = socketListen.accept();
		System.out.println("Client : "+socketConnexion.getInetAddress().getHostAddress()+":"+socketConnexion.getPort());
		StringBuffer buf = new StringBuffer();
		byte[] readBuffer = new byte[2048];
		int nbLu = 0;
		
		while ( (nbLu = socketConnexion.getInputStream().read(readBuffer)) > -1) {
			if (nbLu > -1) {
				buf.append(new String(readBuffer, 0, nbLu));
			}
		}
		
		
		System.out.println(buf.toString());
		OutputStream os = socketConnexion.getOutputStream();
		//os.write(new File(buf.toString().getBytes()));
	}
}
