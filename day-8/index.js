// https://adventofcode.com/2023/day/8

const fs = require('fs');

const calcGcd = (x, y) => {
    if (y === 0) {
        return x;
    } else {
        return calcGcd(y, (x % y));
    }
}

const calcLcm = (x, y) => {
    if (x > y) {
        const gcd = calcGcd(x, y);

        return ((x * y) / gcd);
    } else if (y > x) {
        const gcd = calcGcd(y, x);
        
        return ((x * y) / gcd);
    } else {
        return x;
    }
}

const getAllStartPos = (valuesArr) => {
    const indexArr = [];

    for (let i = 0; i < valuesArr.length; i++) {
        const currentVal = valuesArr[i].split('=')[0].trim().split('');

        if (currentVal[currentVal.length - 1] === 'A') {
            indexArr.push(i);
        }
    }

    return indexArr;
}

const getPos = (valuesArr, val) => {
   return valuesArr.findIndex(item => {
        const currentVal = item.split('=')[0].trim();

        if (currentVal === val) {
            return true;
        }
    });
}

const getValues = (valuesArr, pos) => {
    const [currentValue, nextValues] = valuesArr[pos].split('=').map(val => {
        let tempValue = val.trim();

        if (tempValue[0] === '(' && tempValue[tempValue.length - 1] === ')') {
            tempValue = tempValue.slice(1, -1).split(',').map(val => val.trim());
        }

        return tempValue;
    });

    const [leftValue, rightValue] = nextValues;

    return [currentValue, leftValue, rightValue];
}

const solveGold = (instructions, values) => {
    const instructionsChars = instructions.split('');
    const valuesArr = values.split('\n');
    const allEndPos = [];

    let allPos = getAllStartPos(valuesArr);

    allPos.forEach(pos => {
        let reachedEnd = false;
        let index = 0;
        let steps = 0;
        let lcm = 0;

        while (!reachedEnd) {
            let [currentValue, leftValue, rightValue] = getValues(valuesArr, pos);
            let currentInstruction = instructionsChars[index];

            if (currentValue[currentValue.length - 1] === 'Z') {
                reachedEnd = true;
            } else {
                steps++;
            }

            if (currentInstruction === 'L') {
                pos = getPos(valuesArr, leftValue);
            } else if (currentInstruction === 'R') {
                pos = getPos(valuesArr, rightValue);
            }

            if (index === instructionsChars.length - 1) {
                index = 0;
            } else {
                index++;
            }
        }

        allEndPos.push(steps);
    });

    for (let i = 0; i < allEndPos.length; i++) {
        if (i === 0) {
            lcm = allEndPos[i];
        } else {
            lcm = calcLcm(lcm, allEndPos[i]);
        }
    }

    return lcm;
}

const solveSilver = (instructions, values) => {
    const instructionsChars = instructions.split('');
    const valuesArr = values.split('\n');

    let reachedEnd = false;
    let index = 0;
    let steps = 0;
    let pos = getPos(valuesArr, 'AAA');

    while (!reachedEnd) {
        let [currentValue, leftValue, rightValue] = getValues(valuesArr, pos);
        let currentInstruction = instructionsChars[index];

        if (currentValue === 'ZZZ') {
            reachedEnd = true;
            pos = 0;
        } else {
            steps++;
        }

        if (currentInstruction === 'L') {
            pos = getPos(valuesArr, leftValue);
        } else if (currentInstruction === 'R') {
            pos = getPos(valuesArr, rightValue);
        }

        if (index === instructionsChars.length - 1) {
            index = 0;
        } else {
            index++;
        }
    }

    return steps;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const [instructions, values] = input.split(/\n\s*\n/);

    console.log('Result a)', solveSilver(instructions, values));
    console.log('Result b)', solveGold(instructions, values));
} catch (error) {
    console.log('Error:', error);
}