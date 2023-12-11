// https://adventofcode.com/2023/day/10

const fs = require('fs');
const pointInPolygon = require('point-in-polygon');

const getFarthestPoint = matrix => {
    let max = 0;

    matrix.forEach(line => {
        let tempString = '';

        line.forEach(item => {
            if (item.distance === undefined) {
                tempString = tempString + ' .'
            } else {
                tempString = tempString + ' ' + item.distance;

                if (item.distance > max) {
                    max = item.distance;
                }
            }
        });
    });

    return max;
}

const calcDistances = (matrix, start, direction, returnOnlyPolygone) => {
    const polygon = [];
    
    let end = false;
    let distanceCounter = 1;
    let previous = start;
    let current = direction;

    while (!end) {
        if (!current.isStart) {
            if (matrix[current.i][current.j].distance === undefined || matrix[current.i][current.j].distance > distanceCounter) {
                matrix[current.i][current.j].distance = distanceCounter;

                if (returnOnlyPolygone) {
                    polygon.push([current.i, current.j]);
                }
            }

            if (current.value === '|') {
                if (previous.i < current.i) {
                    previous = current;
                    current = matrix[current.i + 1][current.j];
                } else {
                    previous = current;
                    current = matrix[current.i - 1][current.j];
                }
            } else if (current.value === '-') {
                if (previous.j < current.j) {
                    previous = current;
                    current = matrix[current.i][current.j + 1];
                } else {
                    previous = current;
                    current = matrix[current.i][current.j - 1];
                }
            } else if (current.value === 'L') {
                if (previous.i < current.i) {
                    previous = current;
                    current = matrix[current.i][current.j + 1];
                } else {
                    previous = current;
                    current = matrix[current.i - 1][current.j];
                }
            } else if (current.value === 'J') {
                if (previous.i < current.i) {
                    previous = current;
                    current = matrix[current.i][current.j - 1];
                } else {
                    previous = current;
                    current = matrix[current.i - 1][current.j];
                }
            } else if (current.value === '7') {
                if (previous.j < current.j) {
                    previous = current;
                    current = matrix[current.i + 1][current.j];
                } else {
                    previous = current;
                    current = matrix[current.i][current.j - 1];
                }
            } else if (current.value === 'F') {
                if (previous.j > current.j) {
                    previous = current;
                    current = matrix[current.i + 1][current.j];
                } else {
                    previous = current;
                    current = matrix[current.i][current.j + 1];
                }
            }

            distanceCounter++;
        } else {
            end = true;
        }
    }

    if (!returnOnlyPolygone) {
        return matrix;
    } else {
        return polygon;
    }
}

const calcFarthestPoint = (matrix, startPos, returnOnlyPolygone = false) => {
    const [startRow, startColumn] = startPos;
    const start = matrix[startRow][startColumn];
    const top = matrix[startRow - 1][startColumn];
    const right = matrix[startRow][startColumn + 1];
    const bottom = matrix[startRow + 1][startColumn];
    const left = matrix[startRow][startColumn - 1];

    if (top !== undefined && !top.isGround) {
        matrix = calcDistances(matrix, start, top, returnOnlyPolygone);

        if (returnOnlyPolygone) {
            return matrix;
        }
    }

    if (right !== undefined && !right.isGround) {
        matrix = calcDistances(matrix, start, right, returnOnlyPolygone);

        if (returnOnlyPolygone) {
            return matrix;
        }
    }

    if (bottom !== undefined && !bottom.isGround) {
        matrix = calcDistances(matrix, start, bottom, returnOnlyPolygone);

        if (returnOnlyPolygone) {
            return matrix;
        }
    }

    if (left !== undefined && !left.isGround) {
        matrix = calcDistances(matrix, start, left, returnOnlyPolygone);

        if (returnOnlyPolygone) {
            return matrix;
        }
    }
    
    return getFarthestPoint(matrix);
}

const isPolygoneValue = (i, j, polygon) => {
    let match = false;

    polygon.forEach((line, index) => {
        if (line[0] === i && line[1] === j) {
            match = true;
        }
    });
    
    return match;
}

const solveGold = input => {
    let tiles = 0;
    const polygon = solveSilver(input, true);
    polygon.push(polygon[0]);

    input.split('\n').forEach((line, i) => {
        line.split('').forEach((char, j) => {
            if (!isPolygoneValue(i, j, polygon)) {
                if (pointInPolygon([ i, j ], polygon)) {
                    tiles++;
                }
            }
        });
    });

    return tiles;
}

const solveSilver = (input, returnOnlyPolygone = false) => {
    const matrix = []; // [[{value: 'J', distance: 4 | undefined}], [..], ..]

    let startPos = [];

    input.split('\n').forEach((line, i) => {
        matrix.push([]);

        line.split('').forEach((char, j) => {
            if (char !== '.') {
                if (char === 'S') {
                    matrix[i].push({
                        value: char,
                        distance: 0,
                        isGround: false,
                        isStart: true,
                        i: i,
                        j: j
                    });

                    startPos.push(i, j);
                } else {
                    matrix[i].push({
                        value: char,
                        distance: undefined,
                        isGround: false,
                        isStart: false,
                        i: i,
                        j: j
                    });
                }
            } else {
                matrix[i].push({
                    value: char,
                    distance: undefined,
                    isGround: true,
                    isStart: false,
                    i: i,
                    j: j
                });
            }
        });
    });

    return calcFarthestPoint(matrix, startPos, returnOnlyPolygone);
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');

    console.log('Result a)', solveSilver(input));
    console.log('Result b)', solveGold(input));
} catch (error) {
    console.log('Error:', error);
}