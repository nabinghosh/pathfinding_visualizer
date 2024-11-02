import { NODE_TYPES } from './constants.js';

export class EventHandlers {
    constructor(visualizer) {
        this.visualizer = visualizer;
        this.isMousePressed = false;
        this.isStartNodeDragging = false;
        this.isEndNodeDragging = false;
        this.currentAlgorithm = 'dijkstra';
        this.currentSpeed = 'normal';
        this.isVisualizing = false;
    }

    initializeEventListeners() {
        // Mouse events for the document
        document.addEventListener('mousedown', () => this.isMousePressed = true);
        document.addEventListener('mouseup', () => this.handleMouseUp());
        document.addEventListener('mouseleave', () => this.handleMouseUp());

        // Button event listeners
        this.initializeButtonListeners();

        // Dropdown event listeners
        this.initializeDropdownListeners();

        // Keyboard shortcuts
        this.initializeKeyboardShortcuts();
    }

    initializeButtonListeners() {
        const visualizeBtn = document.getElementById('visualize-btn');
        const clearBoardBtn = document.getElementById('clear-btn');
        const clearPathBtn = document.getElementById('clear-path-btn');
        const generateMazeBtn = document.getElementById('generate-maze-btn');

        visualizeBtn?.addEventListener('click', () => this.handleVisualize());
        clearBoardBtn?.addEventListener('click', () => this.handleClearBoard());
        clearPathBtn?.addEventListener('click', () => this.handleClearPath());
        generateMazeBtn?.addEventListener('click', () => this.handleGenerateMaze());
    }

    initializeDropdownListeners() {
        const algorithmSelect = document.getElementById('algorithms-list');
        const speedSelect = document.getElementById('speed-list');
        const mazeSelect = document.getElementById('maze-list');

        algorithmSelect?.addEventListener('change', (e) => {
            this.currentAlgorithm = e.target.value;
            this.updateVisualizeButtonText();
        });

        speedSelect?.addEventListener('change', (e) => {
            this.currentSpeed = e.target.value;
            this.visualizer.setVisualizationSpeed(e.target.value);
        });

        mazeSelect?.addEventListener('change', (e) => {
            this.currentMazePattern = e.target.value;
        });
    }

    initializeKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (this.isVisualizing) return;

