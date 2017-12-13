//main.js
const cardNum = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const cardType = ['♥', '♦', '♠', '♣'];

function main() {
	let x = document.querySelector(".playBtn");
	let input = document.querySelector("#startValue");
	x.addEventListener('click', test);
}

function test(evt) {
	evt.preventDefault();
	let g = document.querySelector(".game");
	let s = document.querySelector(".start");
	s.classList.toggle('gone');
	let start = document.querySelector("#startValues").value.split(',');
	let tgt = [ start[1] + cardType[0], start[3] + cardType[1], start[0] + cardType[2], start[2] + cardType[3] ];
	let user = [ start[1] + cardType[0], start[3] + cardType[1] ];
	let comp = [ start[0] + cardType[2], start[2] + cardType[3] ];
	console.log(user,comp, tgt);
	let deck = [];
	makeDeck(deck, tgt); //made randomized
	let compScore = document.createElement('p');
	compScore.classList.add('scoreBox');
	compScore.classList.add('compscore');
	compScore.classList.add('alpha-font');
	compScore.appendChild(document.createTextNode("Computer Hand: ?"));

	let compCards = document.createElement('div');
	compCards.classList.add('compcards');

	let userScore = document.createElement('p');
	userScore.classList.add('scoreBox');
	userScore.classList.add('alpha-font');
	userScore.appendChild(document.createTextNode("User Hand: " + getScore(user)));

	let userCards = document.createElement('div');
	userCards.classList.add('usercards');

	let buttons = document.createElement('div');
	buttons.classList.add('alpha-font');
	buttons.classList.add('hitStand');
	let hit = document.createElement('button');
	hit.classList.add('btn');
	hit.classList.add('hit');
	hit.appendChild(document.createTextNode("Hit"));
	let stand = document.createElement('button');
	stand.classList.add('btn');
	stand.classList.add('stand');
	stand.appendChild(document.createTextNode("Stand"));
	buttons.appendChild(hit);
	buttons.appendChild(stand);

	g.appendChild(compScore);
	g.appendChild(compCards);
	g.appendChild(userScore);
	g.appendChild(userCards);
	g.appendChild(buttons);

	addStartValues(comp, '.compcards');
	addStartValues(user, '.usercards');

	let facedown = document.querySelector(".compcards");
	let firstCard = facedown.querySelector(".facedown");
	let btns = document.querySelector(".hitStand");
	let hitBtn = btns.querySelector(".hit");
	let standBtn = btns.querySelector(".stand");

	hitBtn.addEventListener('click', (evt) => {
		addCard(user, '.usercards', deck);
		let tempScore = getScore(user);
		userScore.textContent = "User Hand: " + tempScore;
		if(tempScore > 21) {
			hitBtn.classList.toggle('gone');
			standBtn.classList.toggle('gone');
			firstCard.classList.toggle('facedown');
			compScore.textContent = 'Computer Hand: ' + getScore(comp);
			let end = document.createElement('p');
			end.classList.add('scoreBox');
			end.appendChild(document.createTextNode("COMPUTER WON!!!"));
			buttons.appendChild(end);
		}
	});
	standBtn.addEventListener('click', (evt) => {
		hitBtn.classList.toggle('gone');
		standBtn.classList.toggle('gone');
		firstCard.classList.toggle('facedown');
		let userScr = getScore(user);
		while(getScore(comp) < 19)
			addCard(comp, '.compcards', deck);
		compScore.textContent = 'Computer Hand: ' + getScore(comp);
		let end = document.createElement('p');
		end.classList.add('scoreBox');
		if(getScore(comp) > 21 || userScr > getScore(comp)) {
			end.appendChild(document.createTextNode("PLAYER WON!!!"));
			buttons.appendChild(end);
		}
		else if(userScr < getScore(comp)) {
			end.appendChild(document.createTextNode("COMPUTER WON!!!"));
			buttons.appendChild(end);
		}
		else {
			end.appendChild(document.createTextNode("IT IS A TIE!!!"));
			buttons.appendChild(end);
		}
	});
}

function makeDeck(deck, tgt) {
	cardNum.map(function(e) {
		cardType.map(function(s) {
			deck.push(e+s);
		});
	});
	for(let i = 0; i < tgt.length; i++) {
		let index = deck.indexOf(tgt[i]);
		deck.splice(index, 1);
	}
	//fisher-yates shuffle, took from online
	let currIndex = deck.length;
	let temp;
	let randIndex;
	while(0 !== currIndex) {
		randIndex = Math.floor(Math.random()*currIndex);
		currIndex--;
		temp = deck[currIndex];
		deck[currIndex] = deck[randIndex];
		deck[randIndex] = temp;
	}
}

function getScore(arr) {
	let total = 0;
	for(let i = 0; i < arr.length; i++) {
		let num = arr[i].substring(0,1);
		if(num === 'A') { total+=11; }
		else if(num === '1') { total+=10; }
		else if(num === 'J' || num === 'Q' || num === 'K') { total+=10; }
		else { total += parseInt(num); }
	}
	if(total > 21) {
		for(let i = 0; i < arr.length; i++) {
			let num = arr[i].substring(0,1);
			if(num === 'A') {
				total-=10;
			}
		}
	}
	return total;
}

function addStartValues(arr, cls) {
	for(let i = 0; i < arr.length; i++) {
		let c = document.querySelector(cls);
		let d = document.createElement('div');
		let suit = arr[i].substring(1);
		if(suit === '♠') {
			d.classList.add('facedown');
		}
		if(suit === '♥' || suit === '♦') { d.classList.add('red');d.classList.add('card'); }
		else { d.classList.add('black');d.classList.add('card'); }
		let val = document.createTextNode(arr[i]);
		d.appendChild(val);
		c.appendChild(d);
	}
}

function addCard(arr, cls, deck) {
	let f = deck.shift();
	arr.push(f);
	let c = document.querySelector(cls);
	let d = document.createElement('div');
	let suit = f.substring(1);
	if(suit === '♥' || suit === '♦') { d.classList.add('red');d.classList.add('card'); }
	else { d.classList.add('black');d.classList.add('card'); }
	let val = document.createTextNode(f);
	d.appendChild(val);
	c.appendChild(d);
}

document.addEventListener('DOMContentLoaded', main);