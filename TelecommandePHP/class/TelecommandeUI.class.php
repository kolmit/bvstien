<?php

class TelecommandeUI {


	static $plus = 'plus';
	static $moins = 'moins';

	private $joystickActif = false;
	function setJoystickActif($bool){ $this->joystickActif = $bool; }
	function getJoystickActif(){ return $this->joystickActif; }


	function initInterface(){
	echo'
	<!DOCTYPE html>
	<html lang=en>

	<head>
		<meta charset=utf-8>
		<link rel="stylesheet" type="text/css" href="../css/tele.css"> 


	<title>La Telecommande de Nous <3</title>
	</head>
	<body>
		<script src="jquery-3.3.1.js"></script>
		<script src="virtualjoystick.js"></script>

		<div class=container>

			<div id=remote-control>

			<h2>Main navigation</h2>

			<ul>
				<li id=home><a href="#" title=Home onclick="ChoixNbSeconde()"><span>Home</span></a></li>
			</ul>

			<h2>Select a site section</h2>

			<ul>
				<li id=buttonYoutube><a href="#" title="BoutonYoutube" onclick="ChoixVideo()"><span>YouTube</span></a></li>
				
				<li id=buttonPlus><a href="#" title="Bouton+" onclick="Volume(\'' . TelecommandeUI::$plus . '\')"><span>Volume +</span></a></li>
				<li id=buttonMoins><a href="#" title="Bouton-" onclick="Volume(\'' . TelecommandeUI::$moins . '\')"><span>Section 4</span></a></li>
				<li id=buttonJoystick><a href="#" title="Section 5" onclick="joyStick()"><span>Section 5</span></a></li>
				
				<li id=buttonLeftClick><a href="#" title="Section 3" onclick="SendClick(\'left\')" ><span>Section 6</span></a></li>
				<li id=buttonRightClick><a href="#" title="Section 7" onclick="SendClick(\'right\')"><span>Section 7</span></a></li>
				
				<li id=buttonTwitch><a href="#" title="Twitch"><span>Twitch</span></a></li>
				<li id=button9><a href="#" title="Section 9"><span>Section 9</span></a></li>
				<li id=button10><a href="#" title="Section 10"><span>Section 10</span></a></li>
				<li id=button11><a href="#" title="Section 11"><span>Section 11</span></a></li>
				<li id=button12><a href="#" title="Section 12"><span>Section 12</span></a></li>
				<span id="result">aze</span>
				<div id="screenCoords"></div>
			</ul>
			<h2>
			Photo gallery viewer
			</h2>
			<ul>
				<li id=view><a href="#" title="View full gallery"><span>View</span></a></li>
				<li id=info><a href="#" title="Info on gallery"><span>Info</span></a></li>
				<li id=help><a href="#" title=Help><span>Help</span></a></li>
				<li id=rewind><a href="#" title="Go back to beginning"><span>Rewind</span></a></li>
				<li id=back><a href="#" title=Back><span>Back</span></a></li>
				<li id=forward><a href="#" title=Forward><span>Forward</span></a></li>
				<li id=top><a href="#" title="Top of gallery"><span>Top of Gallery</span></a></li>
				<li id=bottom><a href="#" title="Bottom of gallery"><span>Bottom of Gallery</span></a></li>
				<li id=ok><a href="#" title="OK - start slideshow"><span>OK - start slideshow</span></a></li>
			</ul>
			<!--
				<div id=Joystick>

				</div>
			-->
			</div>
		</div>';

	}

	/*function changeEtatJoystick(){
		$this->setJoystickActif( !$this->getJoystickActif() );
		return $this->getJoystickActif();
	}*/

}

	$mainTelecommande = new TelecommandeUI();
	$mainTelecommande->initInterface();
?>


<script>

	/***********
	* Joystick *
	************/
	var joystickActif = false;

	function joyStick(){
		joystickActif = !joystickActif;
		
		if (!joystickActif){
			canvasbase = document.getElementById('canvas-base');
			canvasstick = document.getElementById('canvas-stick');
			canvasbase.remove();
			canvasstick.remove();
			return;
		}

		//console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");

		var joystick	= new VirtualJoystick({
			container	: document.getElementById('Joystick'),
			mouseSupport	: true,
		    stationaryBase: true,
	        baseX: 200,
	        baseY: 200,
	  		limitStickTravel: true,
	  		stickRadius: 100
		});
		joystick.addEventListener('touchStart', function(){
			console.log('down');
		})
		joystick.addEventListener('touchEnd', function(){
			console.log('up');
		})

		setInterval(function(){
			var outputEl	= document.getElementById('result');
			var dx	= 'dx='+Math.round(joystick.deltaX()*1000000/5);
			var dy =  'dy='+Math.round(joystick.deltaY()*1000000/5);
			if (joystick._pressed){
				sendToMouse(dx, dy);
			}
		}, 1/30 * 1000);
	}


	var initialX;
	var initialY;
	function sendToMouse(coordX, coordY){

		if (coordX == initialX && coordY == initialY) return; 
		else {
			initialX = coordX;
			initialY = coordY;

			$.ajax({
				url: 'Executeur.class.php',
				type: 'POST',
				data: 'cmd=mouseMove_' + '&dx=' + coordX + '&dy='  + coordY,

				error: function(msg){
					alert( "Erreur" );
				},
				success: function(data){
					console.log(data);
				}
			});
		}

	}


	function Volume(signe){
		var signePlusOuMoins = signe;

		$.ajax({
			url: 'Executeur.class.php',
			type: 'POST',
			data: 'cmd=vol '+ signe,
			

			error: function(msg){
				console.log(msg);
				},
			success: function(data){
				console.log(data);
			}
		});
	}


	function ChoixNbSeconde(){
	    var timeBeforeShutdown = prompt("Dans combien de temps ? (seconde) :","3600");

		$.ajax({
			url: 'Executeur.class.php',
			type: 'POST',
			data: 'cmd=pc_off_' + timeBeforeShutdown,

			error: function(msg){
				alert( "Erreur" );
				},
			success: function(data){
				console.log(data);
			}
		});
	}

	function ChoixVideo(){
		var urlVideoYoutube = prompt("Lien de la vidéo :","");


		$.ajax({
			url: 'Executeur.class.php',
			type: 'POST',
			data: 'cmd=' + escape( urlVideoYoutube ),

			error: function(msg){
				alert( "Erreur" );
				},
			success: function(data){
				console.log(data);
			}
		});
	}


	function Twitch(){
		var urlVideoYoutube = prompt("Lien de la vidéo :","");


		$.ajax({
			url: 'Executeur.class.php',
			type: 'POST',
			data: 'cmd=' + escape( "https://www.twitch.tv/overwatchleague_fr" ),

			error: function(msg){
				alert( "Erreur" );
				},
			success: function(data){
				console.log(data);
			}
		});
	}

	function SendClick(direction){
		$.ajax({
			url: 'Executeur.class.php',
			type: 'POST',
			data: 'cmd=click_' + direction,

			error: function(msg){
				alert( "Erreur" );
			},
			success: function(data){
				console.log(data);
			}
		});
	}

	

</script>


<?php 
echo '</body>
</html>';
?>