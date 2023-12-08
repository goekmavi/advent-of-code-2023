const fs = require('fs');

const solveGold = input => {
    const data = input.split('\n').map(line => Number(line.split(':')[1].trim().replace(/\s/g, '')));

    let multiply = 1;
    let possibleWays = 0;
    const time = data[0];
    const distance = data[1];

    for (let holdTime = 0; holdTime <= time; holdTime++) {
        const v = time - holdTime;
        const finalDistance = holdTime * v;

        if (finalDistance > distance) {
            possibleWays++;
        }
    }

    return possibleWays;
}

const solveSilver = input => {
    const data = input.split('\n').map(line => line.split(':')[1].trim().split(' ').filter(val => val !== '').map(val => Number(val)));
    
    let multiply = 1;

    for (let i = 0; i < data[0].length; i++) {
        let possibleWays = 0;
        const time = data[0][i];
        const distance = data[1][i];

        for (let holdTime = 0; holdTime <= time; holdTime++) {
            const v = time - holdTime;
            const finalDistance = holdTime * v;

            if (finalDistance > distance) {
                possibleWays++;
            }
        }

        multiply *= possibleWays;
        possibleWays = 0;
    }

    return multiply;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');

    console.log('Result a)', solveSilver(input));
    console.log('Result b)', solveGold(input));
} catch (error) {
    console.log('Error:', error);
}