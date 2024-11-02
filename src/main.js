import { Dijkstra } from "./algorithms/pathfinding/dijkstra.js";
// import { AStar } from './algorithms/pathfinding/astar.js';
// import { BFS } from './algorithms/pathfinding/bfs.js';
// import { DFS } from './algorithms/pathfinding/dfs.js';
import { RandomMaze } from "./algorithms/maze/randomMaze.js";
import { Sidebar } from "./components/sidebar.js";
import { Toolbar } from "./components/toolbar.js";
import { Controls } from "./components/controls.js";
import { Animator } from "./core/animator.js";

class PathfindingVisualizer {
  constructor() {
    try {
      console.log("Initializing PathfindingVisualizer");
      this.rows = 20;
      this.cols = 50;
      this.grid = [];
      this.animator = new Animator();
      this.initializeGrid();
      this.setupComponents();
    } catch (error) {
      console.error("Failed to initialize visualizer:", error);
      // Maybe show user-friendly error message
    }
  }

  initializeGrid() {
    const gridContainer = document.getElementById("grid");
    gridContainer.style.gridTemplateColumns = `repeat(${this.cols}, 25px)`;

    for (let row = 0; row < this.rows; row++) {
      const currentRow = [];
      for (let col = 0; col < this.cols; col++) {
        const node = this.createNode(row, col);
        currentRow.push(node);
        const element = this.createNodeElement(node);
        gridContainer.appendChild(element);
      }
      this.grid.push(currentRow);
    }

    // Set initial start and end nodes
    const startNode =
      this.grid[Math.floor(this.rows / 2)][Math.floor(this.cols / 4)];
    const endNode =
      this.grid[Math.floor(this.rows / 2)][Math.floor((3 * this.cols) / 4)];

    this.controls.updateStartNode(startNode);
    this.controls.updateEndNode(endNode);
  }

  createNode(row, col) {
    return {
      row,
      col,
      isStart: false,
      isEnd: false,
      isWall: false,
      isVisited: false,
      distance: Infinity,
      previousNode: null,
    };
  }

  createNodeElement(node) {
    const element = document.createElement("div");
    element.id = `node-${node.row}-${node.col}`;
    element.className = "node";

    element.addEventListener("mousedown", () =>
      this.controls.handleNodeMouseDown(node, element)
    );
    element.addEventListener("mouseenter", () =>
      this.controls.handleNodeMouseEnter(node, element)
    );

    return element;
  }

  setupComponents() {
    this.controls = new Controls(this.grid);
    this.sidebar = new Sidebar(
      this.handleAlgorithmChange.bind(this),
      this.handleMazeChange.bind(this),
      this.handleSpeedChange.bind(this)
    );
    this.toolbar = new Toolbar(
      this.visualize.bind(this),
      this.clearBoard.bind(this),
      this.clearPath.bind(this)
    );
  }

  async visualize() {
    this.clearPath();
    this.toolbar.disable();
    this.sidebar.disable();

    const startNode =
      this.grid[this.controls.startNodePos.row][this.controls.startNodePos.col];
    const endNode =
      this.grid[this.controls.endNodePos.row][this.controls.endNodePos.col];

    let algorithm;
    switch (this.currentAlgorithm) {
      case "astar":
        algorithm = new AStar(this.grid, startNode, endNode, this.animator);
        break;
      case "bfs":
        algorithm = new BFS(this.grid, startNode, endNode, this.animator);
        break;
      case "dfs":
        algorithm = new DFS(this.grid, startNode, endNode, this.animator);
        break;
      default:
        algorithm = new Dijkstra(this.grid, startNode, endNode, this.animator);
    }

    try {
      await algorithm.execute();
      const path = algorithm.getPath();
      await this.animator.animatePath(path);
    } catch (error) {
      console.error("Visualization failed:", error);
    } finally {
      this.toolbar.enable();
      this.sidebar.enable();
    }
  }

  clearBoard() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const node = this.grid[row][col];
        const element = document.getElementById(`node-${row}-${col}`);

        node.isWall = false;
        node.isVisited = false;
        node.distance = Infinity;
        node.previousNode = null;

        element.className = "node";
        if (node.isStart) element.classList.add("start");
        if (node.isEnd) element.classList.add("end");
      }
    }
  }

  clearPath() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const node = this.grid[row][col];
        const element = document.getElementById(`node-${row}-${col}`);

        node.isVisited = false;
        node.distance = Infinity;
        node.previousNode = null;

        element.classList.remove("visited", "path");
      }
    }
  }

  handleAlgorithmChange(algorithm) {
    this.currentAlgorithm = algorithm;
    this.toolbar.setVisualizeBtnText(`Visualize ${algorithm}`);
  }

  async handleMazeChange(pattern) {
    try {
      this.clearBoard();
      const maze = new RandomMaze(this.grid, this.animator);
      await maze.generate();
    } catch (error) {
      console.error("Maze generation failed:", error);
      this.clearBoard(); // Reset to clean state
    }
  }

  handleSpeedChange(speed) {
    this.animator.setSpeed(speed);
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  new PathfindingVisualizer();
});
// main.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Main.js loaded");

  // Test button functionality
  document.getElementById("visualize-btn").addEventListener("click", () => {
    console.log("Visualize button clicked");
  });

  // Test dropdown functionality
  document.getElementById("algorithms-list").addEventListener("change", (e) => {
    console.log("Algorithm selected:", e.target.value);
  });

  // Test if grid container exists
  const grid = document.getElementById("grid");
  console.log("Grid container found:", !!grid);
});
window.addEventListener("load", function () {
  const elements = ["grid", "sidebar", "toolbar"];
  elements.forEach((id) => {
    const element = document.getElementById(id);
    const styles = window.getComputedStyle(element);
    console.log(`${id} styles:`, {
      display: styles.display,
      width: styles.width,
      height: styles.height,
    });
  });
});
