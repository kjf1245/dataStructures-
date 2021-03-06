function Dictionary(){

	var items = {};
	
	this.has = function(key){
		return key in items;
	};

	this.set = function(key, value){
		items[key] = value;
	};

	this.remove = function(key){
		if (this.has(key)){
			delete items[key];
			return true;
		}
	};

	this.get = function(key){
		return this.has(key) ? items[key] : undefined;
	};

	this.values = function() {
		var values = [];
		for (var k in items){
			if (this.has(k)){
				values.push(items[k]);
			}
		}
		return values;
	};

	this.getItems = function(){
		return items;
	};
}

//Queue Class
function Queue(){

	var items = [];

	this.enqueue = function(element){
		items.push(element);
	};

	this.dequeue = function(){
		return items.shift();
	};

	this.front = function(){
		return items[0];
	};

	this.isEmpty = function(){
		return items.length == 0;
	};

	this.size = function(){
		return items.length;
	};

	this.print = function(){
		console.log(items.toString());
	};
}

function Graph(){

	var vertices = [];
	var adjList = new Dictionary();

	function initializeColor(){
		var color = [];

		for(var i = 0; i < vertices.length; i++){
			color[vertices[i]] = 'white';
		}

		return color;
	}

	this.addVertex = function(v){
		vertices.push(v);
		adjList.set(v,[]);
	};

	this.addEdge = function(v, w){
		adjList.get(v).push(w);
		adjList.get(w).push(v);
	};

	this.toString = function(){
		var s = '';
		for(var i = 0; i < vertices.length; i++){
			s += vertices[i] + ' ->';
			var neighbors = adjList.get(vertices[i]);
			for(var j = 0; j < neighbors.length; j++){
				s += neighbors[j] + ' ';
			}
			s += '\n';
		}
		return s;
	};

	//BFS that finds the shortest path
	this.bfs = function(v, callback){
		var color = initializeColor(), 
			queue = new Queue();

		queue.enqueue(v);

		while(!queue.isEmpty()){
			var u = queue.dequeue(),
				neighbors = adjList.get(u);

			color[u] = 'grey';
			for(var i = 0; i < neighbors.length; i++){
				var w = neighbors[i];
				if(color[w] === 'white'){
					color[w] = 'grey';
					queue.enqueue(w);
				}
			}
			color[u] = 'black';

			if(callback){
				callback(u);
			}
		}
};

function printNode(value){
	console.log('Visited vertex: ' + value);
}

//test
var graph = new Graph();

var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
 'I'];

for(var i = 0; i < myVertices.length; i++){
	graph.addVertex(myVertices[i]);
}

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');





