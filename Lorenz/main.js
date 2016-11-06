var cols, rows;
var w = 8;

var grid = [];
var stack = [];
var done = [];
var current;

var tic = 0;

function setup() {
	createCanvas(400, 400);
	cols = floor(width/w);
	rows = floor(height/w);

	for(var j = 0; j < rows; j++){
		for(var i = 0; i < cols; i++){
			var cell = new Cell(i,j);
			grid.push(cell);
		}
	}

	current = grid[floor(random(0, grid.length))];


	

}
function draw() {
	
	background(51);
 	for(var i = 0; i < grid.length; i++){
  		grid[i].show();
  	}

  	showAllNeighbours(current);
	current.highlight();
  	for(var i = 0; i < stack.length; i++){
  		stack[i].showDone();
  	}

  	
  	console.log(stack.length);

  	current.visited = true;
  	
  	var next = current.checkNeighbors();
  	if(next) {

  		stack.push(current);

  		removeWalls(current, next);


  		current = next;
  	} else if(stack.length > 0){
  			current = stack.pop();

  	}
}

function Cell(i,j){
	this.i = i;
	this.j = j;

	this.walls = [true, true, true, true]; //top, right, bottom, left
	this.visited = false;

	this.highlight = function() {
		var x = this.i*w;
		var y = this.j*w;

		noStroke();
		fill(0,0,255,100);
		rect(x,y,w,w);
	}

	this.checkNeighbors = function() {
		var neighbours = [];


		var top = grid[index(i, j-1)];
		var right = grid[index(i+1,j)]
		var bottom = grid[index(i, j+1)];
		var left = grid[index(i-1, j)];

		if(top && !top.visited){
			neighbours.push(top);
		}
		if(right && !right.visited){
			neighbours.push(right);
		}
		if(bottom && !bottom.visited){
			neighbours.push(bottom);
		}
		if(left && !left.visited){
			neighbours.push(left);
		}

		if(neighbours.length > 0){
			return neighbours[floor(random(0, neighbours.length))]
		} else {
			return undefined;
		}
	}

	this.show = function() {
		var x = this.i * w;
		var y = this.j * w;

		stroke(255);

		if(this.walls[0])
			line(x,		y,		x+w,	y);
		if(this.walls[1])
			line(x+w,	y,		x+w,	y+w);
		if(this.walls[2])
			line(x+w,	y+w,	x,		y+w);
		if(this.walls[3])
			line(x,		y+w,	x,		y);


		if(this.visited){
			noStroke();
			fill(255,0,255,100);
			rect(x,y,w,w);
		}
		

	}

	this.showDone = function(){
		var x = this.i*w;
		var y = this.j*w;

		noStroke();
		fill(0,255,0,100);
		rect(x,y,w,w);
	}
}


function index(i, j){

	if(i < 0 || j < 0 || i > cols-1 || j > rows-1){
		return -1;
	}
	return i + j * cols;
}


function removeWalls(a, b){
	var x = a.i - b.i;
	if(x === 1){
		a.walls[3] = false;
		b.walls[1] = false;
	} else if (x === -1){
		a.walls[1] = false;
		b.walls[3] = false;
	}	


	var y = a.j - b.j;
	if(y === 1){
		a.walls[0] = false;
		b.walls[2] = false;

	} else if(y === -1){
		a.walls[2] = false;
		b.walls[0] = false;
	}


}


function showAllNeighbours(c){
		var neighbours = [];

		var i = c.i;
		var j = c.j;

		var top = grid[index(i, j-1)];
		var right = grid[index(i+1,j)]
		var bottom = grid[index(i, j+1)];
		var left = grid[index(i-1, j)];

		if(top && !top.visited){
			top.show();
		}
		if(right && !right.visited){
			right.show();
		}
		if(bottom && !bottom.visited){
			bottom.show();
		}
		if(left && !left.visited){
			left.show();;
		}
}