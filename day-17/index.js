// https://adventofcode.com/2023/day/17

const fs = require('fs');

const directions = Object.freeze({
    'fromLeftToRight': 0,
    'fromRightToLeft': 1,
    'fromTopToBottom': 2,
    'fromBottomToTop': 3
});

const printDirection = matrix => {
    let currentPos = {
        i: matrix.length - 1,
        j: matrix[0].length - 1
    }

    while (currentPos.i !== 0 && currentPos.j !== 0) {
        console.log(matrix[currentPos.i][currentPos.j]);
        currentPos = matrix[currentPos.i][currentPos.j].predecessor[0];
    }

    console.log(matrix[0][0]);
}

const solve = matrix => {
    const pos = {
        i: 0,
        j: 0
    }

    const desination = {
        i: matrix.length - 1,
        j: matrix[0].length - 1
    }

    let stack = new Map();

    let visitedAll = false;

    matrix[pos.i][pos.j].weight = 0;
    matrix[pos.i][pos.j].direction = undefined;
    matrix[pos.i][pos.j].predecessor = {
        i: 0,
        j: 0
    }

    stack.set(pos.i.toString() + ',' + pos.j.toString(), matrix[pos.i][pos.j].weight);

    while (!visitedAll) {    
        stack = new Map([...stack.entries()].sort((a, b) => a[1] - b[1])); // sort

        const firstItemsOfStack = stack.entries().next().value[0].split(',');

        pos.i = Number(firstItemsOfStack[0]);
        pos.j = Number(firstItemsOfStack[1]);
        pos.direction = matrix[pos.i][pos.j].direction;

        stack.delete(stack.keys().next().value);

        if (pos.direction === undefined) { // for start point
            let weights = 0;
            let predecessors = [];

            for (let steps = 1; steps <= 3; steps++) { // right
                if (matrix[pos.i][pos.j + steps] && !matrix[pos.i][pos.j + steps].visited) {
                    weights += matrix[pos.i][pos.j + steps].value;

                    let tempPredecessorsArr = [];

                    predecessors.push({
                        i: pos.i,
                        j: pos.j + (steps - 1)
                    });

                    predecessors.forEach(item => tempPredecessorsArr.push(item));

                    if (matrix[pos.i][pos.j + steps].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i][pos.j + steps].weight) {
                        matrix[pos.i][pos.j + steps].weight = matrix[pos.i][pos.j].weight + weights;
                        matrix[pos.i][pos.j + steps].predecessor = tempPredecessorsArr;
                        matrix[pos.i][pos.j + steps].direction = directions.fromLeftToRight;

                        stack.set(pos.i.toString() + ',' + (pos.j + steps).toString(), matrix[pos.i][pos.j + steps].weight);
                    }
                } else {
                    break;
                }
            }

            weights = 0;
            predecessors = [];

            for (let steps = 1; steps <= 3; steps++) { // bottom
                if (matrix[pos.i + steps] && matrix[pos.i + steps][pos.j] && !matrix[pos.i + steps][pos.j].visited) {
                    weights += matrix[pos.i + steps][pos.j].value;

                    let tempPredecessorsArr = [];

                    predecessors.push({
                        i: pos.i + (steps - 1),
                        j: pos.j
                    });

                    predecessors.forEach(item => tempPredecessorsArr.push(item));

                    if (matrix[pos.i + steps][pos.j].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i + steps][pos.j].weight) {
                        matrix[pos.i + steps][pos.j].weight = matrix[pos.i][pos.j].weight + weights;
                        matrix[pos.i + steps][pos.j].predecessor = tempPredecessorsArr;
                        matrix[pos.i + steps][pos.j].direction = directions.fromTopToBottom;

                        stack.set((pos.i + steps).toString() + ',' + pos.j.toString(), matrix[pos.i + steps][pos.j].weight);
                    }
                } else {
                    break;
                }
            }
        } else if (pos.direction === directions.fromLeftToRight || pos.direction === directions.fromRightToLeft) {
            let weights = 0;
            let predecessors = [];

            for (let steps = 1; steps <= 3; steps++) { // top
                if (matrix[pos.i - steps] && matrix[pos.i - steps][pos.j] && !matrix[pos.i - steps][pos.j].visited) {
                    weights += matrix[pos.i - steps][pos.j].value;

                    let tempPredecessorsArr = [];

                    predecessors.push({
                        i: pos.i - (steps - 1),
                        j: pos.j
                    });

                    predecessors.forEach(item => tempPredecessorsArr.push(item));

                    if (matrix[pos.i - steps][pos.j].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i - steps][pos.j].weight) {
                        matrix[pos.i - steps][pos.j].weight = matrix[pos.i][pos.j].weight + weights;
                        matrix[pos.i - steps][pos.j].predecessor = tempPredecessorsArr;
                        matrix[pos.i - steps][pos.j].direction = directions.fromBottomToTop;

                        stack.set((pos.i - steps).toString() + ',' + pos.j.toString(), matrix[pos.i - steps][pos.j].weight);
                    }
                } else {
                    break;
                }
            }

            weights = 0;
            predecessors = [];

            for (let steps = 1; steps <= 3; steps++) { // bottom
                if (matrix[pos.i + steps] && matrix[pos.i + steps][pos.j] && !matrix[pos.i + steps][pos.j].visited) {
                    weights += matrix[pos.i + steps][pos.j].value;

                    let tempPredecessorsArr = [];

                    predecessors.push({
                        i: pos.i + (steps - 1),
                        j: pos.j
                    });

                    predecessors.forEach(item => tempPredecessorsArr.push(item));

                    if (matrix[pos.i + steps][pos.j].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i + steps][pos.j].weight) {
                        matrix[pos.i + steps][pos.j].weight = matrix[pos.i][pos.j].weight + weights;
                        matrix[pos.i + steps][pos.j].predecessor = tempPredecessorsArr;
                        matrix[pos.i + steps][pos.j].direction = directions.fromTopToBottom;

                        stack.set((pos.i + steps).toString() + ',' + pos.j.toString(), matrix[pos.i + steps][pos.j].weight);
                    }
                } else {
                    break;
                }
            }
        } else if (pos.direction === directions.fromTopToBottom || pos.direction === directions.fromBottomToTop) {
            let weights = 0;
            let predecessors = [];

            for (let steps = 1; steps <= 3; steps++) { // right
                if (matrix[pos.i][pos.j + steps] && !matrix[pos.i][pos.j + steps].visited) {
                    weights += matrix[pos.i][pos.j + steps].value;

                    let tempPredecessorsArr = [];

                    predecessors.push({
                        i: pos.i,
                        j: pos.j + (steps - 1)
                    });

                    predecessors.forEach(item => tempPredecessorsArr.push(item));

                    if (matrix[pos.i][pos.j + steps].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i][pos.j + steps].weight) {
                        matrix[pos.i][pos.j + steps].weight = matrix[pos.i][pos.j].weight + weights;
                        matrix[pos.i][pos.j + steps].predecessor = tempPredecessorsArr;
                        matrix[pos.i][pos.j + steps].direction = directions.fromLeftToRight;

                        stack.set(pos.i.toString() + ',' + (pos.j + steps).toString(), matrix[pos.i][pos.j + steps].weight);
                    }
                } else {
                    break;
                }
            }

            weights = 0;
            predecessors = [];

            for (let steps = 1; steps <= 3; steps++) { // left
                if (matrix[pos.i][pos.j - steps] && !matrix[pos.i][pos.j - steps].visited) {
                    weights += matrix[pos.i][pos.j - steps].value;

                    let tempPredecessorsArr = [];

                    predecessors.push({
                        i: pos.i,
                        j: pos.j - (steps - 1)
                    });

                    predecessors.forEach(item => tempPredecessorsArr.push(item));

                    if (matrix[pos.i][pos.j - steps].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i][pos.j - steps].weight) {
                        matrix[pos.i][pos.j - steps].weight = matrix[pos.i][pos.j].weight + weights;
                        matrix[pos.i][pos.j - steps].predecessor = tempPredecessorsArr;
                        matrix[pos.i][pos.j - steps].direction = directions.fromRightToLeft;

                        stack.set(pos.i.toString() + ',' + (pos.j - steps).toString(), matrix[pos.i][pos.j - steps].weight);
                    }
                } else {
                    break;
                }
            }
        }

        matrix[pos.i][pos.j].visited = true;

        if (stack.size === 0) {
            visitedAll = true;
        }
    }

    printDirection(matrix);
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const data = input.split('\n').map((line, lineIndex) => line.split('').map((char, charIndex) => {
        return {
            value: Number(char),
            visited: false,
            weight: undefined,
            predecessor: [],
            i: lineIndex,
            j: charIndex,
            direction: undefined
        }
    }));
    
    console.log('Result a)', solve(data));
    //console.log('Result b)', solveGold(data));
} catch(error) {
    console.log('Error:', error);
}