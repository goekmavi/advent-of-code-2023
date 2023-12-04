const fs = require('fs');

const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;

const isPossible = (numbers, cubes) => {
    let isPossible = true;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > cubes) {
            isPossible = false;
            break;
        }
    }

    return isPossible;
}

const getNumber = (line, reg) => {
    return line.match(reg).map(item => {
        return Number(item.replace(/\D/g, ''));
    });
}

const getMax = numbers => {
    let max = 0;

    numbers.forEach(number => {
        if (number >= max) {
            max = number;
        }
    });

    return max;
}

const calculateSumOfIds = data => {
    let sumPartA = 0;
    let sumPartB = 0;

    data.split('\n').map(line => {
        const groupIdReg = new RegExp(/Game (\d+)/g);
        const redReg = new RegExp(/(\d+) red/gm);
        const greenReg = new RegExp(/(\d+) green/g);
        const blueReg = new RegExp(/(\d+) blue/g);

        const id = Number(groupIdReg.exec(line)[1]);

        const [redNumbers, greenNumbers, blueNumbers] = [
            getNumber(line, redReg),
            getNumber(line, greenReg),
            getNumber(line, blueReg)
        ];

        if (isPossible(redNumbers, redCubes) && isPossible(greenNumbers, greenCubes) && isPossible(blueNumbers, blueCubes)) {
            sumPartA += id;
        }

        const [redMax, greenMax, blueMax] = [
            getMax(redNumbers),
            getMax(greenNumbers),
            getMax(blueNumbers)
        ];

        sumPartB += (redMax * greenMax * blueMax);
    });

    return [sumPartA, sumPartB];
}

try {
    const data = fs.readFileSync('input.txt', 'utf8').toString();
    const sum = calculateSumOfIds(data);
    
    console.log('Result:', sum);
} catch(error) {
    console.log('Error:', error);
}