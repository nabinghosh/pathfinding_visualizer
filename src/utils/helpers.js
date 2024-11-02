export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const clearNodeStyles = (element) => {
    element.className = 'node';
};

export const addNodeStyle = (element, style) => {
    element.classList.add(style);
};

export const removeNodeStyle = (element, style) => {
    element.classList.remove(style);
};

export const getManhattanDistance = (nodeA, nodeB) => {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
};

export const getEuclideanDistance = (nodeA, nodeB) => {
    return Math.sqrt(
        Math.pow(nodeA.row - nodeB.row, 2) + 
        Math.pow(nodeA.col - nodeB.col, 2)
    );
};
