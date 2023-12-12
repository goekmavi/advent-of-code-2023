const fs = require('fs');

const isArrangement = (arrangementString, arrangementNumbers) => {
    if (arrangementString.match(/\?/)) {
        return isArrangement(arrangementString.replace(/\?/, '.'), arrangementNumbers) + isArrangement(arrangementString.replace(/\?/, '#'), arrangementNumbers);
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
                return 1;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }
}

const solveSilver = input => {
    let sum = 0;

    const data = input.split('\n').map(line => line.split(' ').map((item, itemIndex) => {
        if (itemIndex === 1) {
            return item.split(',').map(val => Number(val));
        } else {
            return item;
        }
    }));

    data.forEach(line => {
        sum += isArrangement(line[0], line[1]);
    });

    return sum;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');

    console.log('Result a)', solveSilver(input));
} catch (error) {
    console.log('Error:', error);
}