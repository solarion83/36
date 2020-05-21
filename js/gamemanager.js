const getInterface = document.querySelector(".interface");
const getInstruction = document.querySelector(".instruction");
const displayPlayerPoints = document.querySelector(".playerPoints");
const displayOpponentPoints = document.querySelector(".opponentPoints");
const getDiceArea = document.querySelector(".dicearea");
const getInteractionArea = document.querySelector(".interactionarea");

var unselectedDice = new Array;

let sumDice;

let playerPoints = 0;
let opponentPoints = 0;

var GameManager = {

	initGame: function() {

		//W�rfel zur�cksetzen
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
		getInteractionArea.innerHTML = "<button class=\"btn-wuerfeln\" onclick=\"GameManager.throwDice()\">W�rfeln!</button>";

	},


	throwDice: function() {
		
		getDiceArea.innerHTML = "";
		
		for (i = 0; i < unselectedDice.length; i++) {
			if	(!unselectedDice[i].getIsPicked()) {
				unselectedDice[i].getDiceRoll(); 
			}
		getDiceArea.innerHTML = getDiceArea.innerHTML + unselectedDice[i].imgPath;
		}
		
		console.log(GameManager.getSumDice());

		let dropdownOptions;

		for (i = 0; i < unselectedDice.length; i++) {
			if	(!unselectedDice[i].getIsPicked()) {
				dropdownOptions += "<option value=\""+(i+1)+"\">W�rfel "+(i+1)+"</option>";
			}
		}

		getInteractionArea.innerHTML = " <label>Welchen W�rfel m�chtest du behalten?</label><select id=\"eingabebehalten\" multiple>"+dropdownOptions+"</select><button class=\"btn-behalten\">Ok</button><button class=\"btn-aufhoeren\">Aufh�ren</button>";

		$(".btn-behalten").click(function () {
			
			GameManager.behalten();
		})

		$(".btn-aufhoeren").click(function () {
  
			GameManager.hauptPhaseVerrechnen();
			return;
		})
	},

	behalten: function() {
		
		var getBehaltenValue = $("#eingabebehalten").val();

		console.log(getBehaltenValue);

		if (getBehaltenValue == "") {
			alert("Du musst mindestens einen W�rfel w�hlen!");
			return;
		}

		for (j=0; j < getBehaltenValue.length; j++) {
			for (i=0; i < unselectedDice.length; i++) {
				if ((i+1)==getBehaltenValue[j]) {
					unselectedDice[i].setIsPicked();
				}
			}
		}

		if ((unselectedDice.find(x => x.isPicked === false)==null)) {
			console.log("Alle W�rfel gew�hlt. Weiter gehts mit der n�chsten Funktion!");
			GameManager.hauptPhaseVerrechnen();
			return;

		}

		getInteractionArea.innerHTML = "Behaltene W�rfel: " + getBehaltenValue + " <button class=\"btn-weiterwuerfeln\">Weiterw�rfeln</button><button class=\"btn-aufhoeren\">Aufh�ren</button>";

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