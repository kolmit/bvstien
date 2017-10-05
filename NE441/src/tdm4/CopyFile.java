package tdm4;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class CopyFile {
	
	
	public static void main (String[] args) throws IOException {
		new CopyFile().execute(args);
		
	}

	private void execute(String[] arguments) throws IOException {
		String copiedFile = arguments[0];
		String destFile = arguments[1];
		
		InputStream is = null;
	    OutputStream os = null;
	    try {
	        is = new FileInputStream(copiedFile);
	        os = new FileOutputStream(destFile);
	        byte[] buffer = new byte[1024];
	        int length;
	        
	        /* Tant que le fichier n'est pas terminé d'être lu [= que read renvoit -1] */
	        while ((length = is.read(buffer)) > 0) {
	            os.write(buffer, 0, length);
	        }
	    } 
	    finally {
	        is.close();
	        os.close();
	    }
	}
}
