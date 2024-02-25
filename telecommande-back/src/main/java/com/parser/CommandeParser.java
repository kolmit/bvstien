package com.parser;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommandeParser {
	private final String SPLITTER = " ";

	public List<String> parseString(String str){
		return Arrays.stream(str.trim().split(SPLITTER)).collect(Collectors.toList());
	}
}