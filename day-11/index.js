// https://adventofcode.com/2023/day/11

const fs = require('fs');

const createPairs = points => {
    const pairs = [];

    for (let i = 0; i < points.length; i++) {
        const current = points[i];

        for (let j = i + 1; j < points.length; j++) {
            pairs.push([current, points[j]]);
        }
    }

    return pairs;
}

const createPoints = matrix => {
    const points = [];

    matrix.forEach((line, lineIndex) => {
        line.forEach((char, charIndex) => {
            if (char === '#') {
                points.push({
                    i: lineIndex,
                    j: charIndex
                })
            }
        });
    });

    return points;
}

const expandArr = matrix => {
    const expandRowArr = [];
    const expandColumnArr = [];
    const columnsSize = matrix[0].length;

    for (let i = 0; i < matrix.length; i++) {
        let shouldExpand = true;

        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== '.') {
                shouldExpand = false;

                break;
            }
        }

        if (shouldExpand) {
            expandRowArr.push(i);
        }
    }

    for (let j = 0; j < columnsSize; j++) {
        let shouldExpand = true;

        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][j] !== '.') {
                shouldExpand = false;

                break;
            }
        }

        if (shouldExpand) {
            expandColumnArr.push(j);
        }
    }

    return [expandRowArr, expandColumnArr];
}

const expand = (matrix, expandRowArr, expandColumnArr, expandOneMillionTimes) => {
    let tempMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
        tempMatrix.push(matrix[i]);

        if (expandRowArr.includes(i) && !expandOneMillionTimes) {
            tempMatrix.push(matrix[i]);
        }
    }

    matrix = tempMatrix;
    tempMatrix = [];

    for (let j = 0; j < matrix[0].length; j++) {
        for (let i = 0; i < matrix.length; i++) {
            if (tempMatrix[i] === undefined) {
                tempMatrix[i] = [];
            }

            tempMatrix[i].push(matrix[i][j]);
        }

        if (expandColumnArr.includes(j) && !expandOneMillionTimes) {
            for (let i = 0; i < matrix.length; i++) {
                tempMatrix[i].push(matrix[i][j]);
            }
        }
    }

    matrix = tempMatrix;
    tempMatrix = [];

    return matrix;
}

const solve = (input, expandOneMillionTimes = false) => {
    const matrix = input.split('\n').map(line => line.split(''));
    const [expandRowArr, expandColumnArr] = expandArr(matrix);
    const expandedMatrix = expand(matrix, expandRowArr, expandColumnArr, expandOneMillionTimes);
    const points = createPoints(expandedMatrix);
    const pairs = createPairs(points);

    let sumLengths = 0;

    pairs.forEach(pair => {
        let diffI = pair[1].i - pair[0].i;
        let diffJ = pair[1].j - pair[0].j;

        if (diffI < 0) {
            diffI *= -1;
        }

        if (diffJ < 0) {
            diffJ *= -1;
        }

        if (expandOneMillionTimes) {
            expandRowArr.forEach(index => {
                if (pair[1].i > pair[0].i) {
                    if ((pair[1].i > index) && ((index > pair[0].i))) {
                        sumLengths += (1_000_000 - 1);
                    }
                } else if (pair[0].i > pair[1].i) {
                    if ((pair[0].i > index) && ((index > pair[1].i))) {
                        sumLengths += (1_000_000 - 1);
                    }
                }
            });

            expandColumnArr.forEach(index => {
                if (pair[1].j > pair[0].j) {
                    if ((pair[1].j > index) && ((index > pair[0].j))) {
                        sumLengths += (1_000_000 - 1);
                    }
                } else if (pair[0].j > pair[1].j) {
                    if ((pair[0].j > index) && ((index > pair[1].j))) {
                        sumLengths += (1_000_000 - 1);
                    }
                }
            });
        }

        sumLengths += diffI + diffJ;
    });

    return sumLengths;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');

    console.log('Result a)', solve(input));
    console.log('Result b)', solve(input, true));
} catch (error) {
    console.log('Error:', error);
}