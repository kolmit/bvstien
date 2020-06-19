package com.parser;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Service;

import com.model.Commande;

@Service
public class CommandeParser {
	ArrayList<String> authorizedCmd = new ArrayList<String>();
	/*final List<String> LISTE_COMMANDES = List.of(
			"shutdown"
			);*/
	
	
	public CommandeParser(){
		//this.authorizedCmd.addAll(LISTE_COMMANDES);
	}

	
	public String[] parse(Commande c){
		
		String[] radicalParsed = parseCmd(c.getRadical());
		String[] argumentsParsed = parseCmd(c.getArguments());
		
		Collection<String> collection = new ArrayList<String>();
		collection.addAll(Arrays.asList(radicalParsed));
		collection.addAll(Arrays.asList(argumentsParsed));

		String[] commandToExecute = collection.toArray(new String[] {});
		
		return commandToExecute;
	}

	@SuppressWarnings("unused")
	private boolean validate(String radical) {
		for (String itemRegex : authorizedCmd) {
			if (radical.matches(itemRegex)) {
				return true;
			}
		}
		return false;
	}
	
	
	protected String[] parseCmd(String mes){
		String[] msg = mes.trim().split(" ");
		
		for (int i = 0 ; i<msg.length ; i++){
			msg[i].trim();
		}
		return msg;
	}
}
