const list = require('./list');

var keypress = require('keypress');

keypress(process.stdin);

var clc = require("cli-color");

var error = clc.red.bold;
var cyan = clc.cyan;
var notice = clc.green;

process.stdout.write(clc.erase.screen);


let up = false;
let down = false;
let right = true;
let left = false;

let pause = false;

let appleX;
let appleY;


let checkInSnake = (appleX,appleY) => {
	let temp = list.head;
	while( temp != null ) {
		if ( appleX == temp.x && appleY == temp.y) {
			return true;
		}
		temp = temp.next;
	}
	return false;
};


let createRandomApple = () => {
	do {
		appleX = Math.floor( Math.random() * 40 + 2 );
		appleY = Math.floor( Math.random() * 10 + 3 );
	} while(checkInSnake(appleX,appleY));
	
}

createRandomApple();

let x = 2;
let y = 2;

let prevX = x;
let prevY = y;


let motion = setInterval( () => {
	
	if(pause) {
		return;
	} else {

		prevX = x;
		prevY = y;
		
		if( up == true ) {
			y--;
		} else if ( down == true ) {
			y++;
		} else if ( right == true ) {
			x++;
		} else if ( left == true ) {
			x--;
		}
		
		list.addLast(x,y);
		process.stdout.write(clc.move.to(x, y));
		console.log(notice("0"));
			
		/*
		let temp = list.head;
		while ( temp != null ) {
			process.stdout.write(clc.move.to(temp.x, temp.y));
			console.log(notice("0"));
			
			temp = temp.next;
		}
		*/
		
		
		
		
		process.stdout.write(clc.move.to(appleX, appleY));
		console.log(cyan("@"));
		
		
		
		if ( x == appleX && y == appleY ) {
			//process.stdout.write(clc.move.to(appleX, appleY));
			//console.log(notice(" "));
			process.stdout.write(clc.move.to(appleX, appleY));
			console.log(notice("0"));
			createRandomApple();
		} else {
			let deletedNode = list.removeFirst();
			process.stdout.write(clc.move.to(deletedNode.x, deletedNode.y));
			console.log(notice(" "));
		}
	}
}, 100);





let makeAllFalse = () => {
	up = down = right = left = false;
}


let currentMiliseconds = null;
let keyPressMiliseconds = null;

process.stdin.on('keypress', function (ch, key) {
  //console.log(key);
  /*  
  currentMiliseconds = keyPressMiliseconds;
  keyPressMiliseconds = Date.now();
  
  if( currentMiliseconds == null ) {
	  
  } else {
	  process.stdout.write(clc.move.to(10, 20));
	  console.log(notice("        "));
	  let diff = keyPressMiliseconds - currentMiliseconds;
	  process.stdout.write(clc.move.to(10, 20));
	  console.log(notice(diff));
	  if( diff < 60 ) {
		  return;
	  }
  }
  */
  
  
  if( key.name == 'w' && down != true ) {
	  makeAllFalse();
	  up = true; 
	  pause = false;
  } else if ( key.name == 's' && up != true ) {
	  makeAllFalse();
	  down = true; 
	  pause = false;
  } else if ( key.name == 'd' && left != true ) {
	  makeAllFalse();
	  right = true; 
	  pause = false;
  } else if ( key.name == 'a' && right != true ) {
	  makeAllFalse();
	  left = true; 
	  pause = false;
  } else if ( key.name == 'space' ) {
	  pause = !pause;
  } 
  
  if (key && key.ctrl && key.name == 'c') {
    process.exit();
  }
  
});

process.stdin.setRawMode(true);
process.stdin.resume();



process.on('exit' , () => {
	//list.printList();
});