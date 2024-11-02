export class Animator {
    constructor(speed = 'normal') {
        this.speeds = {
            slow: 100,
            normal: 50,
            fast: 25
        };
        this.setSpeed(speed);
    }

    setSpeed(speed) {
        this.speed = this.speeds[speed];
    }

    async animateVisitedNode(node, isInstant = false) {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        element.classList.add('visited');
        if (!isInstant) {
            await this.delay(this.speed);
        }
    }

    async animatePath(path, isInstant = false) {
        for (let node of path) {
            const element = document.getElementById(`node-${node.row}-${node.col}`);
            element.classList.add('path');
            if (!isInstant) {
                await this.delay(this.speed);
            }
        }
    }

    async clearAnimation() {
        const nodes = document.querySelectorAll('.node');
        nodes.forEach(node => {
            node.classList.remove('visited', 'path');
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
