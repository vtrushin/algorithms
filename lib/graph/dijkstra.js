export default (graph, start, end) => {
	[start, end].forEach(vertex => {
		if (!graph[vertex]) {
			throw new Error(`Incorrect vertex name: "${vertex}". Must be one of "${Object.keys(graph).join(', ')}"`);
		}
	});

	const distances = {};
	const unvisited = new Set();
	const measuredUnvisited = new Set();
	const transitions = {};

	distances[start] = 0;
	measuredUnvisited.add(start);

	Object.keys(graph).forEach(vertex => {
		if (vertex !== start) {
			distances[vertex] = Infinity;
			unvisited.add(vertex);
		}
	});

	while (unvisited.size) {
		let selected;

		let minVertexDistance = Infinity;
		for (const vertex of measuredUnvisited) {
			if (distances[vertex] < minVertexDistance) {
				minVertexDistance = distances[vertex];
				selected = vertex;
			}
		}

		if (!selected || selected === end) {
			break;
		}

		unvisited.delete(selected);
		measuredUnvisited.delete(selected);

		const neighbors = graph[selected];

		for (const neighbor in neighbors) {
			if (neighbors.hasOwnProperty(neighbor)) {
				const distanceToNeighbor = neighbors[neighbor];

				if (!unvisited.has(neighbor)) {
					continue;
				}

				const newVertexDistance = distances[selected] + distanceToNeighbor;

				if (newVertexDistance < distances[neighbor]) {
					distances[neighbor] = newVertexDistance;
					transitions[neighbor] = selected;
					measuredUnvisited.add(neighbor);
				}
			}
		}
	}

	const path = [];

	let from = transitions[end];

	if (from) {
		path.push(end);
	}

	while (from) {
		path.push(from);

		if (from !== start) {
			from = transitions[from];
		} else {
			break;
		}
	}

	path.reverse();

	return path;
};
