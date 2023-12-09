const fs = require('fs');

const calcNextValue = (arr, part) => {
    let result = 0;

    if (part === 'A') {
        for (let i = arr.length - 2; i >= 0; i--) {
            result += arr[i][arr[i].length - 1];
        }
    } else if (part === 'B') {
        for (let i = arr.length - 2; i >= 0; i--) {
            result = arr[i][0] - result;
        }
    }

    return result;
}

const solve = (input, part) => {
    const data = input.split('\n');

    let sum = 0;

    data.forEach(arr => {
        const numbers = arr.split(' ').map(val => Number(val));
        const resultArr = [numbers];

        let reachedEnd = false;
        let iterationArr = numbers;

        while (!reachedEnd) {
            const nextArr = [];
            let countZeros = 0;
            
            for (let i = 0; i < iterationArr.length - 1; i++) {
                let diff = iterationArr[i + 1] - iterationArr[i];
        
                if (diff === 0) {
                    countZeros++;
                }
        
                nextArr.push(diff);
            }
            
            resultArr.push(nextArr);

            iterationArr = nextArr;

            if (countZeros === nextArr.length) {
                reachedEnd = true;
            }
        }

        sum += calcNextValue(resultArr, part);
    });

    return sum;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    
    console.log('Result a)', solve(input, 'A'));
    console.log('Result b)', solve(input, 'B'));
} catch (error) {
    console.log('Error:', error);
}