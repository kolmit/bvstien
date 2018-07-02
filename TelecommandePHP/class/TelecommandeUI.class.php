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
		<link href="../css/bootstrap.min.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="../css/tele.css"> 


	<title>La Telecommande de Nous <3</title>
	</head>
	<body>
		<script src="../js/jquery-3.3.1.js"></script>
		<script src="../js/bootstrap.min.js"></script>
		<script src="../js/virtualjoystick.js"></script>

		<div class=container>

			<div id=remote-control>

			<h2>Main navigation</h2>

			<ul>
				<img src="../css/power.png" id="boutonPower" class="bouton" onclick="ChoixNbSeconde()"/>
			</ul>

			<h2>Select a site section</h2>
			<div>
				<img src="../css/+.png" id="boutonPlus" class="bouton" onclick="Volume(\'' . TelecommandeUI::$plus . '\')"/>
				<img src="../css/-.png" id="boutonMoins" class="bouton" onclick="Volume(\'' . TelecommandeUI::$moins . '\')"/>
				<img src="../css/leftclick.png" id="boutonLeftClick" class="bouton" onclick="SendClick(\'left\')"/>
				<img src="../css/wheelup.png" id="boutonMiddleUpClick" class="bouton" onclick="SendClick(\'middleup\')"/>
				<img src="../css/wheeldown.png" id="boutonMiddleDownClick" class="bouton" onclick="SendClick(\'middledown\')"/>
				<img src="../css/rightclick.png" id="boutonRightClick" class="bouton" onclick="SendClick(\'right\')"/>
				<img src="../css/headset.png" id="boutonHeadset" class="bouton" onclick="SoundOutput(\'headset\')"/>

			</div>
			<ul>
				<li id=buttonYoutube><a href="#" title="BoutonYoutube" class="bouton" onclick="ChoixVideo()"><span>YouTube</span></a></li>
				
				<li id=buttonJoystick><a href="#" title="Section 5" class="bouton" onclick="joyStick()"><span>Section 5</span></a></li>

				
				<li id=buttonTwitch><a href="#" title="Twitch"><span>Twitch</span></a></li>
				<li id=button9><a href="#" title="Section 9"><span>Section 9</span></a></li>
				<li id=button10><a href="#" title="Section 10"><span>Section 10</span></a></li>
				<li id=button11><a href="#" title="Section 11"><span>Section 11</span></a></li>
				<li id=button12><a href="#" title="Section 12"><span>Section 12</span></a></li>
				<span id="result">aze</span>
				<div id="screenCoords"></div>
			</ul>
			</div>
		</div>';

	}

}

	$mainTelecommande = new TelecommandeUI();
	$mainTelecommande->initInterface();
?>


<script>
	$( document ).ready(function() {

	});
	/***********
	* Joystick *
	************/
	var joystickActif = false;

	function OuvrirPopup($contenu) {
		var htmlDivPopup = "<div class=\"divPopupFond\" id=\"divPopupFond\"></div><div class=\"divPopup\" id=\"divPopup\"><div class=\"divPopupContenu\" id=\"divPopupContenu\"><span id=\"spanFermer\">fermer</span></div></div>";
		$(htmlDivPopup).insertBefore("#remote-control");

        $('#divPopupContenu').empty ().append ($contenu);
        $('#divPopupFond').show ();
		$('#divPopup').css('display', 'flex');
	}

    function FermerPopup () {
        $('#divPopupFond').hide ();
        $('#divPopup').hide ();
        $('#divPopupContenu').empty ();
    }


	function joyStick(){
		
		joystickActif = !joystickActif;
		
		if (!joystickActif){
			canvasbase = document.getElementById('canvas-base');
			canvasstick = document.getElementById('canvas-stick');
			canvasbase.remove();
			canvasstick.remove();
			return;
		}


		var joystick	= new VirtualJoystick({
			container	: document.getElementById('divPopupContenu'),
			mouseSupport	: true,
		    stationaryBase: true,
	        baseX: 250,
	        baseY: 250,
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
			if (joystick._pressed && joystickActif){
				sendToMouse(dx, dy);
			}
		}, 1/30 * 1000);
	}


	var initialX;
	var initialY;
	function sendToMouse(coordX, coordY){

		if (coordX === initialX && coordY === initialY) return;
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

    function GetContenuPopupPowerButton() {
	    retour =
            '<div class="row justify-content-center">' +
                '<div class="col-4"><button class="btn btn-danger boutonPower" onclick="ChoixNbSeconde(0)">Eteindre</button></div>' +
            '<div class="col-4"><button class="btn btn-warning boutonPower" onclick="ChoixNbSeconde(1)" style="">Veille</button></div>' +
            '</div>' +
            '' +
            '' +
            '';
	    return retour;
    }


	function ChoixNbSeconde(pAction){
        OuvrirPopup( GetContenuPopupPowerButton() );
        if (pAction === 0) {
            var commande = 'cmd=pc_off_';
            var timeBeforeShutdown = prompt("Dans combien de temps ? (seconde) :","0");
        }
        if (pAction === 1) {
            var commande = 'cmd=pc_veille_';
            var timeBeforeShutdown = '';
        }

		$.ajax({
			url: 'Executeur.class.php',
			type: 'POST',
			data: commande + timeBeforeShutdown,

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

	
	function SoundOutput(){
		$.ajax({
			url: 'Executeur.class.php',
			type: 'POST',
			data: 'cmd=headset',

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