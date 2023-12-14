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
    let data = input.split('\n').map(line => line.split(''));

    if (cycleAmount === 0) {
        data = tiltNorth(data);
    } else {
        for (let i = 1; i <= cycleAmount; i++) {
            data = tiltNorth(data);
            data = tiltWest(data);
            data = tiltSouth(data);
            data = tiltEast(data);
        }
    }
    
    // console.log(data.map(chars => chars.join('')));
    return totalLoad(data);
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');

    console.log('Result a)', solve(input));
    console.log('Result b)', solve(input, 3));
} catch (error) {
    console.log('Error:', error);
}