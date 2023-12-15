// https://adventofcode.com/2023/day/14

const fs = require('fs');

const tiltNorth = data => {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === 'O') {
                let tempIndex = undefined;

                for (let z = i - 1; z >= 0; z--) {
                    if (data[z] !== undefined) {
                        if (data[z][j] === '.') {
                            tempIndex = z;
                        } else {
                            break;
                        }
                    }
                }

                if (tempIndex !== undefined) {
                    data[tempIndex][j] = 'O';
                    data[i][j] = '.';
                }
            }
        }
    }

    return data;
}

const tiltEast = data => {
    for (let j = data[0].length - 1; j >= 0; j--) {
        for (let i = 0; i < data.length; i++) {
            if (data[i][j] === 'O') {
                let tempIndex = undefined;

                for (let z = j + 1; z < data[0].length; z++) {
                    if (data[z] !== undefined) {
                        if (data[i][z] === '.') {
                            tempIndex = z;
                        } else {
                            break;
                        }
                    }
                }

                if (tempIndex !== undefined) {
                    data[i][tempIndex] = 'O';
                    data[i][j] = '.';
                }
            }
        }
    }

    return data;
}

const tiltSouth = data => {
    for (let i = data.length - 1; i >= 0; i--) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === 'O') {
                let tempIndex = undefined;

                for (let z = i + 1; z < data.length; z++) {
                    if (data[z] !== undefined) {
                        if (data[z][j] === '.') {
                            tempIndex = z;
                        } else {
                            break;
                        }
                    }
                }

                if (tempIndex !== undefined) {
                    data[tempIndex][j] = 'O';
                    data[i][j] = '.';
                }
            }
        }
    }

    return data;
}

const tiltWest = data => {
    for (let j = 0; j < data[0].length; j++) {
        for (let i = 0; i < data.length; i++) {
            if (data[i][j] === 'O') {
                let tempIndex = undefined;

                for (let z = j - 1; z >= 0; z--) {
                    if (data[z] !== undefined) {
                        if (data[i][z] === '.') {
                            tempIndex = z;
                        } else {
                            break;
                        }
                    }
                }

                if (tempIndex !== undefined) {
                    data[i][tempIndex] = 'O';
                    data[i][j] = '.';
                }
            }
        }
    }

    return data;
}

const totalLoad = data => {
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
        let count = 0;

        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === 'O') {
                count++;
            }
        }

        sum += count * (data.length - i);
    }

    return sum;
}

const solve = (input, cycleAmount = 0) => {
    const cycle = 1000000000;

    let data = input.split('\n').map(line => line.split(''));

    if (cycleAmount === 0) {
        data = tiltNorth(data);
    } else {
        const indexMap = new Map();
        const testArr = [];

        for (let i = 0; i <= cycleAmount; i++) {
            data = tiltNorth(data);
            data = tiltWest(data);
            data = tiltSouth(data);
            data = tiltEast(data);

            const dataAsString = data.toString();

            if (!indexMap.has(dataAsString)) {
                indexMap.set(dataAsString, [i]);
            } else {
                indexMap.set(dataAsString, [i, ...indexMap.get(dataAsString)]);
            }
        }

        indexMap.forEach(indexArr => {
            if (indexArr.length > 1) {
                const diffAmountMap = new Map();
                
                let amount = undefined;

                for (let i = 0, j = i + 1; i < indexArr.length - 1; i++, j++) {
                    if (!diffAmountMap.has(indexArr[i] - indexArr[j])) {
                        diffAmountMap.set(indexArr[i] - indexArr[j], 1);
                    } else {
                        diffAmountMap.set(indexArr[i] - indexArr[j], diffAmountMap.get(indexArr[i] - indexArr[j]) + 1);
                    }
                }

                diffAmountMap.forEach((val, key) => {
                    amount = key; // diffAmountMap contains always only one item, for my input: 34
                });

                testArr.push({
                    amount: amount,
                    array: indexArr
                });
            }
        });

        testArr.forEach(arr => {
            if (((cycle - arr.array[0]) % arr.amount) === 0) {
                // console.log('->', arr.array[0]);
            }
        });
    }

    return totalLoad(data);
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');

    console.log('Result a)', solve(input));

    // solve(9986) = 112433 R: 0 (wrong)
    // solve(9985) = 112452 R: 1
    // solve(9987) = 112420 R: 33
    console.log('Result b)', solve(input, 10000));
} catch (error) {
    console.log('Error:', error);
}