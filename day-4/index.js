const fs = require('fs');

const calcTotalPoints = data => {
    let sum = 0;

    data.map(line => {
        const tempArr = line.split(':')[1].trim().split('|').map(val => val.trim());

        const winningNumbers = tempArr[0].split(' ');
        const ownNumbers = tempArr[1].split(' ').filter(val => val !== '');

        let matches = 0;

        winningNumbers.forEach(winningNumber => {
            if (ownNumbers.includes(winningNumber)) {
                matches++;
            }
        });

        sum += Math.floor(Math.pow(2, matches - 1));
    });

    return sum;
}

const calcTotalCards = data => {
    let sum = 0;
    const copyValueArr = {};

    data.map((line, index) => {
        const tempArr = line.split(':')[1].trim().split('|').map(val => val.trim());

        const winningNumbers = tempArr[0].split(' ').filter(val => /\d+/.test(val));
        const ownNumbers = tempArr[1].split(' ').filter(val => /\d+/.test(val));

        let matches = 0;

        if (!copyValueArr[index]) {
            copyValueArr[index] = 0;
        }

        copyValueArr[index] = copyValueArr[index] + 1;

        winningNumbers.forEach(winningNumber => {
            if (ownNumbers.includes(winningNumber)) {
                matches = matches + 1;
            }
        });

        for (let i = 1; i <= matches; i++) {
            if (!copyValueArr[index + i] ) {
                copyValueArr[index + i] = 0;
            }

            copyValueArr[index + i] = copyValueArr[index + i] + copyValueArr[index];
        }

        sum += copyValueArr[index];
    });

    return sum;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    
    const totalA = calcTotalPoints(input.split('\n'));
    const totalB = calcTotalCards(input.split('\n'));

    console.log('Result a)', totalA);
    console.log('Result b)', totalB);
} catch (error) {
    console.log('Error:', error);
}