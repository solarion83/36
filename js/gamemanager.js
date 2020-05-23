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

var GameManager = {

	initGame: function() {

		//Würfel zurücksetzen
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

		getDiceArea.innerHTML = "";
		getInteractionArea.innerHTML = "<button class=\"btn-wuerfeln\" onclick=\"GameManager.throwDice()\">Würfeln!</button>";

	},


	throwDice: function() {
		
		//Anzeige DiceArea zurücksetzen
		getDiceArea.innerHTML = "";
		getDiceAreaSelected.innerHTML = "";
		
		//Würfel würfeln und ausgeben, falls nicht herausgenommen
		for (i = 0; i < unselectedDice.length; i++) {
			if	(!unselectedDice[i].getIsPicked()) {
				unselectedDice[i].getDiceRoll(); 
				getDiceArea.innerHTML = getDiceArea.innerHTML + "<div class=\"dice\">"+unselectedDice[i].imgPath+"</div>";
			} else {
				getDiceAreaSelected.innerHTML = getDiceAreaSelected.innerHTML +unselectedDice[i].imgPath;
			}
			
		}

		//Buttons anzeigen
		getInteractionArea.innerHTML = " <label>Welchen Würfel möchtest du behalten?</label><button class=\"btn-behalten\">Ok</button><button class=\"btn-aufhoeren\">Aufhören</button>";

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
			
			GameManager.behalten(anzahlWuerfelGewaehlt);
		})

		//Wenn Button "Aufhören" geklickt, gehe zu Funktion hauptPhaseVerrechnen
		$(".btn-aufhoeren").click(function () {
  
			GameManager.hauptPhaseVerrechnen();
			return;
		})
	},

	behalten: function(anzahlWuerfelGewaehlt) {
		
		if (anzahlWuerfelGewaehlt == "") {
			alert("Du musst mindestens einen Würfel wählen!");
			return;
		}

		if ((unselectedDice.find(x => x.isPicked === false)==null)) {
			console.log("Alle Würfel gewählt. Weiter gehts mit der nächsten Funktion!");
			GameManager.hauptPhaseVerrechnen();
			return;

		}

		//getInteractionArea.innerHTML = "Behaltene Würfel: " + getBehaltenValue + " <button class=\"btn-weiterwuerfeln\">Weiterwürfeln</button><button class=\"btn-aufhoeren\">Aufhören</button>";
		getInteractionArea.innerHTML = "Behaltene Würfel: <button class=\"btn-weiterwuerfeln\">Weiterwürfeln</button><button class=\"btn-aufhoeren\">Aufhören</button>";

		$(".btn-weiterwuerfeln").click(function () {
  
			GameManager.throwDice();
			return;
		})

		$(".btn-aufhoeren").click(function () {
  
			GameManager.hauptPhaseVerrechnen();
			return;
		})

			
	},

	hauptPhaseVerrechnen: function() {

		if (GameManager.getSumDice() < 30) {
			
			playerPoints += (30 - GameManager.getSumDice());
			displayPlayerPoints.innerHTML = "Punkte Spieler 1:<br>"+playerPoints+"</div>";
			GameManager.initGame();

		} else if (GameManager.getSumDice() == 30) {
			GameManager.initGame();
		} else if (GameManager.getSumDice() > 30) {
			let wertAngriff = GameManager.getSumDice() - 30;
			GameManager.preAttack(wertAngriff);
		}
	},

	preAttack: function(wertAngriff) {

		getInstruction.textContent = "Auf den Gegner würfeln mit"+wertAngriff+"ern!";

		// Würfel zurücksetzen 
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

		getDiceArea.innerHTML = "";
		getDiceAreaSelected.innerHTML = "";

		getInteractionArea.innerHTML = "<button class=\"btn-wuerfeln\" onclick=\"GameManager.attack()\">Auf Gegner würfeln!</button>";
		
		GameManager.attack(wertAngriff);



	},

	attack: function(wertAngriff) {

		getDiceArea.innerHTML = "";
		getDiceAreaSelected.innerHTML = "";
		
		for (i = 0; i < unselectedDice.length; i++) {
			if	(!unselectedDice[i].getIsPicked()) {
				unselectedDice[i].getDiceRoll(); 
			}

			if (unselectedDice[i] == wertAngriff) {
				unselectedDice[i].getIsPicked();
				getDiceAreaSelected.innerHTML = getDiceAreaSelected.innerHTML +unselectedDice[i].imgPath;
			}
				
			 else {
				getDiceArea.innerHTML = getDiceArea.innerHTML + "<div class=\"dice\">"+unselectedDice[i].imgPath+"</div>";
			}
			
		}

	},

	getSumDice: function() {
		
		return unselectedDice.reduce((a, {lastRoll}) => a + lastRoll, 0);
	}

}