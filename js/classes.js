//Classes must come before game sequencing (i.e. GameManager)

class Dice {

	constructor(id) {
		this.lastRoll = "";
		this.imgPath = "";
		this.isPicked = false;
		this.id = id;
		this.icon = "";
	}

	getDiceRoll () {
		let diceRoll = (Math.floor(Math.random() * Math.floor(6))+1);
		this.lastRoll = diceRoll;
		
		switch (this.lastRoll) {
			
			case 1: this.icon = "<i "+this.id+" class=\"fas fa-dice-one\"></i>";
			break;

			case 2: this.icon = "<i "+this.id+" class=\"fas fa-dice-two\"></i>";
			break;

			case 3: this.icon = "<i "+this.id+" class=\"fas fa-dice-three\"></i>";
			break;

			case 4: this.icon = "<i "+this.id+" class=\"fas fa-dice-four\"></i>";
			break;

			case 5: this.icon = "<i "+this.id+" class=\"fas fa-dice-five\"></i>";
			break;

			case 6: this.icon = "<i "+this.id+" class=\"fas fa-dice-six\"></i>";
			break;
		}
		//this.imgPath = '<img '+this.id+'src=\'img/' + this.lastRoll + '.png\'>';
		//console.log(this.lastRoll);
		return diceRoll;
	}

	getIsPicked () {
		
		return this.isPicked;
	}

	setIsPicked() {
		this.isPicked = true;
	}

	setIsNotPicked() {
		this.isPicked = false;
	}


}

class Player {
	constructor (id, isActive) {
		this.id = id;
		this.isActive = isActive;
		this.points = 0;
	}

	setIsActive () {
		this.isActive = true;
	}

	setIsNotActive () {
		this.isActive = false;
	}

	getIfActive () {
		return this.isActive;
	}
}