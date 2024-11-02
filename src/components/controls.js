export class Controls {
    constructor(grid) {
        this.grid = grid;
        this.isMousePressed = false;
        this.startNodePos = null;
        this.endNodePos = null;
        this.isDraggingStart = false;
        this.isDraggingEnd = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('mousedown', () => {
            this.isMousePressed = true;
        });

        document.addEventListener('mouseup', () => {
            this.isMousePressed = false;
            this.isDraggingStart = false;
            this.isDraggingEnd = false;
        });
    }

    handleNodeClick(node, element) {
        if (this.isDraggingStart) {
            this.updateStartNode(node);
        } else if (this.isDraggingEnd) {
            this.updateEndNode(node);
        } else if (!node.isStart && !node.isEnd) {
            node.isWall = !node.isWall;
            element.classList.toggle('wall');
        }
    }

    handleNodeMouseDown(node, element) {
        if (node.isStart) {
            this.isDraggingStart = true;
        } else if (node.isEnd) {
            this.isDraggingEnd = true;
        } else {
            this.handleNodeClick(node, element);
        }
    }

    handleNodeMouseEnter(node, element) {
        if (this.isMousePressed) {
            this.handleNodeClick(node, element);
        }
    }

    updateStartNode(newStartNode) {
        if (this.startNodePos) {
            const oldStartNode = this.grid[this.startNodePos.row][this.startNodePos.col];
            oldStartNode.isStart = false;
            document.getElementById(`node-${oldStartNode.row}-${oldStartNode.col}`)
                .classList.remove('start');
        }
        newStartNode.isStart = true;
        document.getElementById(`node-${newStartNode.row}-${newStartNode.col}`)
            .classList.add('start');
        this.startNodePos = { row: newStartNode.row, col: newStartNode.col };
    }

    updateEndNode(newEndNode) {
        if (this.endNodePos) {
            const oldEndNode = this.grid[this.endNodePos.row][this.endNodePos.col];
            oldEndNode.isEnd = false;
            document.getElementById(`node-${oldEndNode.row}-${oldEndNode.col}`)
                .classList.remove('end');
        }
        newEndNode.isEnd = true;
        document.getElementById(`node-${newEndNode.row}-${newEndNode.col}`)
            .classList.add('end');
        this.endNodePos = { row: newEndNode.row, col: newEndNode.col };
    }
}

