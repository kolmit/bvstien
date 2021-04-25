package com.model;

import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Position {
	@JsonProperty("xPosition")
	private Integer xPosition;

	@JsonProperty("yPosition")
	private Integer yPosition;

	public Integer getxPosition() {
		return xPosition;
	}

	public void setxPosition(Integer xPosition) {
		this.xPosition = xPosition;
	}

	public Integer getyPosition() {
		return yPosition;
	}

	public void setyPosition(Integer yPosition) {
		this.yPosition = yPosition;
	}
}
