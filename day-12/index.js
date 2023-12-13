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
        sum += isArrangement(line[0], line[1]);
    });

    return sum;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');

    console.log('Result a)', solve(input));
} catch (error) {
    console.log('Error:', error);
}