// https://adventofcode.com/2023/day/18

const fs = require('fs');
const pointInPolygon = require('point-in-polygon');
const area = require('area-polygon'); // Package not necessary. Use the shoelace formula.

const solveGold = (data) => {
    const polygonPoints = [];
    const currentPosition = [0, 0];

    let stepsSum = 0;

    polygonPoints.push([currentPosition[0], currentPosition[1]]);

    data.forEach(line => {
        let direction = line[0];
        let steps = Number(line[1]);
        let hexCode = line[2];
        let tempHexCode = hexCode.split('');

        tempHexCode.shift();
        tempHexCode.shift();
        tempHexCode.pop();

        if (Number(tempHexCode[tempHexCode.length - 1]) === 0) {
            direction = 'R';
        } else if (Number(tempHexCode[tempHexCode.length - 1]) === 1) {
            direction = 'D';
        } else if (Number(tempHexCode[tempHexCode.length - 1]) === 2) {
            direction = 'L';
        } else if (Number(tempHexCode[tempHexCode.length - 1]) === 3) {
            direction = 'U';
        }

        tempHexCode.pop();
        tempHexCode = tempHexCode.join('');
        steps = parseInt(tempHexCode, 16);
        stepsSum += steps;

        if (direction === 'R') {
            polygonPoints.push([currentPosition[0] + steps, currentPosition[1]]);
            currentPosition[0] = currentPosition[0] + steps;
        } else if (direction === 'L') {
            polygonPoints.push([currentPosition[0] - steps, currentPosition[1]]);
            currentPosition[0] = currentPosition[0] - steps;
        } else if (direction === 'U') {
            polygonPoints.push([currentPosition[0], currentPosition[1] + steps]);
            currentPosition[1] = currentPosition[1] + steps;
        } else if (direction === 'D') {
            polygonPoints.push([currentPosition[0], currentPosition[1] - steps]);
            currentPosition[1] = currentPosition[1] - steps;
        }
    });

    polygonPoints.pop();

    // Picks theorem: A = i + (b / 2) - 1
    // b = stepsSum
    // A = area(polygonPoints)
    // i = A - (b / 2) + 1

    // i + b
    return area(polygonPoints) - (stepsSum / 2) + 1 + stepsSum;
}

const solveSilver = data => {
    const polygonPoints = [];
    const matrix = [];
    const currentPosition = [0, 0];

    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;
    let sum = 0;

    polygonPoints.push([currentPosition[0], currentPosition[1]]);

    data.forEach(line => {
        const direction = line[0];
        const steps = Number(line[1]);
        const hexCode = line[2];

        if (direction === 'R') {
            polygonPoints.push([currentPosition[0] + steps, currentPosition[1]]);

            for (let z = currentPosition[0]; z < currentPosition[0] + steps; z++) {
                matrix.push({
                    x: z,
                    y: currentPosition[1]
                });
            }

            currentPosition[0] = currentPosition[0] + steps;

            if (currentPosition[0] > maxX) {
                maxX = currentPosition[0];
            }
        } else if (direction === 'L') {
            polygonPoints.push([currentPosition[0] - steps, currentPosition[1]]);

            for (let z = currentPosition[0]; z > currentPosition[0] - steps; z--) {
                matrix.push({
                    x: z,
                    y: currentPosition[1]
                });
            }

            currentPosition[0] = currentPosition[0] - steps;

            if (currentPosition[0] < minX) {
                minX = currentPosition[0];
            }
        } else if (direction === 'U') {
            polygonPoints.push([currentPosition[0], currentPosition[1] + steps]);

            for (let z = currentPosition[1]; z < currentPosition[1] + steps; z++) {
                matrix.push({
                    x: currentPosition[0],
                    y: z
                });
            }

            currentPosition[1] = currentPosition[1] + steps;

            if (currentPosition[1] > maxY) {
                maxY = currentPosition[1];
            }
        } else if (direction === 'D') {
            polygonPoints.push([currentPosition[0], currentPosition[1] - steps]);

            for (let z = currentPosition[1]; z > currentPosition[1] - steps; z--) {
                matrix.push({
                    x: currentPosition[0],
                    y: z
                });
            }

            currentPosition[1] = currentPosition[1] - steps;

            if (currentPosition[1] < minY) {
                minY = currentPosition[1];
            }
        }
    });

    polygonPoints.pop();

    for (let y = minY; y < maxY; y++) {
        for (let x = minX; x < maxX; x++) {
            if (pointInPolygon([x, y], polygonPoints) && !(matrix.find(obj => obj.x === x && obj.y === y))) {
                sum++;
            }
        }
    }

    return sum + matrix.length;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const data = input.split('\n').map(line => line.split(' '));
    
    console.log('Result a)', solveSilver(data));
    console.log('Result b)', solveGold(data));
} catch(error) {
    console.log('Error:', error);
}