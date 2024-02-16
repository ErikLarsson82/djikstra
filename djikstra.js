const obstacles = ['#','=']

const north = {x:0,y:-1}
const south = {x:0,y:+1}
const east = {x:1,y:0}
const west = {x:-1,y:0}
const apply = (a, b) => ({x: a.x+b.x, y: a.y+b.y })

function printMap(map) {
	let str = ""
	map.forEach(x=>{
		str += x.map(x=>{
			if (x > 9) return "^"
			return x===-1?'.':x
		}).join("")
		str += "\n"
	})
	console.log(str)
}


function isInsideMap(input, row, col) {
	if (input[row] === undefined) return false
	if (input[row][col] === undefined) return false
	return true
}


function forAllSpots(arr, func) {
	arr.forEach((a, row) => {
		a.forEach((b, col) => func(row, col))
	})
}

function clone(map) {
	return map.map(x=>[...x])
}


function parse(str) {
	return str.trim()
		.split("\n")
		.map(x=>{
			return x.split("")
		})
}

const pipe = (funcA,funcB) => data => funcB(funcA(data))
const propFrom = ({from}) => from
const sameAs = a => b => same(a,b)
const same = (a,b) => a.x === b.x && a.y === b.y
function byCost(a, b) { return a.cost > b.cost ? 1 : -1 }
function byVisited(a, b) {
	if (a.visited === b.visited) return 0
	if (a.visited === true && b.visited === false) return 1
	if (a.visited === false && b.visited === true) return -1
}

function djikstra({nodes: _nodes, edges}, from, to) {
	let record = -1
	let queue = []

	let nodes = [..._nodes].map(n => ({ x: n.x, y: n.y, visited: false, cost: Infinity }))

	const startNode = nodes.find(sameAs(from))
	startNode.cost = 0

	let pathsLeft = true

	while(pathsLeft) {
		nodes = nodes.sort(byCost).sort(byVisited)
		let node = nodes[0]

		if (same(node, to)) {
			record = node.cost
		}
		if (nodes[0].visited === true) {
			pathsLeft = false
			continue;
		}
		nodes[0].visited = true

		const applicableEdges = edges.filter(pipe(propFrom, sameAs(node)))
									.filter(({to, cost}) => nodes.find(sameAs(to)).cost === Infinity || nodes.find(sameAs(to)).cost > nodes[0].cost + cost)
		applicableEdges.forEach(edge => {
			const nodeIndex = nodes.findIndex(n => same(n, edge.to))
			nodes[nodeIndex].cost = nodes[0].cost + edge.cost
		})
	}

	return {
		record,
		visited: nodes.filter(x=>x.visited === true && !isNaN(x.cost) && x.cost !== Infinity)
	}
}

function generateFromMap(map) {
	
	const nodes = createNodes(map)
	console.log('nodes created')
	const edges = createEdges(map, nodes)
	console.log('edges created')

	return { nodes, edges }
}

function getCost(map, row, col) {
	return obstacles.includes(map[row][col]) ? Infinity : parseInt(map[row][col])
}

function createNodes(map) {
	const nodes = []

	//let idx = 0
	forAllSpots(map, (row, col) => {
		//idx++
		//console.log('hmm', idx, map.length * map[0].length)
		const cost = getCost(map, row, col)
		nodes.push({x:col,y:row,cost})
	})

	return nodes
}

function createEdges(map, nodes) {
	const edges = []

	//let c = 0
	const createEdge = node => {
		if (obstacles.includes(map[node.y][node.x])) return
		//c++
		//console.log('wat', c)
		const { direction } = node
		const stepDirection = cardinal => {
			const target = { direction, ...apply(node, cardinal) }
			if (!isInsideMap(map, target.y, target.x)) return
			if (obstacles.includes(map[target.y][target.x])) return
			const cost = getCost(map, target.y, target.x) // parseInt(map[target.y][target.x])
			edges.push(({from: node, to: nodes.find(sameAs(target)), cost: cost }))
		};
		[north,south,east,west].forEach(stepDirection);
	}

	forAllSpots(map, (row, col) => {
		createEdge(nodes.find(sameAs({x:col,y:row})))
	})
	return edges
}

module.exports = { djikstra, generateFromMap }


