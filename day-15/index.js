// https://adventofcode.com/2023/day/15

const fs = require('fs');

const calcHashValue = sequenceString => {
    let currentValue = 0;

    sequenceString.split('').forEach(sequenceChar => {
        currentValue += sequenceChar.charCodeAt(0);
        currentValue = (currentValue * 17) % 256;
    });

    return currentValue;
}

const solveGold = input => {
    const sequenceArr = input.split(',');
    let hashMap = [...Array(256)].map(arr => arr = []);

    let focusingPower = 0;

    sequenceArr.forEach(sequence => {    
        if (sequence.includes('-')) {
            const sequenceInfoArr = sequence.split('-');
            const label = sequenceInfoArr[0];
            const boxNumber = calcHashValue(label);

            let labelIndex = undefined;

            if (hashMap[boxNumber].length !== 0) {

                for (let i = 0; i < hashMap[boxNumber].length; i++) {
                    if (hashMap[boxNumber][i][0] === label) {
                        labelIndex = i;

                        break;
                    }
                }
    
                if (labelIndex !== undefined) {
                    hashMap[boxNumber].splice(labelIndex, 1);
                }
            }
        } else if (sequence.includes('=')) {
            const sequenceInfoArr = sequence.split('=');
            const label = sequenceInfoArr[0];
            const boxNumber = calcHashValue(label);
            const focalLength = Number(sequenceInfoArr[1]);

            let labelIndex = undefined;

            for (let i = 0; i < hashMap[boxNumber].length; i++) {
                if (hashMap[boxNumber][i][0] === label) {
                    labelIndex = i;
                    
                    break;
                }
            }

            if (labelIndex !== undefined) {
                hashMap[boxNumber][labelIndex] = [label, focalLength];
            } else {
                hashMap[boxNumber].push([label, focalLength]);
            }
        }
    });

    hashMap.forEach((arr, arrIndex) => {
        if (arr.length !== 0) {
            arr.forEach((lens, lensIndex) => {
                focusingPower += (arrIndex + 1) * (lensIndex + 1) * lens[1];
            });
        }
    });

    return focusingPower;
}

const solveSilver = input => {
    const sequenceArr = input.split(',');

    let sum = 0;
    
    sequenceArr.forEach(sequence => {
        sum += calcHashValue(sequence);
    });

    return sum;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');

    console.log('Result a)', solveSilver(input));
    console.log('Result b)', solveGold(input));
} catch (error) {
    console.log('Error:', error);
}