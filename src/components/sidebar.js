export class Sidebar {
    constructor(onAlgorithmChange, onMazeChange, onSpeedChange) {
        this.onAlgorithmChange = onAlgorithmChange;
        this.onMazeChange = onMazeChange;
        this.onSpeedChange = onSpeedChange;
        this.initializeSidebar();
    }

    initializeSidebar() {
        this.algorithmsList = document.getElementById('algorithms-list');
        this.mazeList = document.getElementById('maze-list');
        this.speedList = document.getElementById('speed-list');
        this.generateMazeBtn = document.getElementById('generate-maze-btn');

        this.algorithmsList.addEventListener('change', (e) => 
            this.onAlgorithmChange(e.target.value));
        this.speedList.addEventListener('change', (e) => 
            this.onSpeedChange(e.target.value));
        this.generateMazeBtn.addEventListener('click', () => 
            this.onMazeChange(this.mazeList.value));
    }

    getSelectedAlgorithm() {
        return this.algorithmsList.value;
    }

    getSelectedMazePattern() {
        return this.mazeList.value;
    }

    getSelectedSpeed() {
        return this.speedList.value;
    }

    disable() {
        this.algorithmsList.disabled = true;
        this.mazeList.disabled = true;
        this.generateMazeBtn.disabled = true;
        this.speedList.disabled = true;
    }

    enable() {
        this.algorithmsList.disabled = false;
        this.mazeList.disabled = false;
        this.generateMazeBtn.disabled = false;
        this.speedList.disabled = false;
    }
}
