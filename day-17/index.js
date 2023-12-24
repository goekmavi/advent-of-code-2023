// https://adventofcode.com/2023/day/17

const fs = require('fs');

const directions = Object.freeze({
    'fromLeftToRight': 0,
    'fromRightToLeft': 1,
    'fromTopToBottom': 2,
    'fromBottomToTop': 3,
    'start': 4
});

const directionEntry = Object.freeze({
    'top': 0,
    'right': 1,
    'bottom': 2,
    'left': 3
});

const solve = matrix => {
    const pos = {
        i: 0,
        j: 0,
        direction: directions.start
    }

    const desination = {
        i: matrix.length - 1,
        j: matrix[0].length - 1
    }

    let stack = new Map();
    let visitedAll = false;

    matrix[pos.i][pos.j].weightsPosArr[directionEntry.left] = 0;
    matrix[pos.i][pos.j].weightsPosArr[directionEntry.top] = 0;

    stack.set(pos.i.toString() + ',' + pos.j.toString() + ':' + pos.direction, 0);

    while (!visitedAll) {    
        stack = new Map([...stack.entries()].sort((a, b) => a[1] - b[1])); // sort

        const firstItemsOfStack = stack.entries().next().value[0].split(':').map(val => val.split(','));

        pos.i = Number(firstItemsOfStack[0][0]);
        pos.j = Number(firstItemsOfStack[0][1]);
        pos.direction = Number(firstItemsOfStack[1][0]);

        stack.delete(stack.keys().next().value);

        if (pos.direction === directions.start) { // for start point
            let weights = 0;

            for (let steps = 1; steps <= 3; steps++) { // right
                if (matrix[pos.i][pos.j + steps]) {
                    weights += matrix[pos.i][pos.j + steps].value;

                    matrix[pos.i][pos.j + steps].weightsPosArr[directionEntry.left] = 0 + weights;
                    stack.set(pos.i.toString() + ',' + (pos.j + steps).toString() + ':' + directions.fromLeftToRight, matrix[pos.i][pos.j + steps].weightsPosArr[directionEntry.left]);
                } else {
                    break;
                }
            }

            weights = 0;

            for (let steps = 1; steps <= 3; steps++) { // bottom
                if (matrix[pos.i + steps] && matrix[pos.i + steps][pos.j]) {
                    weights += matrix[pos.i + steps][pos.j].value;

                    matrix[pos.i + steps][pos.j].weightsPosArr[directionEntry.top] = 0 + weights;
                    stack.set((pos.i + steps).toString() + ',' + pos.j.toString() + ':' + directions.fromTopToBottom, matrix[pos.i + steps][pos.j].weightsPosArr[directionEntry.top]);
                } else {
                    break;
                }
            }
        } else if (pos.direction === directions.fromLeftToRight || pos.direction === directions.fromRightToLeft) {
            let weights = 0;
            let currentMinWeight;

            if (matrix[pos.i][pos.j].weightsPosArr[directionEntry.left] !== undefined && matrix[pos.i][pos.j].weightsPosArr[directionEntry.right] !== undefined) {
                currentMinWeight = Math.min(matrix[pos.i][pos.j].weightsPosArr[directionEntry.left], matrix[pos.i][pos.j].weightsPosArr[directionEntry.right]);
            } else if (matrix[pos.i][pos.j].weightsPosArr[directionEntry.left] !== undefined ) {
                currentMinWeight = matrix[pos.i][pos.j].weightsPosArr[directionEntry.left];
            } else if (matrix[pos.i][pos.j].weightsPosArr[directionEntry.right] !== undefined ) {
                currentMinWeight = matrix[pos.i][pos.j].weightsPosArr[directionEntry.right];
            }

            for (let steps = 1; steps <= 3; steps++) { // top
                if (matrix[pos.i - steps] && matrix[pos.i - steps][pos.j]) {
                    weights += matrix[pos.i - steps][pos.j].value;

                    if (matrix[pos.i - steps][pos.j].weightsPosArr[directionEntry.bottom] === undefined || (currentMinWeight + weights) < matrix[pos.i - steps][pos.j].weightsPosArr[directionEntry.bottom] ) {
                        matrix[pos.i - steps][pos.j].weightsPosArr[directionEntry.bottom] = currentMinWeight + weights;
                        stack.set((pos.i - steps).toString() + ',' + pos.j.toString() + ':' + directions.fromBottomToTop, matrix[pos.i - steps][pos.j].weightsPosArr[directionEntry.bottom]);
                    }
                } else {
                    break;
                }
            }

            weights = 0;

            for (let steps = 1; steps <= 3; steps++) { // bottom
                if (matrix[pos.i + steps] && matrix[pos.i + steps][pos.j]) {
                    weights += matrix[pos.i + steps][pos.j].value;

                    if (matrix[pos.i + steps][pos.j].weightsPosArr[directionEntry.top] === undefined || (currentMinWeight + weights) < matrix[pos.i + steps][pos.j].weightsPosArr[directionEntry.top] ) {
                        matrix[pos.i + steps][pos.j].weightsPosArr[directionEntry.top] = currentMinWeight + weights;
                        stack.set((pos.i + steps).toString() + ',' + pos.j.toString() + ':' + directions.fromTopToBottom, matrix[pos.i + steps][pos.j].weightsPosArr[directionEntry.top] );
                    }
                } else {
                    break;
                }
            }
        } else if (pos.direction === directions.fromTopToBottom || pos.direction === directions.fromBottomToTop) {
            let weights = 0;
            let currentMinWeight;

            if (matrix[pos.i][pos.j].weightsPosArr[directionEntry.top] !== undefined && matrix[pos.i][pos.j].weightsPosArr[directionEntry.bottom] !== undefined) {
                currentMinWeight = Math.min(matrix[pos.i][pos.j].weightsPosArr[directionEntry.top], matrix[pos.i][pos.j].weightsPosArr[directionEntry.bottom]);
            } else if (matrix[pos.i][pos.j].weightsPosArr[directionEntry.top] !== undefined ) {
                currentMinWeight = matrix[pos.i][pos.j].weightsPosArr[directionEntry.top];
            } else if (matrix[pos.i][pos.j].weightsPosArr[directionEntry.bottom] !== undefined ) {
                currentMinWeight = matrix[pos.i][pos.j].weightsPosArr[directionEntry.bottom];
            }

            for (let steps = 1; steps <= 3; steps++) { // right
                if (matrix[pos.i][pos.j + steps]) {
                    weights += matrix[pos.i][pos.j + steps].value;

                    if (matrix[pos.i][pos.j + steps].weightsPosArr[directionEntry.left] === undefined || (currentMinWeight + weights) < matrix[pos.i][pos.j + steps].weightsPosArr[directionEntry.left]) {
                        matrix[pos.i][pos.j + steps].weightsPosArr[directionEntry.left] = currentMinWeight + weights;
                        stack.set(pos.i.toString() + ',' + (pos.j + steps).toString() + ':' + directions.fromLeftToRight, matrix[pos.i][pos.j + steps].weightsPosArr[directionEntry.left]);                  
                    }
                } else {
                    break;
                }
            }

            weights = 0;

            for (let steps = 1; steps <= 3; steps++) { // left
                if (matrix[pos.i][pos.j - steps]) {
                    weights += matrix[pos.i][pos.j - steps].value;

                    if (matrix[pos.i][pos.j - steps].weightsPosArr[directionEntry.right] === undefined || (currentMinWeight + weights) < matrix[pos.i][pos.j - steps].weightsPosArr[directionEntry.right]) {
                        matrix[pos.i][pos.j - steps].weightsPosArr[directionEntry.right] = currentMinWeight + weights;
                        stack.set(pos.i.toString() + ',' + (pos.j - steps).toString() + ':' + directions.fromRightToLeft, matrix[pos.i][pos.j - steps].weightsPosArr[directionEntry.right]);
                    }
                } else {
                    break;
                }
            }
        }

        if (stack.size === 0) {
            visitedAll = true;
        }
    }

    const finalItemArr = matrix[matrix.length - 1][matrix[0].length - 1].weightsPosArr;

    let finalWeight;

    for (let i = 0; i < finalItemArr.length; i++) {
        if (finalWeight === undefined || finalWeight > finalItemArr[i]) {
            finalWeight = finalItemArr[i];
        }
    }
    
    return finalWeight;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const data = input.split('\n').map((line, lineIndex) => line.split('').map((char, charIndex) => {
        return {
            value: Number(char),
            weightsPosArr: [undefined, undefined, undefined, undefined],
            i: lineIndex,
            j: charIndex
        }
    }));
    
    console.log('Result a)', solve(data));
    //console.log('Result b)', solveGold(data));
} catch(error) {
    console.log('Error:', error);
}