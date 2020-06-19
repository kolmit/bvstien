package com.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Commande {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@JsonProperty("radical")
    private String radical;
	@JsonProperty("arguments")
    private String arguments;
	
	public static final String CHROME = "\"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome\"";

    
    public Commande(String radical, String arguments) {
    	this.radical = radical;
    	this.arguments = arguments;
    }
    public Commande() {
    }
    

    public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getArguments() {
		return arguments;
	}
	public void setArguments(String nomCmdArguments) {
		this.arguments = nomCmdArguments;
	}
	public String getRadical() {
		return radical;
	}
	public void setRadical(String radical) {
		this.radical = radical;
	}
}