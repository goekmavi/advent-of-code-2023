const fs = require('fs');

const isArrangement = (arrangementString, arrangementNumbers, memoization) => {    
    if (memoization[arrangementString + ':' + arrangementNumbers]) {
        return memoization[arrangementString + ':' + arrangementNumbers];
    }

    let returnValue = 0;

    if (arrangementNumbers.length === 0) {
        const match = arrangementString.match(/\#+/g);

        if (match) {
            returnValue = 0;
        } else {
            returnValue = 1;
        }
    } else if (arrangementString === '') {
        returnValue = 0;
    } else {
        const firstChar = arrangementString[0];

        if (firstChar === '.') {
            returnValue = isArrangement(arrangementString.substring(1), arrangementNumbers, memoization);
        } else if (firstChar === '?') {
            returnValue = isArrangement(arrangementString.replace(/\?/, '.'), arrangementNumbers, memoization) + isArrangement(arrangementString.replace(/\?/, '#'), arrangementNumbers, memoization);
        } else if (firstChar === '#') {
            let tempCond = true;

            if (arrangementString.length < arrangementNumbers[0]) {
                tempCond = false;
            } else {
                for (let i = 0; i < arrangementNumbers[0]; i++) {
                    if (arrangementString[i] === '.') {
                        tempCond = false;
                    }
                }

                if ((arrangementString.length > arrangementNumbers[0]) && (arrangementString[arrangementNumbers[0]] === '#')) {
                    tempCond = false;
                }
            }

            if (tempCond) {
                const tempNr = arrangementNumbers[0];
                const newArrangementNumbers = [];

                arrangementNumbers.forEach((item, itemIndex) => {
                    if (itemIndex !== 0) {
                        newArrangementNumbers.push(item);
                    }
                });

                returnValue = isArrangement(arrangementString.substring(tempNr + 1), newArrangementNumbers, memoization);
            } else {
                returnValue = 0;
            }
        }
    }

    memoization[arrangementString + ':' + arrangementNumbers] = returnValue;

    return returnValue;
}

const solve = (input, unfold) => {
    let sum = 0;

    const data = input.split('\n').map(line => line.split(' ').map((item, itemIndex) => {
        if (itemIndex === 1) {
            if (!unfold) {
                return item.split(',').map(val => Number(val));
            } else {
                const tempString = (item + ',' + item + ',' + item + ',' + item + ',' + item);

                return tempString.split(',').map(val => Number(val));
            }
        } else {
            if (!unfold) {
                return item;
            } else {
                return item + '?' + item + '?' + item + '?' + item + '?' + item;
            }
        }
    }));

    data.forEach(line => {
        sum += isArrangement(line[0], line[1], {});
    });

    return sum;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');

    console.log('Result a)', solve(input));
    console.log('Result b)', solve(input, true));
} catch (error) {
    console.log('Error:', error);
}