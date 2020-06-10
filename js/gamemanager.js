/////////// Main Call ///////////
$(".gamebutton").click(function () {
	gameManager(); }
)

/////////// Main Function ///////////
function gameManager () {

	console.log("Game Manager gestartet");

	const getInterface = document.querySelector(".interface");
	const getInstruction = document.querySelector(".instruction");
	const getPlayer1Points = document.querySelector(".player1Points");
	const getPlayer2Points = document.querySelector(".player2Points");
	const getDiceArea = document.querySelector(".dicearea");
	const getDiceAreaSelected = document.querySelector("#dicearea-selected");
	const getInteractionArea = document.querySelector(".interactionarea");
	const getStatusArea = document.querySelector(".statusarea");

	var diceArray = new Array;

	var wertAngriff = 0;
	var schaden = 0;

	const player1 = new Player(1, true);
	const player2 = new Player(2, false);

	
	/////////// Game Sequence ///////////
	
	initGame();

	//clearDiv(getDiceArea);

	//getInteractionArea.innerHTML = "<button class=\"btn-wuerfeln\">Würfeln!</button>";

	//$(".btn-wuerfeln").click( function() {
		
		//Buttons anzeigen
		//getInteractionArea.innerHTML = "<label>Welchen Würfel möchtest du behalten?</label><button class=\"btn-behalten\">Ok</button><button class=\"btn-aufhoeren\">Aufhören</button>";

	//	throwAndPickDice();
		//	hauptPhaseVerrechnen();
	
	//})
	
	
	/////////// Game Functions ///////////

	function initGame () {

		console.log("Init Game gestartet");
		
		getInstruction.innerHTML = (`Spieler ${getActivePlayer().id}: Du bist dran`);
			
		//Würfel zurücksetzen
		resetDice(); 

		console.log("Init Game beendet");
		
		throwAndPickDice ();

	}

	function throwAndPickDice () {
		
		console.log("ThrowAndPickDice gestartet");

		//Buttons anzeigen
		getInteractionArea.innerHTML = "<label>Welchen Würfel möchtest du behalten?</label><button class=\"btn-behalten\">Ok</button><button class=\"btn-aufhoeren\">Aufhören</button>";

		if (!(diceArray.find(x => x.isPicked === false)==null)) {

			let printArrayUnselected = [];
			let printArraySelected = [];

			//Würfel würfeln, falls nicht gewählt, und zu Arrays hinzufügen
			diceArray.forEach(element => {
				if	(!element.getIsPicked()) {
					element.getDiceRoll(); 
					printArrayUnselected.push(`<div class=\"dice\">${element.icon}</div>`);
				} else {
					printArraySelected.push(element.icon);
				}
			})

			//Arrays ausgeben
			getDiceArea.innerHTML = printArrayUnselected.join("");
			getDiceAreaSelected.innerHTML = printArraySelected.join("");

			getStatusArea.innerHTML = (`Die aktuelle Augenzahl beträgt ${getSumDice()}.`);

			let anzahlWuerfelGewaehlt = 0;
			
			// Würfel auswählen
			$(".dice").click(function (e) {
				
				var diceClicked = parseInt(e.target.id,10);
				console.log(diceClicked);
				
				//CSS Klasse hinzufügen o. entfernen
				if ($(this).hasClass("selectedDice")) {
					
					$(this).removeClass("selectedDice");

					diceArray[(diceClicked - 1)].setIsNotPicked();
					if (anzahlWuerfelGewaehlt > 0) {
						anzahlWuerfelGewaehlt--;
					}

				} else {
					$(this).addClass("selectedDice");

					diceArray[(diceClicked - 1)].setIsPicked();
					anzahlWuerfelGewaehlt++;		
				} 
			})
			
			//Wenn Button "Behalten" geklickt, entweder neu würfeln oder gehe zu hauptPhaseVerrechnen
			$(".btn-behalten").click(function () {

				if (anzahlWuerfelGewaehlt === 0) {
					alert("Du musst mindestens einen Würfel wählen!");
				}
				else {
					behalten();
				}
			})

			//Wenn Button "Aufhören" geklickt, gehe zu Funktion hauptPhaseVerrechnen
			$(".btn-aufhoeren").click(function () {
			
				diceArray.forEach(element => {
					element.setIsPicked();
				}) 
				
				hauptPhaseVerrechnen();
			})
		} else {
			hauptPhaseVerrechnen ();
		}


		console.log("Throw and Pick Dice beendet");


	}

	function behalten () {

		getInteractionArea.innerHTML = "<button class=\"btn-weiterwuerfeln\">Weiterwürfeln</button><button class=\"btn-aufhoeren\">Aufhören</button>";

		$(".btn-weiterwuerfeln").click(function () {

			throwAndPickDice();
			
		})

		$(".btn-aufhoeren").click(function () {

			hauptPhaseVerrechnen();
			
		}) 
	}

	function hauptPhaseVerrechnen () {

		console.log("hauptPhaseVerrechnen gestartet");

		getInteractionArea.innerHTML = "";

		//if (diceArray.find(x => x.isPicked === false)==null) {
			if (getSumDice() < 30) {
			
				getActivePlayer().points += (30 - getSumDice());
	
				if (getActivePlayer().id === 1) {
					getPlayer1Points.innerHTML = (`Punkte Spieler ${getActivePlayer().id}:<br>${getActivePlayer().points}</div>`);
				} else {
					getPlayer2Points.innerHTML = (`Punkte Spieler ${getActivePlayer().id}:<br>${getActivePlayer().points}</div>`); 
				}
				switchActivePlayer();
				initGame();
	
			} else if (getSumDice() == 30) {

				switchActivePlayer();
				initGame();
			} else if (getSumDice() > 30) {
				wertAngriff = getSumDice() - 30;
				preAttack();
			}
			console.log("hauptPhaseVerrechnen beendet");
		//} else {
		//	 console.log("Noch nicht alle Würfel gewählt");
		//}

		
	} 

	function preAttack () {

		console.log("preAttack ausführen");
		console.log(wertAngriff);
		
		getInstruction.textContent = (`Auf den Gegner würfeln mit ${wertAngriff}ern!`);

		// Würfel zurücksetzen
		resetDice(); 

		// Alle Würfel abwählen
		diceArray.forEach(element => {
			element.setIsNotPicked();
		})

		clearDiv(getDiceArea);
		clearDiv(getDiceAreaSelected);

		getInteractionArea.innerHTML = "<button class=\"btn-wuerfeln\">Auf Gegner würfeln!</button>";
		
		$(".btn-wuerfeln").click(function () {

			if (attack() == false) {
				switchActivePlayer();
				initGame();
			}	
		})

		if (attack() == false) {
			return;
		}	

		console.log("preAttack beendet");	
	}

	function attack () {

		console.log("attack ausführen");
		console.log(wertAngriff);

		clearDiv(getDiceArea);
		clearDiv(getDiceAreaSelected);

		let wuerfelGetroffen = false;

		diceArray.forEach(element => {
			
			if (element.getIsPicked()) {
				getDiceAreaSelected.innerHTML = getDiceAreaSelected.innerHTML +element.icon;
			} else {
				element.getDiceRoll(); 
			
				if (element.lastRoll == wertAngriff) {

					element.setIsPicked();
					wuerfelGetroffen = true;
					schaden += wertAngriff;
					getDiceArea.innerHTML = getDiceArea.innerHTML + (`<div class=\"dice selectedDice\">${element.icon}</div>`);

				} else {
					getDiceArea.innerHTML = getDiceArea.innerHTML + "<div class=\"dice\">"+element.icon+"</div>";
				}
			}
		})

		console.log("Verlasse attack");
		return wuerfelGetroffen;
	}

	/////////// Helper Functions ///////////

	function getSumDice () {
		return diceArray.reduce((a, {lastRoll}) => a + lastRoll, 0);
	}

	function clearDiv (element) {
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}	
	}

	function resetDice() {
		var dice1 = new Dice("id=\"1\"");
		var dice2 = new Dice("id=\"2\"");
		var dice3 = new Dice("id=\"3\"");
		var dice4 = new Dice("id=\"4\"");
		var dice5 = new Dice("id=\"5\"");
		var dice6 = new Dice("id=\"6\"");
		diceArray[0] = dice1;
		diceArray[1] = dice2;
		diceArray[2] = dice3;
		diceArray[3] = dice4;
		diceArray[4] = dice5;
		diceArray[5] = dice6;
	}

	function getActivePlayer () {
		if (player1.getIfActive()) {
			return player1;
		} else if (player2.getIfActive()) {
			return player2;
		}
	}

	function switchActivePlayer() {
		if (player1.getIfActive()) {
			player2.setIsActive();
			player1.setIsNotActive();
		} else if (player2.getIfActive()) {
			player1.setIsActive();
			player2.setIsNotActive();
		}
	}
}