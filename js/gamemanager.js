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

		getDiceArea.innerHTML = "";
		getInteractionArea.innerHTML = "<button class=\"btn-wuerfeln\" onclick=\"GameManager.throwDice()\">W�rfeln!</button>";

	},


	throwDice: function() {
		
		//Anzeige DiceArea zur�cksetzen
		getDiceArea.innerHTML = "";
		getDiceAreaSelected.innerHTML = "";
		
		//W�rfel w�rfeln und ausgeben, falls nicht herausgenommen
		for (i = 0; i < unselectedDice.length; i++) {
			if	(!unselectedDice[i].getIsPicked()) {
				unselectedDice[i].getDiceRoll(); 
				getDiceArea.innerHTML = getDiceArea.innerHTML + "<div class=\"dice\">"+unselectedDice[i].imgPath+"</div>";
			} else {
				getDiceAreaSelected.innerHTML = getDiceAreaSelected.innerHTML +unselectedDice[i].imgPath;
			}
			
		}
		
		//Dropdown konstruieren
		let dropdownOptions;

		for (i = 0; i < unselectedDice.length; i++) {
			if	(!unselectedDice[i].getIsPicked()) {
				dropdownOptions += "<option value=\""+(i+1)+"\">W�rfel "+(i+1)+"</option>";
			}
		}

		//Dropdown und Buttons anzeigen
		getInteractionArea.innerHTML = " <label>Welchen W�rfel m�chtest du behalten?</label><select id=\"eingabebehalten\" multiple>"+dropdownOptions+"</select><button class=\"btn-behalten\">Ok</button><button class=\"btn-aufhoeren\">Aufh�ren</button>";

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
			
			GameManager.behalten(anzahlWuerfelGewaehlt);
		})

		//Wenn Button "Aufh�ren" geklickt, gehe zu Funktion hauptPhaseVerrechnen
		$(".btn-aufhoeren").click(function () {
  
			GameManager.hauptPhaseVerrechnen();
			return;
		})
	},

	behalten: function(anzahlWuerfelGewaehlt) {
		
		/*var getBehaltenValue = $("#eingabebehalten").val();

		console.log(getBehaltenValue); */

		if (anzahlWuerfelGewaehlt == "") {
			alert("Du musst mindestens einen W�rfel w�hlen!");
			return;
		}

		/* for (j=0; j < getBehaltenValue.length; j++) {
			for (i=0; i < unselectedDice.length; i++) {
				if ((i+1)==getBehaltenValue[j]) {
					unselectedDice[i].setIsPicked();
				}
			}
		} */

		if ((unselectedDice.find(x => x.isPicked === false)==null)) {
			console.log("Alle W�rfel gew�hlt. Weiter gehts mit der n�chsten Funktion!");
			GameManager.hauptPhaseVerrechnen();
			return;

		}

		//getInteractionArea.innerHTML = "Behaltene W�rfel: " + getBehaltenValue + " <button class=\"btn-weiterwuerfeln\">Weiterw�rfeln</button><button class=\"btn-aufhoeren\">Aufh�ren</button>";
		getInteractionArea.innerHTML = "Behaltene W�rfel: <button class=\"btn-weiterwuerfeln\">Weiterw�rfeln</button><button class=\"btn-aufhoeren\">Aufh�ren</button>";

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
			GameManager.preAttack();
		}
	},

	preAttack: function() {

		getInstruction.textContent = "Auf den Gegner w�rfeln!";

		// W�rfel zur�cksetzen 
		var dice1 = new Dice;
		var dice2 = new Dice;
		var dice3 = new Dice;
		var dice4 = new Dice;
		var dice5 = new Dice;
		var dice6 = new Dice;
		unselectedDice[0] = dice1;
		unselectedDice[1] = dice2;
		unselectedDice[2] = dice3;
		unselectedDice[3] = dice4;
		unselectedDice[4] = dice5;
		unselectedDice[5] = dice6;

		getDiceArea.innerHTML = "";

		GameManager.attack();



	},

	attack: function() {
		

	},

	getSumDice: function() {
		
		return unselectedDice.reduce((a, {lastRoll}) => a + lastRoll, 0);
	}

}