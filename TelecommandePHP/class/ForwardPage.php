<?php

class ForwardPage{

	function execute(){

		$ch = curl_init('http://www.orange.fr/portail');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$data = curl_exec($ch);
		echo $data;

		$info = curl_getinfo($ch);
		print_r($info['request_header']);
	}
}

	$forward = new ForwardPage();
	$forward->execute( );

?>