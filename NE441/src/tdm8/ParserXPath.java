package tdm8;

import java.io.IOException;
import javax.xml.parsers.*;
import javax.xml.xpath.*;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class ParserXPath {
	private String URItoParse;

	public ParserXPath() {}
	public ParserXPath(String uri) {this.URItoParse = uri; }

	
	public void execute(String pathToBalise) throws ParserConfigurationException, SAXException, IOException, XPathExpressionException {
		/*
		 * Initialisation
		 */
		DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
		domFactory.setNamespaceAware(true);
		DocumentBuilder builder = domFactory.newDocumentBuilder();
		Document doc = builder.parse(URItoParse);
		XPath xpath = XPathFactory.newInstance().newXPath();
		
		
		XPathExpression expr = xpath.compile(pathToBalise);
		Object result = expr.evaluate(doc, XPathConstants.NODESET);
		NodeList nodes = (NodeList) result;
		
		for (int i = 0; i < nodes.getLength(); i++) {
			System.out.println(nodes.item(i).getNodeValue());
		}
	}

}