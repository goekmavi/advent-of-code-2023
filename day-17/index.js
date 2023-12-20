// https://adventofcode.com/2023/day/17

const fs = require('fs');

const directions = Object.freeze({
    'fromLeftToRight': 0,
    'fromRightToLeft': 1,
    'fromTopToBottom': 2,
    'fromBottomToTop': 3
});

const solve = matrix => {
    const pos = {
        i: 0,
        j: 0
    }

    const desination = {
        i: matrix.length - 1,
        j: matrix[0].length - 1
    }

    const stack = [];

    let visitedAll = false;

    matrix[pos.i][pos.j].weight = 0;
    matrix[pos.i][pos.j].direction = directions.fromLeftToRight;
    matrix[pos.i][pos.j].predecessor = {
        i: 0,
        j: 0
    }

    stack.push(matrix[pos.i][pos.j]);

    while (!visitedAll) {
        pos.i = stack[0].i;
        pos.j = stack[0].j;
        pos.direction = stack[0].direction;

        if (pos.direction === directions.fromLeftToRight) {
            let weights = 0;
            let predecessors = [];

            for (let steps = 1; steps <= 3; steps++) { // top
                if (matrix[pos.i - steps] && matrix[pos.i - steps][pos.j] && !matrix[pos.i - steps][pos.j].visited) {
                    weights += matrix[pos.i - steps][pos.j].value;

                    predecessors.push({
                        i: matrix[pos.i][pos.j].i,
                        j: matrix[pos.i][pos.j].j
                    })

                    if (matrix[pos.i - steps][pos.j].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i - steps][pos.j].weight) {
                        matrix[pos.i - steps][pos.j].weight = matrix[pos.i][pos.j].weight + weights;
                        matrix[pos.i - steps][pos.j].predecessor = predecessors;
                    }

                    matrix[pos.i - steps][pos.j].direction = directions.fromBottomToTop;
                    stack.push(matrix[pos.i - steps][pos.j]);
                } else {
                    break;
                }
            }

            weights = 0;
            predecessors = [];

            for (let steps = 1; steps <= 3; steps++) { // bottom
                if (matrix[pos.i + steps] && matrix[pos.i + steps][pos.j] && !matrix[pos.i + steps][pos.j].visited) {
                    weights += matrix[pos.i + steps][pos.j].value;

                    predecessors.push({
                        i: matrix[pos.i][pos.j].i,
                        j: matrix[pos.i][pos.j].j
                    })

                    if (matrix[pos.i + steps][pos.j].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i + steps][pos.j].weight) {
                        matrix[pos.i + steps][pos.j].weight = matrix[pos.i][pos.j].weight + weights;
                        matrix[pos.i + steps][pos.j].predecessor = predecessors;
                    }

                    matrix[pos.i + steps][pos.j].direction = directions.fromTopToBottom;
                    stack.push(matrix[pos.i + steps][pos.j]);
                } else {
                    break;
                }
            }
        } else if (pos.direction === directions.fromRightToLeft) {
            let weights = 0;
            let predecessors = [];

            for (let steps = 1; steps <= 3; steps++) { // top
                if (matrix[pos.i - steps] && matrix[pos.i - steps][pos.j] && !matrix[pos.i - steps][pos.j].visited) {
                    weights += matrix[pos.i - steps][pos.j].value;

                    predecessors.push({
                        i: matrix[pos.i][pos.j].i,
                        j: matrix[pos.i][pos.j].j
                    })

                    if (matrix[pos.i - steps][pos.j].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i - steps][pos.j].weight) {
                        matrix[pos.i - steps][pos.j].weight = matrix[pos.i][pos.j].weight + weights;
                        matrix[pos.i - steps][pos.j].predecessor = predecessors;
                    }

                    matrix[pos.i - steps][pos.j].direction = directions.fromBottomToTop;
                    stack.push(matrix[pos.i - steps][pos.j]);
                } else {
                    break;
                }
            }

            weights = 0;
            predecessors = [];

            for (let steps = 1; steps <= 3; steps++) { // bottom
                if (matrix[pos.i + steps] && matrix[pos.i + steps][pos.j] && !matrix[pos.i + steps][pos.j].visited) {
                    weights += matrix[pos.i + steps][pos.j].value;

                    predecessors.push({
                        i: matrix[pos.i][pos.j].i,
                        j: matrix[pos.i][pos.j].j
                    })

                    if (matrix[pos.i + steps][pos.j].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i + steps][pos.j].weight) {
                        matrix[pos.i + steps][pos.j].weight = matrix[pos.i][pos.j].weight + weights;
                        matrix[pos.i + steps][pos.j].predecessor = predecessors;
                    }

                    matrix[pos.i + steps][pos.j].direction = directions.fromTopToBottom;
                    stack.push(matrix[pos.i + steps][pos.j]);
                } else {
                    break;
                }
            }
        } else if (pos.direction === directions.fromTopToBottom) {
            weights = 0;
            predecessors = [];

            for (let steps = 1; steps <= 3; steps++) { // right
                if (matrix[pos.i][pos.j + steps] && !matrix[pos.i][pos.j + steps].visited) {
                    weights += matrix[pos.i][pos.j + steps].value;

                    predecessors.push({
                        i: matrix[pos.i][pos.j].i,
                        j: matrix[pos.i][pos.j].j
                    })

                    if (matrix[pos.i][pos.j + steps].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i][pos.j + steps].weight) {
                        matrix[pos.i][pos.j + steps].weight = matrix[pos.i][pos.j].weight + weights;
                        matrix[pos.i][pos.j + steps].predecessor = predecessors;
                    }

                    matrix[pos.i][pos.j + steps].direction = directions.fromLeftToRight;
                    stack.push(matrix[pos.i][pos.j + steps]);
                } else {
                    break;
                }
            }

            weights = 0;
            predecessors = [];

            for (let steps = 1; steps <= 3; steps++) { // left
                if (matrix[pos.i][pos.j - steps] && !matrix[pos.i][pos.j - steps].visited) {
                    weights += matrix[pos.i][pos.j - steps].value;

                    predecessors.push({
                        i: matrix[pos.i][pos.j].i,
                        j: matrix[pos.i][pos.j].j
                    })

                    if (matrix[pos.i][pos.j - steps].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i][pos.j - steps].weight) {
                        matrix[pos.i][pos.j - steps].weight = matrix[pos.i][pos.j].weight + weights;
                        matrix[pos.i][pos.j - steps].predecessor = predecessors;
                    }

                    matrix[pos.i][pos.j - steps].direction = directions.fromRightToLeft;
                    stack.push(matrix[pos.i][pos.j - steps]);
                } else {
                    break;
                }
            }
        } else if (pos.direction === directions.fromBottomToTop) {
            weights = 0;
            predecessors = [];

            for (let steps = 1; steps <= 3; steps++) { // right
                if (matrix[pos.i][pos.j + steps] && !matrix[pos.i][pos.j + steps].visited) {
                    weights += matrix[pos.i][pos.j + steps].value;

                    predecessors.push({
                        i: matrix[pos.i][pos.j].i,
                        j: matrix[pos.i][pos.j].j
                    })

                    if (matrix[pos.i][pos.j + steps].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i][pos.j + steps].weight) {
                        matrix[pos.i][pos.j + steps].weight = matrix[pos.i][pos.j].weight + weights;
                        matrix[pos.i][pos.j + steps].predecessor = predecessors;
                    }

                    matrix[pos.i][pos.j + steps].direction = directions.fromLeftToRight;
                    stack.push(matrix[pos.i][pos.j + steps]);
                } else {
                    break;
                }
            }

            weights = 0;
            predecessors = [];

            for (let steps = 1; steps <= 3; steps++) { // left
                if (matrix[pos.i][pos.j - steps] && !matrix[pos.i][pos.j - steps].visited) {
                    weights += matrix[pos.i][pos.j - steps].value;

                    predecessors.push({
                        i: matrix[pos.i][pos.j].i,
                        j: matrix[pos.i][pos.j].j
                    })

                    if (matrix[pos.i][pos.j - steps].weight === undefined || (matrix[pos.i][pos.j].weight + weights) < matrix[pos.i][pos.j - steps].weight) {
                        matrix[pos.i][pos.j - steps].weight = matrix[pos.i][pos.j].weight + weights;
                        matrix[pos.i][pos.j - steps].predecessor = predecessors;
                    }

                    matrix[pos.i][pos.j - steps].direction = directions.fromRightToLeft;
                    stack.push(matrix[pos.i][pos.j - steps]);
                } else {
                    break;
                }
            }
        }

        matrix[pos.i][pos.j].visited = true;
        stack.shift();

        if (stack.length === 0) {
            visitedAll = true;
        }
    }

    console.log(matrix[matrix.length - 1][matrix[0].length - 1]);
    //console.log(stack);
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