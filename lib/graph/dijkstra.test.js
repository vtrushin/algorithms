import dijkstra from './dijkstra';

describe('Graph 1', () => {
	const graph = {
		A: { B: 7, C: 2 },
		B: { A: 7, D: 3, E: 2 },
		C: { A: 2, D: 3, E: 10 },
		D: { B: 1.5, C: 6, F: 8 },
		E: { B: 4, C: 10, F: 4 },
		F: { D: 8, E: 4 },
		G: { C: 1000 }
	};

	it('Short path', () => {
		expect(
			dijkstra(graph, 'A', 'D')
		).toEqual(
			['A', 'C', 'D']
		)
	});

	it('Unreachable vertex', () => {
		expect(
			dijkstra(graph, 'A', 'G')
		).toEqual(
			[]
		)
	});

	it('Incorrect vertex', () => {
		expect(() => {
			dijkstra(graph, 'A', 'INCORRECT')
		}).toThrowErrorMatchingSnapshot()
	});
});
