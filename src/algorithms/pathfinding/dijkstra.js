export class Dijkstra {
    constructor(grid, startNode, endNode, animator) {
        this.grid = grid;
        this.startNode = startNode;
        this.endNode = endNode;
        this.animator = animator;
    }

    async execute() {
        const nodes = [];
        this.startNode.distance = 0;
        const unvisitedNodes = this.getAllNodes();
        
        while (unvisitedNodes.length) {
            this.sortNodesByDistance(unvisitedNodes);
            const closestNode = unvisitedNodes.shift();
            
            if (closestNode.isWall) continue;
            if (closestNode.distance === Infinity) return nodes;
            
            closestNode.isVisited = true;
            nodes.push(closestNode);
            await this.animator.animateVisitedNode(closestNode);
            
            if (closestNode === this.endNode) return nodes;
            
            this.updateUnvisitedNeighbors(closestNode);
        }
        return nodes;
    }

    sortNodesByDistance(unvisitedNodes) {
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    }

    updateUnvisitedNeighbors(node) {
        const neighbors = this.getNeighbors(node);
        for (const neighbor of neighbors) {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
        }
    }

    getNeighbors(node) {
        const neighbors = [];
        const {row, col} = node;
        
        if (row > 0) neighbors.push(this.grid[row - 1][col]);
        if (row < this.grid.length - 1) neighbors.push(this.grid[row + 1][col]);
        if (col > 0) neighbors.push(this.grid[row][col - 1]);
        if (col < this.grid[0].length - 1) neighbors.push(this.grid[row][col + 1]);
        
        return neighbors.filter(neighbor => !neighbor.isVisited);
    }

    getAllNodes() {
        const nodes = [];
        for (const row of this.grid) {
            for (const node of row) {
                nodes.push(node);
            }
        }
        return nodes;
    }

    getPath() {
        const path = [];
        let currentNode = this.endNode;
        while (currentNode !== null) {
            path.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
        return path;
    }
}
