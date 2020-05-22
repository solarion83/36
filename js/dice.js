//Classes must come before game sequencing (i.e. GameManager)

class Dice {

	constructor(id) {
		this.lastRoll = "";
		this.imgPath = "";
		this.isPicked = false;
		this.id = id;
	}

	getDiceRoll () {
		let diceRoll = (Math.floor(Math.random() * Math.floor(6))+1);
		this.lastRoll = diceRoll;
		this.imgPath = '<img '+this.id+'src=\'img/' + this.lastRoll + '.png\'>';
		console.log(this.lastRoll);
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
