export class Node {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isStart = false;
        this.isEnd = false;
        this.isWall = false;
        this.isVisited = false;
        this.distance = Infinity;
        this.previousNode = null;
        this.fScore = Infinity; // for A* algorithm
        this.gScore = Infinity; // for A* algorithm
        this.hScore = 0; // for A* algorithm
    }

    reset() {
        this.isVisited = false;
        this.distance = Infinity;
        this.previousNode = null;
        this.fScore = Infinity;
        this.gScore = Infinity;
        this.hScore = 0;
    }

    resetWalls() {
        this.isWall = false;
    }

    toggleWall() {
        if (!this.isStart && !this.isEnd) {
            this.isWall = !this.isWall;
        }
    }
}
