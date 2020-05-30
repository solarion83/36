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

	var unselectedDice = new Array;

	var wertAngriff = 0;
	var schaden = 0;

	const player1 = new Player(1, true);
	const player2 = new Player(2, false);

	
	/////////// Game Sequence ///////////
	
	initGame();

	clearDiv(getDiceArea);

	getInteractionArea.innerHTML = "<button class=\"btn-wuerfeln\">Würfeln!</button>";

	$(".btn-wuerfeln").click( function() {

		throwAndPickDice();
	})
	
	
	/////////// Game Functions ///////////

	function initGame () {

		console.log("Init Game gestartet");
		
		getInstruction.innerHTML = (`Spieler ${getActivePlayer().id}: Du bist dran`);
			
		//Würfel zurücksetzen
		resetDice(); 

		console.log("Init Game beendet");
		return;

	}


	function throwAndPickDice () {
		
		console.log("ThrowAndPickDice gestartet");

		//Buttons anzeigen
		getInteractionArea.innerHTML = "<label>Welchen Würfel möchtest du behalten?</label><button class=\"btn-behalten\">Ok</button><button class=\"btn-aufhoeren\">Aufhören</button>";

		let printArrayUnselected = [];
		let printArraySelected = [];

		//Würfel würfeln und ausgeben, falls nicht herausgenommen
		unselectedDice.forEach(element => {
			if	(!element.getIsPicked()) {
				element.getDiceRoll(); 
				printArrayUnselected.push(`<div class=\"dice\">${element.icon}</div>`);
			} else {
				printArraySelected.push(element.icon);
			}
		})

		getDiceArea.innerHTML = printArrayUnselected.join("");
		getDiceAreaSelected.innerHTML = printArraySelected.join("");

		getInteractionArea.innerHTML = (`Die aktuelle Augenzahl beträgt ${getSumDice()}. ${getInteractionArea.innerHTML}`);

		let anzahlWuerfelGewaehlt = 0;
		
		$(".dice").click(function (e) {
			
			var diceClicked = parseInt(e.target.id,10);
			console.log(diceClicked);
			
			//CSS Klasse hinzufügen o. entfernen
			if ($(this).hasClass("selectedDice")) {
				
				$(this).removeClass("selectedDice");

				unselectedDice[(diceClicked - 1)].setIsNotPicked();
				anzahlWuerfelGewaehlt--;

			} else {
				$(this).addClass("selectedDice");

				unselectedDice[(diceClicked - 1)].setIsPicked();
				anzahlWuerfelGewaehlt++;
							
			} 
		})
		
		//Wenn Button "Behalten" geklickt, gehe zu Funktion behalten
		$(".btn-behalten").click(function () {

			if (anzahlWuerfelGewaehlt == "") {
				alert("Du musst mindestens einen Würfel wählen!");
			} else {
				behalten();
			}
			
		})

		//Wenn Button "Aufhören" geklickt, gehe zu Funktion hauptPhaseVerrechnen
		$(".btn-aufhoeren").click(function () {

			hauptPhaseVerrechnen();
			return;
		})
		console.log("Throw and Pick Dice beendet");
	}

	function behalten () {

		if ((unselectedDice.find(x => x.isPicked === false)==null)) {
			console.log("Alle Würfel gewählt. Weiter gehts mit der nächsten Funktion!");
			hauptPhaseVerrechnen();
			return;

		}

		//getInteractionArea.innerHTML = "Behaltene Würfel: " + getBehaltenValue + " <button class=\"btn-weiterwuerfeln\">Weiterwürfeln</button><button class=\"btn-aufhoeren\">Aufhören</button>";
		getInteractionArea.innerHTML = "Behaltene Würfel: <button class=\"btn-weiterwuerfeln\">Weiterwürfeln</button><button class=\"btn-aufhoeren\">Aufhören</button>";

		$(".btn-weiterwuerfeln").click(function () {

			throwAndPickDice();
			return;
		})

		$(".btn-aufhoeren").click(function () {

			hauptPhaseVerrechnen();
			return;
		})

			
	}

	function hauptPhaseVerrechnen () {

		if (getSumDice() < 30) {
			
			getActivePlayer().points += (30 - getSumDice());

			if (getActivePlayer().id === 1) {
				getPlayer1Points.innerHTML = (`Punkte Spieler ${getActivePlayer().id}:<br>${getActivePlayer().points}</div>`);
			} else {
				getPlayer2Points.innerHTML = (`Punkte Spieler ${getActivePlayer().id}:<br>${getActivePlayer().points}</div>`); 
			}
			initGame();

		} else if (getSumDice() == 30) {
			initGame();
		} else if (getSumDice() > 30) {
			wertAngriff = getSumDice() - 30;
			preAttack();
		}
	}

	function preAttack () {

		//Jetzt wird preAttack ausgeführt
		console.log("preAttack ausführen");
		console.log(wertAngriff);
		
		getInstruction.textContent = "Auf den Gegner würfeln mit "+wertAngriff+"ern!";

		// Würfel zurücksetzen
		resetDice(); 

		// Alle Würfel abwählen
		unselectedDice.forEach(element => {
			element.setIsNotPicked();
		})

		clearDiv(getDiceArea);
		clearDiv(getDiceAreaSelected);

		getInteractionArea.innerHTML = "<button class=\"btn-wuerfeln\">Auf Gegner würfeln!</button>";
		
		$(".btn-wuerfeln").click(function () {

			if (attack() == false) {
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

		for (i = 0; i < unselectedDice.length; i++) {
			
			if (unselectedDice[i].getIsPicked()) {

				getDiceAreaSelected.innerHTML = getDiceAreaSelected.innerHTML +unselectedDice[i].icon;

			} else {
				
				unselectedDice[i].getDiceRoll(); 
				
				if (unselectedDice[i].lastRoll == wertAngriff) {

					unselectedDice[i].setIsPicked();
					wuerfelGetroffen = true;
					console.log("Würfel getroffen");
					schaden += wertAngriff;
					getDiceArea.innerHTML = getDiceArea.innerHTML + "<div class=\"dice selectedDice\">"+unselectedDice[i].icon+"</div>";

				} else {

					getDiceArea.innerHTML = getDiceArea.innerHTML + "<div class=\"dice\">"+unselectedDice[i].icon+"</div>";
				}
			}
			
		}

		console.log("Verlasse attack");
		return wuerfelGetroffen;
	}

	/////////// Helper Functions ///////////

	function getSumDice () {
		
		return unselectedDice.reduce((a, {lastRoll}) => a + lastRoll, 0);
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
		unselectedDice[0] = dice1;
		unselectedDice[1] = dice2;
		unselectedDice[2] = dice3;
		unselectedDice[3] = dice4;
		unselectedDice[4] = dice5;
		unselectedDice[5] = dice6;
	}

	function getActivePlayer () {
		if (player1.getIfActive()) {
			return player1;
		} else if (player2.getIfActive()) {
			return player2;
		}
	}

	
}

