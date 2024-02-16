const { djikstra, generateFromMap } = require('./djikstra')

describe("Node and Edge generation", () => {
	test("From the simplest simple map", () => {
		const mapStr = `
12
34
		`.trim()

		const nodes = [
			{x:0,y:0,cost:1}, // 0
			{x:1,y:0,cost:2}, // 1
			{x:0,y:1,cost:3}, // 2
			{x:1,y:1,cost:4}, // 3
		]
		const edges = [
			{ from: nodes[0], to: nodes[2], cost: 3 },
			{ from: nodes[0], to: nodes[1], cost: 2 },
			{ from: nodes[1], to: nodes[3], cost: 4 },
			{ from: nodes[1], to: nodes[0], cost: 1 },
			{ from: nodes[2], to: nodes[0], cost: 1 },
			{ from: nodes[2], to: nodes[3], cost: 4 },
			{ from: nodes[3], to: nodes[1], cost: 2 },
			{ from: nodes[3], to: nodes[2], cost: 3 },
		]
		expect(generateFromMap(mapStr).nodes).toStrictEqual(nodes)
		expect(generateFromMap(mapStr).edges).toStrictEqual(edges)
	})
	test("From a simple map", () => {
		const mapStr = `
11#
#1#
#11
		`.trim()

		const nodes = [
	      { x: 0, y: 0, cost: 1 },
	      { x: 1, y: 0, cost: 1 },
	      { x: 2, y: 0, cost: Infinity },
	      { x: 0, y: 1, cost: Infinity },
	      { x: 1, y: 1, cost: 1 },
	      { x: 2, y: 1, cost: Infinity },
	      { x: 0, y: 2, cost: Infinity },
	      { x: 1, y: 2, cost: 1 },
	      { x: 2, y: 2, cost: 1 }
	    ]

	    const edges = [
	      {
	        from: { x: 0, y: 0, cost: 1 },
	        to: { x: 0, y: 1, cost: Infinity },
	        cost: Infinity
	      },
	      {
	        from: { x: 0, y: 0, cost: 1 },
	        to: { x: 1, y: 0, cost: 1 },
	        cost: 1
	      },
	      {
	        from: { x: 1, y: 0, cost: 1 },
	        to: { x: 1, y: 1, cost: 1 },
	        cost: 1
	      },
	      {
	        from: { x: 1, y: 0, cost: 1 },
	        to: { x: 2, y: 0, cost: Infinity },
	        cost: Infinity
	      },
	      {
	        from: { x: 1, y: 0, cost: 1 },
	        to: { x: 0, y: 0, cost: 1 },
	        cost: 1
	      },
	      {
	        from: { x: 2, y: 0, cost: Infinity },
	        to: { x: 2, y: 1, cost: Infinity },
	        cost: Infinity
	      },
	      {
	        from: { x: 2, y: 0, cost: Infinity },
	        to: { x: 1, y: 0, cost: 1 },
	        cost: 1
	      },
	      {
	        from: { x: 0, y: 1, cost: Infinity },
	        to: { x: 0, y: 0, cost: 1 },
	        cost: 1
	      },
	      {
	        from: { x: 0, y: 1, cost: Infinity },
	        to: { x: 0, y: 2, cost: Infinity },
	        cost: Infinity
	      },
	      {
	        from: { x: 0, y: 1, cost: Infinity },
	        to: { x: 1, y: 1, cost: 1 },
	        cost: 1
	      },
	      {
	        from: { x: 1, y: 1, cost: 1 },
	        to: { x: 1, y: 0, cost: 1 },
	        cost: 1
	      },
	      {
	        from: { x: 1, y: 1, cost: 1 },
	        to: { x: 1, y: 2, cost: 1 },
	        cost: 1
	      },
	      {
	        from: { x: 1, y: 1, cost: 1 },
	        to: { x: 2, y: 1, cost: Infinity },
	        cost: Infinity
	      },
	      {
	        from: { x: 1, y: 1, cost: 1 },
	        to: { x: 0, y: 1, cost: Infinity },
	        cost: Infinity
	      },
	      {
	        from: { x: 2, y: 1, cost: Infinity },
	        to: { x: 2, y: 0, cost: Infinity },
	        cost: Infinity
	      },
	      {
	        from: { x: 2, y: 1, cost: Infinity },
	        to: { x: 2, y: 2, cost: 1 },
	        cost: 1
	      },
	      {
	        from: { x: 2, y: 1, cost: Infinity },
	        to: { x: 1, y: 1, cost: 1 },
	        cost: 1
	      },
	      {
	        from: { x: 0, y: 2, cost: Infinity },
	        to: { x: 0, y: 1, cost: Infinity },
	        cost: Infinity
	      },
	      {
	        from: { x: 0, y: 2, cost: Infinity },
	        to: { x: 1, y: 2, cost: 1 },
	        cost: 1
	      },
	      {
	        from: { x: 1, y: 2, cost: 1 },
	        to: { x: 1, y: 1, cost: 1 },
	        cost: 1
	      },
	      {
	        from: { x: 1, y: 2, cost: 1 },
	        to: { x: 2, y: 2, cost: 1 },
	        cost: 1
	      },
	      {
	        from: { x: 1, y: 2, cost: 1 },
	        to: { x: 0, y: 2, cost: Infinity },
	        cost: Infinity
	      },
	      {
	        from: { x: 2, y: 2, cost: 1 },
	        to: { x: 2, y: 1, cost: Infinity },
	        cost: Infinity
	      },
	      {
	        from: { x: 2, y: 2, cost: 1 },
	        to: { x: 1, y: 2, cost: 1 },
	        cost: 1
	      }
	    ]

	    expect(generateFromMap(mapStr).nodes).toStrictEqual(nodes)
		expect(generateFromMap(mapStr).edges).toStrictEqual(edges)
	})
})

describe("Djikstra", () => {
	test("Simple one edge path", () => {
		const nodes = [
			{x:0,y:0},
			{x:1,y:0}
		]
		let edges = [
			{from: {x:0,y:0}, to: {x:1,y:0}, cost: 3}
		]
		expect(djikstra({nodes,edges},{x:0,y:0},{x:1,y:0})).toBe(3)
	})
	test("Simple map", () => {
		const mapStr = `
11#
#1#
#11
		`.trim()

		const map = generateFromMap(mapStr)
		const shortestPath = djikstra(map,{x:0,y:0},{x:2,y:2})
		expect(shortestPath).toBe(4)
	})
	test("Unsolvable map", () => {
		const mapStr = `
11#
###
#11
		`.trim()

		const map = generateFromMap(mapStr)
		const shortestPath = djikstra(map,{x:0,y:0},{x:2,y:2})
		expect(shortestPath).toBe(Infinity)
	})
	test("Dig site replica", () => {
		const mapStr = `
#######
#11111#
###111#
11#111#
11#111#
###1###
#111#11
##11###
1#1111#
1######
		`.trim()

		const map = generateFromMap(mapStr)
		const shortestPathA = djikstra(map,{x:4,y:2},{x:0,y:8})
		expect(shortestPathA).toBe(Infinity)
		const shortestPathB = djikstra(map,{x:1,y:1},{x:5,y:6})
		expect(shortestPathB).toBe(Infinity)
		const shortestPathC = djikstra(map,{x:1,y:1},{x:5,y:8})
		expect(shortestPathC).toBe(11)
	})
})
