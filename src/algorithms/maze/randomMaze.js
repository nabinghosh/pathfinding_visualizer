
export class RandomMaze {
    constructor(grid, animator) {
        this.grid = grid;
        this.animator = animator;
    }

    async generate() {
        const walls = [];
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                const node = this.grid[row][col];
                if (!node.isStart && !node.isEnd && Math.random() < 0.3) {
                    node.isWall = true;
                    walls.push(node);
                    await this.animator.delay(10);
                }
            }
        }
        return walls;
    }
}
