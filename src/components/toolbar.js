export class Toolbar {
    constructor(onVisualize, onClearBoard, onClearPath) {
        this.visualizeBtn = document.getElementById('visualize-btn');
        this.clearBoardBtn = document.getElementById('clear-btn');
        this.clearPathBtn = document.getElementById('clear-path-btn');

        this.visualizeBtn.addEventListener('click', onVisualize);
        this.clearBoardBtn.addEventListener('click', onClearBoard);
        this.clearPathBtn.addEventListener('click', onClearPath);
    }

    setVisualizeBtnText(text) {
        this.visualizeBtn.textContent = text;
    }

    disable() {
        this.visualizeBtn.disabled = true;
        this.clearBoardBtn.disabled = true;
        this.clearPathBtn.disabled = true;
    }

    enable() {
        this.visualizeBtn.disabled = false;
        this.clearBoardBtn.disabled = false;
        this.clearPathBtn.disabled = false;
    }
}
