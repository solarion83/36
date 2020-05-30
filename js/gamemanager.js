function gameManager () {

	console.log("Game Manager gestartet");

	const getInterface = document.querySelector(".interface");
	const getInstruction = document.querySelector(".instruction");
	const displayPlayerPoints = document.querySelector(".playerPoints");
	const displayOpponentPoints = document.querySelector(".opponentPoints");
	const getDiceArea = document.querySelector(".dicearea");
	const getDiceAreaSelected = document.querySelector("#dicearea-selected");
	const getInteractionArea = document.querySelector(".interactionarea");

	var unselectedDice = new Array;

	let sumDice;

	let playerPoints = 0;
	let opponentPoints = 0;

	var wertAngriff = 0;
	var schaden = 0;

	initGame();

	getDiceArea.innerHTML = "";
	getInteractionArea.innerHTML = "<button class=\"btn-wuerfeln\">W�rfeln!</button>";

	$(".btn-wuerfeln").click( function() {

		throwDice();
	}) 

	function initGame () {

		console.log("Init Game gestartet");
		
		//W�rfel zur�cksetzen
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

		console.log("Init Game beendet");
		return;

	}


	function throwDice () {
		
		console.log("Throw Dice gestartet");
		
		//Anzeige DiceArea zur�cksetzen
		//getDiceArea.innerHTML = "";
		while (getDiceArea.firstChild) {
			getDiceArea.removeChild(getDiceArea.firstChild);
		}
		//getDiceAreaSelected.innerHTML = "";

		while (getDiceAreaSelected.firstChild) {
			getDiceAreaSelected.removeChild(getDiceAreaSelected.firstChild);
		}
		
		//W�rfel w�rfeln und ausgeben, falls nicht herausgenommen
		for (i = 0; i < unselectedDice.length; i++) {
			if	(!unselectedDice[i].getIsPicked()) {
				unselectedDice[i].getDiceRoll(); 
				getDiceArea.innerHTML = getDiceArea.innerHTML + "<div class=\"dice\">"+unselectedDice[i].imgPath+"</div>";
			} else {
				getDiceAreaSelected.innerHTML = getDiceAreaSelected.innerHTML +unselectedDice[i].imgPath;
			}
			
		}

		//Buttons anzeigen
		getInteractionArea.innerHTML = " <label>Welchen W�rfel m�chtest du behalten?</label><button class=\"btn-behalten\">Ok</button><button class=\"btn-aufhoeren\">Aufh�ren</button>";

		let anzahlWuerfelGewaehlt = 0;
		
		$(".dice").click(function (e) {
			
			var diceClicked = parseInt(e.target.id,10);
			console.log(diceClicked);
			
			//CSS Klasse hinzuf�gen o. entfernen
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
			
			behalten(anzahlWuerfelGewaehlt);
		})

		//Wenn Button "Aufh�ren" geklickt, gehe zu Funktion hauptPhaseVerrechnen
		$(".btn-aufhoeren").click(function () {

			hauptPhaseVerrechnen();
			return;
		})
		console.log("Throw Dice beendet");
	}

	function behalten (anzahlWuerfelGewaehlt) {
		
		if (anzahlWuerfelGewaehlt == "") {
			alert("Du musst mindestens einen W�rfel w�hlen!");
			return;
		}

		if ((unselectedDice.find(x => x.isPicked === false)==null)) {
			console.log("Alle W�rfel gew�hlt. Weiter gehts mit der n�chsten Funktion!");
			hauptPhaseVerrechnen();
			return;

		}

		//getInteractionArea.innerHTML = "Behaltene W�rfel: " + getBehaltenValue + " <button class=\"btn-weiterwuerfeln\">Weiterw�rfeln</button><button class=\"btn-aufhoeren\">Aufh�ren</button>";
		getInteractionArea.innerHTML = "Behaltene W�rfel: <button class=\"btn-weiterwuerfeln\">Weiterw�rfeln</button><button class=\"btn-aufhoeren\">Aufh�ren</button>";

		$(".btn-weiterwuerfeln").click(function () {

			throwDice();
			return;
		})

		$(".btn-aufhoeren").click(function () {

			hauptPhaseVerrechnen();
			return;
		})

			
	}

	function hauptPhaseVerrechnen () {

		if (getSumDice() < 30) {
			
			playerPoints += (30 - getSumDice());
			displayPlayerPoints.innerHTML = "Punkte Spieler 1:<br>"+playerPoints+"</div>";
			initGame();

		} else if (getSumDice() == 30) {
			initGame();
		} else if (getSumDice() > 30) {
			wertAngriff = getSumDice() - 30;
			preAttack();
		}
	}

	function preAttack () {

		//Jetzt wird preAttack ausgef�hrt
		console.log("preAttack ausf�hren");
		console.log(wertAngriff);
		
		getInstruction.textContent = "Auf den Gegner w�rfeln mit "+wertAngriff+"ern!";

		// W�rfel zur�cksetzen 
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

		for (i = 0; i < unselectedDice.length; i++) {
			unselectedDice[i].setIsNotPicked();
		}

		getDiceArea.innerHTML = "";
		getDiceAreaSelected.innerHTML = "";

		getInteractionArea.innerHTML = "<button class=\"btn-wuerfeln\">Auf Gegner w�rfeln!</button>";
		
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

		console.log("attack ausf�hren");
		console.log(wertAngriff);
		
		getDiceArea.innerHTML = "";
		getDiceAreaSelected.innerHTML = "";

		let wuerfelGetroffen;
		
		wuerfelGetroffen = false;

		for (i = 0; i < unselectedDice.length; i++) {
			
			if (unselectedDice[i].getIsPicked()) {

				getDiceAreaSelected.innerHTML = getDiceAreaSelected.innerHTML +unselectedDice[i].imgPath;

			} else {
				
				unselectedDice[i].getDiceRoll(); 
				
				if (unselectedDice[i].lastRoll == wertAngriff) {

					unselectedDice[i].setIsPicked();
					wuerfelGetroffen = true;
					console.log("W�rfel getroffen");
					schaden += wertAngriff;
					getDiceArea.innerHTML = getDiceArea.innerHTML + "<div class=\"dice selectedDice\">"+unselectedDice[i].imgPath+"</div>";

				} else {

					getDiceArea.innerHTML = getDiceArea.innerHTML + "<div class=\"dice\">"+unselectedDice[i].imgPath+"</div>";
				}
			}
			
		}

		console.log("Verlasse attack");
		return wuerfelGetroffen;
		
		
		

	}

	function getSumDice () {
		
		return unselectedDice.reduce((a, {lastRoll}) => a + lastRoll, 0);
	}

	
}

// gameManager();
$(".gamebutton").click(function () {
	gameManager(); })