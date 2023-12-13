const fs = require('fs');

const isArrangement = (arrangementString, arrangementNumbers, memoization) => {
    if (memoization[arrangementString]) {
        return memoization[arrangementString];
    }

    let returnValue = 0;

    if (arrangementString.match(/\?/)) {
        returnValue = isArrangement(arrangementString.replace(/\?/, '.'), arrangementNumbers, memoization) + isArrangement(arrangementString.replace(/\?/, '#'), arrangementNumbers, memoization);
    } else {
        matchArr = arrangementString.match(/\#+/g);

        if (matchArr && (matchArr.length === arrangementNumbers.length)) {
            let match = true;

            matchArr.forEach((item, itemIndex) => {
                if (item.length !== arrangementNumbers[itemIndex]) {
                    match = false;
                }
            });

            if (match) {
                returnValue = 1;
            } else {
                returnValue = 0;
            }
        } else {
            returnValue = 0;
        }
    }

    memoization[arrangementString] = returnValue;

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