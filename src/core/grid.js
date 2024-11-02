import { Node } from './node.js';
export class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.startNode = null;
        this.endNode = null;
        this.initializeGrid();
    }

    initializeGrid() {
        for (let row = 0; row < this.rows; row++) {
            const currentRow = [];
            for (let col = 0; col < this.cols; col++) {
                currentRow.push(new Node(row, col));
            }
            this.grid.push(currentRow);
        }
    }

    getNode(row, col) {
        return this.grid[row][col];
    }

    setStartNode(row, col) {
        if (this.startNode) {
            this.startNode.isStart = false;
        }
        this.startNode = this.grid[row][col];
        this.startNode.isStart = true;
    }

    setEndNode(row, col) {
        if (this.endNode) {
            this.endNode.isEnd = false;
        }
        this.endNode = this.grid[row][col];
        this.endNode.isEnd = true;
    }

    resetGrid() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.grid[row][col].reset();
            }
        }
    }

    resetWalls() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.grid[row][col].resetWalls();
            }
        }
    }

    getNeighbors(node) {
        const neighbors = [];
        const { row, col } = node;

        if (row > 0) neighbors.push(this.grid[row - 1][col]);
        if (row < this.rows - 1) neighbors.push(this.grid[row + 1][col]);
        if (col > 0) neighbors.push(this.grid[row][col - 1]);
        if (col < this.cols - 1) neighbors.push(this.grid[row][col + 1]);

        return neighbors.filter(neighbor => !neighbor.isWall);
    }
}
