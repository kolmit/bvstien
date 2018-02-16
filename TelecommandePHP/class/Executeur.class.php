<?php

class Executeur{
	private $server_ip   = '127.0.0.1';
	private $server_port = 54321;

	function execute($pcommandToExecute){

		if ($socket = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP)) {
		    socket_sendto($socket, $pcommandToExecute, strlen($pcommandToExecute), 0, $this->server_ip, $this->server_port);
		} else {
		  print("can't create socket");
		}

		socket_close( $socket );
	}


}

	$executeur = new Executeur();
	$commandToExecute = '';
	if (isset($_POST['dx'])) $commandToExecute = $_POST['cmd'] . $_POST['dx'] . ':' . $_POST['dy'];
	else $commandToExecute = str_replace("_", " ", $_POST['cmd']);

	echo 'cmd : '. $commandToExecute;
	
	$executeur->execute( $commandToExecute );

?>