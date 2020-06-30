class Node {
	constructor(x,y,next){
		this.x = x;
		this.y = y;
		this.next = next;
	}
}

class List{
    constructor(){
		this.size = 0;
		this.head = null;
	}
	
	addFirst = (x,y) => {
		this.size++;
		this.head = new Node(x,y,this.head);
	}
	
	
	addLast = (x,y) => {
		this.size++;
		if( this.head == null ) {
			this.head = new Node(x,y,null);
		} else {
			let temp = this.head;
			while ( temp.next != null ) {
				temp = temp.next;
			}
			temp.next = new Node(x,y,null);
		}
	}
	
	
	removeFirst = () => {
		this.size--;
		let temp = this.head;
		if( this.head.next != null ) {
			this.head = this.head.next;
		}
		return temp;
	}
	
	printList = () => {
		let temp = this.head;
		while ( temp != null ) {
			console.log(temp);
			temp = temp.next;
		}
	}
}

list = new List();

//list.addLast(1,2);
//list.addLast(3,5);

//list.printList();


module.exports = list;