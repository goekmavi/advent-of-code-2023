const fs = require('fs');

const getPos = (valuesArr, val) => {
   return valuesArr.findIndex(item => {
        let currentVal = item.split('=')[0].trim();

        if (currentVal === val) {
            return true;
        }
    });
}

const getValues = (valuesArr, pos) => {
    let [currentValue, nextValues] = valuesArr[pos].split('=').map(val => {
        let tempValue = val.trim();

        if (tempValue[0] === '(' && tempValue[tempValue.length - 1] === ')') {
            tempValue = tempValue.slice(1, -1).split(',').map(val => val.trim());
        }

        return tempValue;
    });

    let [leftValue, rightValue] = nextValues;

    return [currentValue, leftValue, rightValue];
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
} catch (error) {
    console.log('Error:', error);
}