// https://adventofcode.com/2023/day/17

const fs = require('fs');

const directions = Object.freeze({
    'fromLeftToRight': 0,
    'fromRightToLeft': 1,
    'fromTopToBottom': 2,
    'fromBottomToTop': 3,
    'start': 4
});

const printDirection = matrix => {
    let currentPos = {
        i: matrix.length - 1,
        j: matrix[0].length - 1
    }

    while (currentPos.i !== 0 && currentPos.j !== 0) {
        console.log(matrix[currentPos.i][currentPos.j]);
        currentPos = {
            i: matrix[currentPos.i][currentPos.j].predecessors.i,
            j: matrix[currentPos.i][currentPos.j].predecessors.j
        };
    }

    console.log(matrix[0][0]);
}

const solve = matrix => {
    const pos = {
        i: 0,
        j: 0,
        direction: directions.start,
        predecessor: [0, 0]
    }

    const desination = {
        i: matrix.length - 1,
        j: matrix[0].length - 1
    }

    let stack = new Map();
    let visitedAll = false;

    matrix[pos.i][pos.j].weight = 0;

    stack.set(pos.i.toString() + ',' + pos.j.toString() + ':' + pos.direction + ':' + pos.predecessor, matrix[pos.i][pos.j].weight);

    while (!visitedAll) {    
        stack = new Map([...stack.entries()].sort((a, b) => a[1] - b[1])); // sort

        //console.log(stack);

        const firstItemsOfStack = stack.entries().next().value[0].split(':').map(val => val.split(','));

        pos.i = Number(firstItemsOfStack[0][0]);
        pos.j = Number(firstItemsOfStack[0][1]);
        pos.direction = Number(firstItemsOfStack[1][0]);
        pos.predecessor = {
            i: Number(firstItemsOfStack[2].toString().split(',')[0]),
            j: Number(firstItemsOfStack[2].toString().split(',')[1])
        };

        stack.delete(stack.keys().next().value);

        if (pos.direction === directions.start) { // for start point
            let weights = 0;

            for (let steps = 1; steps <= 3; steps++) { // right
                if (matrix[pos.i][pos.j + steps] && !(matrix[pos.i][pos.j + steps].visitedDirections.includes(pos.direction))) {
                    weights += matrix[pos.i][pos.j + steps].value;

                    if (matrix[pos.i][pos.j + steps].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i][pos.j + steps].weight) {
                        
                        matrix[pos.i][pos.j + steps].weight = matrix[pos.i][pos.j].weight + weights;

                        stack.set(pos.i.toString() + ',' + (pos.j + steps).toString() + ':' + directions.fromLeftToRight + ':' + [pos.i, pos.j], matrix[pos.i][pos.j + steps].weight);
                    }
                } else {
                    break;
                }
            }

            weights = 0;

            for (let steps = 1; steps <= 3; steps++) { // bottom
                if (matrix[pos.i + steps] && matrix[pos.i + steps][pos.j] && !(matrix[pos.i + steps][pos.j].visitedDirections.includes(pos.direction))) {
                    weights += matrix[pos.i + steps][pos.j].value;

                    if (matrix[pos.i + steps][pos.j].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i + steps][pos.j].weight) {
                        matrix[pos.i + steps][pos.j].weight = matrix[pos.i][pos.j].weight + weights;

                        stack.set((pos.i + steps).toString() + ',' + pos.j.toString() + ':' + directions.fromTopToBottom + ':' + [pos.i, pos.j], matrix[pos.i + steps][pos.j].weight);
                    }
                } else {
                    break;
                }
            }
        } else if (pos.direction === directions.fromLeftToRight || pos.direction === directions.fromRightToLeft) {
            let weights = 0;

            for (let steps = 1; steps <= 3; steps++) { // top
                if (matrix[pos.i - steps] && matrix[pos.i - steps][pos.j] && !(matrix[pos.i - steps][pos.j].visitedDirections.includes(pos.direction))) {
                    weights += matrix[pos.i - steps][pos.j].value;

                    if (matrix[pos.i - steps][pos.j].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i - steps][pos.j].weight) {
                        matrix[pos.i - steps][pos.j].weight = matrix[pos.i][pos.j].weight + weights;

                        stack.set((pos.i - steps).toString() + ',' + pos.j.toString() + ':' + directions.fromBottomToTop + ':' + [pos.i, pos.j], matrix[pos.i - steps][pos.j].weight);
                    }
                } else {
                    break;
                }
            }

            weights = 0;

            for (let steps = 1; steps <= 3; steps++) { // bottom
                if (matrix[pos.i + steps] && matrix[pos.i + steps][pos.j] && !(matrix[pos.i + steps][pos.j].visitedDirections.includes(pos.direction))) {
                    weights += matrix[pos.i + steps][pos.j].value;

                    if (matrix[pos.i + steps][pos.j].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i + steps][pos.j].weight) {
                        matrix[pos.i + steps][pos.j].weight = matrix[pos.i][pos.j].weight + weights;

                        stack.set((pos.i + steps).toString() + ',' + pos.j.toString() + ':' + directions.fromTopToBottom + ':' + [pos.i, pos.j], matrix[pos.i + steps][pos.j].weight);
                    }
                } else {
                    break;
                }
            }
        } else if (pos.direction === directions.fromTopToBottom || pos.direction === directions.fromBottomToTop) {
            let weights = 0;

            for (let steps = 1; steps <= 3; steps++) { // right
                if (matrix[pos.i][pos.j + steps] && !(matrix[pos.i][pos.j + steps].visitedDirections.includes(pos.direction))) {
                    weights += matrix[pos.i][pos.j + steps].value;

                    if (matrix[pos.i][pos.j + steps].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i][pos.j + steps].weight) {
                        matrix[pos.i][pos.j + steps].weight = matrix[pos.i][pos.j].weight + weights;

                        stack.set(pos.i.toString() + ',' + (pos.j + steps).toString() + ':' + directions.fromLeftToRight + ':' + [pos.i, pos.j], matrix[pos.i][pos.j + steps].weight);
                    }
                } else {
                    break;
                }
            }

            weights = 0;

            for (let steps = 1; steps <= 3; steps++) { // left
                if (matrix[pos.i][pos.j - steps] && !(matrix[pos.i][pos.j - steps].visitedDirections.includes(pos.direction))) {
                    weights += matrix[pos.i][pos.j - steps].value;

                    if (matrix[pos.i][pos.j - steps].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i][pos.j - steps].weight) {
                        matrix[pos.i][pos.j - steps].weight = matrix[pos.i][pos.j].weight + weights;

                        stack.set(pos.i.toString() + ',' + (pos.j - steps).toString() + ':' + directions.fromRightToLeft + ':' + [pos.i, pos.j], matrix[pos.i][pos.j - steps].weight);
                    }
                } else {
                    break;
                }
            }
        }

        pos.predecessor['direction'] = pos.direction;
        matrix[pos.i][pos.j].predecessors = pos.predecessor;

        matrix[pos.i][pos.j].visitedDirections.push(pos.direction);

        if (stack.size === 0) {
            visitedAll = true;
        }
    }

    // printDirection(matrix);
    console.log(matrix[matrix.length - 1][matrix[0].length - 1]);
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const data = input.split('\n').map((line, lineIndex) => line.split('').map((char, charIndex) => {
        return {
            value: Number(char),
            weight: undefined,
            predecessors: [],
            i: lineIndex,
            j: charIndex,
            visitedDirections: []
        }
    }));
    
    console.log('Result a)', solve(data));
    //console.log('Result b)', solveGold(data));
} catch(error) {
    console.log('Error:', error);
}