            switch (e.key.toLowerCase()) {
                case 'v':
                    if (e.ctrlKey || e.metaKey) return; // Don't interfere with browser shortcuts
                    this.handleVisualize();
                    break;
                case 'c':
                    if (e.ctrlKey || e.metaKey) return;
                    this.handleClearBoard();
                    break;
                case 'p':
                    if (e.ctrlKey || e.metaKey) return;
                    this.handleClearPath();
                    break;
                case 'm':
                    if (e.ctrlKey || e.metaKey) return;
                    this.handleGenerateMaze();
                    break;
                case ' ':
                    e.preventDefault();
                    this.handleVisualize();
                    break;
            }
        });
    }

    handleNodeMouseDown(node, element) {
        if (this.isVisualizing) return;

        if (node.isStart) {
            this.isStartNodeDragging = true;
        } else if (node.isEnd) {
            this.isEndNodeDragging = true;
        } else {
            this.toggleWall(node, element);
        }
    }

    handleNodeMouseEnter(node, element) {
        if (!this.isMousePressed || this.isVisualizing) return;

        if (this.isStartNodeDragging) {
            this.moveStartNode(node, element);
        } else if (this.isEndNodeDragging) {
            this.moveEndNode(node, element);
        } else {
            this.toggleWall(node, element);
        }
    }

    handleNodeMouseUp() {
        this.isMousePressed = false;
        this.isStartNodeDragging = false;
        this.isEndNodeDragging = false;
    }

    toggleWall(node, element) {
        if (node.isStart || node.isEnd) return;

        node.isWall = !node.isWall;
        element.classList.toggle(NODE_TYPES.WALL);
    }

    moveStartNode(newNode, element) {
        if (newNode.isEnd || newNode.isWall) return;

        // Remove start node status from old position
        const oldStartNode = this.visualizer.getStartNode();
        if (oldStartNode) {
            oldStartNode.isStart = false;
            const oldElement = document.getElementById(`node-${oldStartNode.row}-${oldStartNode.col}`);
            oldElement?.classList.remove(NODE_TYPES.START);
        }

        // Set new start node
        newNode.isStart = true;
        element.classList.add(NODE_TYPES.START);
        this.visualizer.setStartNode(newNode);
    }

    moveEndNode(newNode, element) {
        if (newNode.isStart || newNode.isWall) return;

        // Remove end node status from old position
        const oldEndNode = this.visualizer.getEndNode();
        if (oldEndNode) {
            oldEndNode.isEnd = false;
            const oldElement = document.getElementById(`node-${oldEndNode.row}-${oldEndNode.col}`);
            oldElement?.classList.remove(NODE_TYPES.END);
        }

        // Set new end node
        newNode.isEnd = true;
        element.classList.add(NODE_TYPES.END);
        this.visualizer.setEndNode(newNode);
    }

    async handleVisualize() {
        if (this.isVisualizing) return;

        this.isVisualizing = true;
        this.disableUserInteraction();
        
        try {
            await this.visualizer.visualizeAlgorithm(this.currentAlgorithm);
        } catch (error) {
            console.error('Visualization error:', error);
            // Handle error (show user feedback if needed)
        } finally {
            this.isVisualizing = false;
            this.enableUserInteraction();
        }
    }

    handleClearBoard() {
        if (this.isVisualizing) return;
        this.visualizer.clearBoard();
        this.updateVisualizeButtonText();
    }

    handleClearPath() {
        if (this.isVisualizing) return;
        this.visualizer.clearPath();
    }

    async handleGenerateMaze() {
        if (this.isVisualizing) return;

        this.isVisualizing = true;
        this.disableUserInteraction();

        try {
            await this.visualizer.generateMaze(this.currentMazePattern);
        } catch (error) {
            console.error('Maze generation error:', error);
            // Handle error (show user feedback if needed)
        } finally {
            this.isVisualizing = false;
            this.enableUserInteraction();
        }
    }

    disableUserInteraction() {
        const buttons = document.querySelectorAll('button');
        const selects = document.querySelectorAll('select');

        buttons.forEach(button => button.disabled = true);
        selects.forEach(select => select.disabled = true);

        document.getElementById('visualize-btn').textContent = 'Visualizing...';
    }

    enableUserInteraction() {
        const buttons = document.querySelectorAll('button');
        const selects = document.querySelectorAll('select');

        buttons.forEach(button => button.disabled = false);
        selects.forEach(select => select.disabled = false);

        this.updateVisualizeButtonText();
    }

    updateVisualizeButtonText() {
        const visualizeBtn = document.getElementById('visualize-btn');
        if (visualizeBtn) {
            const algorithmName = this.currentAlgorithm.charAt(0).toUpperCase() + 
                                this.currentAlgorithm.slice(1);
            visualizeBtn.textContent = `Visualize ${algorithmName}`;
        }
    }

    // Helper method to add event listeners to a node element
    addNodeEventListeners(node, element) {
        element.addEventListener('mousedown', () => this.handleNodeMouseDown(node, element));
        element.addEventListener('mouseenter', () => this.handleNodeMouseEnter(node, element));
        element.addEventListener('mouseup', () => this.handleNodeMouseUp());
    }

    // Method to remove all event listeners (useful for cleanup)
    removeAllEventListeners() {
        document.removeEventListener('mousedown', () => this.isMousePressed = true);
        document.removeEventListener('mouseup', () => this.handleMouseUp());
        document.removeEventListener('mouseleave', () => this.handleMouseUp());
        
        // Remove keyboard listeners
        document.removeEventListener('keydown', this.handleKeyDown);
        
        // Could add more specific cleanup if needed
    }

    // Method to handle window resize events
    handleWindowResize() {
        // Implement responsive behavior if needed
        // For example, adjust grid size based on window size
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Update grid dimensions based on window size
        this.visualizer.updateGridDimensions(width, height);
    }

    // Method to handle touch events for mobile support
    initializeTouchEvents() {
        let lastTouchedNode = null;

        document.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.isMousePressed = true;
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (element?.classList.contains('node')) {
                const node = this.visualizer.getNodeFromElement(element);
                if (node) {
                    lastTouchedNode = node;
                    this.handleNodeMouseDown(node, element);
                }
            }
        });

        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (element?.classList.contains('node')) {
                const node = this.visualizer.getNodeFromElement(element);
                if (node && node !== lastTouchedNode) {
                    lastTouchedNode = node;
                    this.handleNodeMouseEnter(node, element);
                }
            }
        });

        document.addEventListener('touchend', () => {
            this.handleMouseUp();
            lastTouchedNode = null;
        });
    }
}
