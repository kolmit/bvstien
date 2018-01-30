<?php

class Executeur{


	function execute($pcommandToExecute){
		$server_ip   = '127.0.0.1';
		$server_port = 54321;
		//$message     = 'pc off 6000';

		if ($socket = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP)) {
		    socket_sendto($socket, $pcommandToExecute, strlen($pcommandToExecute), 0, $server_ip, $server_port);
		} else {
		  print("can't create socket");
		}


		//echo 'OK';
	}


}

	$executeur = new Executeur();
	$commandToExecute = '';
	
	//if (!$_POST['cmd'].preg_match('#\s\Syoutube\s\S#', $_POST['cmd']))
	//	$commandToExecute = str_replace("_", " ", $_POST['cmd']);
	$commandToExecute = $_POST['cmd'];
	echo 'cmd : '. $commandToExecute;
	
	$executeur->execute( $commandToExecute );

?>