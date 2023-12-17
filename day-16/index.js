// https://adventofcode.com/2023/day/16

const fs = require('fs');

const solve = (data, startObj) => {
    const stack = [];
    const energizedMat = [];
    
    let sum = 0;

    stack.push({
        direction: startObj.direction,
        value: data[startObj.i][startObj.j],
        i: startObj.i,
        j: startObj.j
    });

    while (stack.length > 0) {
        let currentObj = stack[0];
        let currentStackEnd = false;

        while (!currentStackEnd) {
            if (energizedMat[currentObj.i] === undefined) {
                energizedMat[currentObj.i] = [];
            }
        
            if (energizedMat[currentObj.i][currentObj.j] === undefined) {
                energizedMat[currentObj.i][currentObj.j] = [];
            }

            for (let tempI = 0; tempI < energizedMat[currentObj.i][currentObj.j].length; tempI++) {
                if (energizedMat[currentObj.i][currentObj.j][tempI] !== undefined && (currentObj.direction === energizedMat[currentObj.i][currentObj.j][tempI].direction)) {
                    currentStackEnd = true;
                    stack.shift();

                    break;
                }
            }

            if (!currentStackEnd) {
                energizedMat[currentObj.i][currentObj.j].push({
                    direction: currentObj.direction,
                    value: data[currentObj.i][currentObj.j],
                    i: currentObj.i,
                    j: currentObj.j
                });

                if (data[currentObj.i][currentObj.j] === '.') {
                    if (currentObj.direction === 0) {
                        if (data[currentObj.i][currentObj.j + 1] !== undefined) {
                            currentObj.j = currentObj.j + 1;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    } else if (currentObj.direction === 1) {
                        if (data[currentObj.i][currentObj.j - 1] !== undefined) {
                            currentObj.j = currentObj.j - 1;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    } else if (currentObj.direction === 2) {
                        if (data[currentObj.i + 1] !== undefined && data[currentObj.i + 1][currentObj.j] !== undefined) {
                            currentObj.i = currentObj.i + 1;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    } else if (currentObj.direction === 3) {
                        if (data[currentObj.i - 1] !== undefined && data[currentObj.i - 1][currentObj.j] !== undefined) {
                            currentObj.i = currentObj.i - 1;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    }
                } else if (data[currentObj.i][currentObj.j] === '/') {
                    if (currentObj.direction === 0) {
                        if (data[currentObj.i - 1] !== undefined && data[currentObj.i - 1][currentObj.j] !== undefined) {
                            currentObj.i = currentObj.i - 1;
                            currentObj.direction = 3;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    } else if (currentObj.direction === 1) {
                        if (data[currentObj.i + 1] !== undefined && data[currentObj.i + 1][currentObj.j] !== undefined) {
                            currentObj.i = currentObj.i + 1;
                            currentObj.direction = 2;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    } else if (currentObj.direction === 2) {
                        if (data[currentObj.i][currentObj.j - 1] !== undefined) {
                            currentObj.j = currentObj.j - 1;
                            currentObj.direction = 1;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    } else if (currentObj.direction === 3) {
                        if (data[currentObj.i][currentObj.j + 1] !== undefined) {
                            currentObj.j = currentObj.j + 1;
                            currentObj.direction = 0;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    }
                } else if (data[currentObj.i][currentObj.j] === '\\') {
                    if (currentObj.direction === 0) {
                        if (data[currentObj.i + 1] !== undefined && data[currentObj.i + 1][currentObj.j] !== undefined) {
                            currentObj.i = currentObj.i + 1;
                            currentObj.direction = 2;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    } else if (currentObj.direction === 1) {
                        if (data[currentObj.i - 1] !== undefined && data[currentObj.i - 1][currentObj.j] !== undefined) {
                            currentObj.i = currentObj.i - 1;
                            currentObj.direction = 3;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    } else if (currentObj.direction === 2) {
                        if (data[currentObj.i][currentObj.j + 1] !== undefined) {
                            currentObj.j = currentObj.j + 1;
                            currentObj.direction = 0;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    } else if (currentObj.direction === 3) {
                        if (data[currentObj.i][currentObj.j - 1] !== undefined) {
                            currentObj.j = currentObj.j - 1;
                            currentObj.direction = 1;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    }
                } else if (data[currentObj.i][currentObj.j] === '-') {
                    if (currentObj.direction === 0) {
                        if (data[currentObj.i][currentObj.j + 1] !== undefined) {
                            currentObj.j = currentObj.j + 1;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    } else if (currentObj.direction === 1) {
                        if (data[currentObj.i][currentObj.j - 1] !== undefined) {
                            currentObj.j = currentObj.j - 1;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    } else if (currentObj.direction === 2) {
                        const currentJ = currentObj.j;

                        if (data[currentObj.i][currentObj.j - 1] !== undefined) {
                            currentObj.j = currentObj.j - 1;
                            currentObj.direction = 1;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }

                        if (data[currentObj.i][currentJ + 1] !== undefined) {
                            stack.push({
                                direction: 0,
                                value: data[currentObj.i][currentJ + 1],
                                i: currentObj.i,
                                j: currentJ + 1
                            });
                        }
                    } else if (currentObj.direction === 3) {
                        const currentJ = currentObj.j;
                        
                        if (data[currentObj.i][currentObj.j - 1] !== undefined) {
                            currentObj.j = currentObj.j - 1;
                            currentObj.direction = 1;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }

                        if (data[currentObj.i][currentJ + 1] !== undefined) {
                            stack.push({
                                direction: 0,
                                value: data[currentObj.i][currentJ + 1],
                                i: currentObj.i,
                                j: currentJ + 1
                            });
                        }
                    }
                } else if (data[currentObj.i][currentObj.j] === '|') {
                    if (currentObj.direction === 0) {
                        const currentI = currentObj.i;

                        if (data[currentObj.i - 1] !== undefined && data[currentObj.i - 1][currentObj.j] !== undefined) {
                            currentObj.i = currentObj.i - 1;
                            currentObj.direction = 3;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }

                        if (data[currentI + 1] !== undefined && data[currentI + 1][currentObj.j] !== undefined) {
                            stack.push({
                                direction: 2,
                                value: data[currentI + 1][currentObj.j],
                                i: currentI + 1,
                                j: currentObj.j
                            });
                        }
                    } else if (currentObj.direction === 1) {
                        const currentI = currentObj.i;

                        if (data[currentObj.i - 1] !== undefined && data[currentObj.i - 1][currentObj.j] !== undefined) {
                            currentObj.i = currentObj.i - 1;
                            currentObj.direction = 3;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }

                        if (data[currentI + 1] !== undefined && data[currentI + 1][currentObj.j] !== undefined) {
                            stack.push({
                                direction: 2,
                                value: data[currentI + 1][currentObj.j],
                                i: currentI + 1,
                                j: currentObj.j
                            });
                        }
                    } else if (currentObj.direction === 2) {
                        if (data[currentObj.i + 1] !== undefined && data[currentObj.i + 1][currentObj.j] !== undefined) {
                            currentObj.i = currentObj.i + 1;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    } else if (currentObj.direction === 3) {
                        if (data[currentObj.i - 1] !== undefined && data[currentObj.i - 1][currentObj.j] !== undefined) {
                            currentObj.i = currentObj.i - 1;
                        } else {
                            currentStackEnd = true;
                            stack.shift();
                        }
                    }
                }
            }
        }
    }

    energizedMat.forEach(line => {
        line.forEach(item => {
            sum++;
        });
    });

    return sum;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const data = input.split('\n').map(line => line.split(''));

    let max = 0;

    /**
     * directions:
     * 0: from left to right
     * 1: from right to left
     * 2: from top to bottom
     * 3: from bottom to top
     */
    console.log('Result a)', solve(data, {
        direction: 0,
        i: 0,
        j: 0
    }));

    for (let j = 0; j < data[0].length; j++) {
        let topToBottom = solve(data, {
            direction: 2,
            i: 0,
            j: j
        });

        if (topToBottom > max) {
            max = topToBottom
        }

        let bottomToTop = solve(data, {
            direction: 3,
            i: data.length - 1,
            j: j
        });

        if (bottomToTop > max) {
            max = bottomToTop
        }
    }

    for (let i = 0; i < data.length; i++) {
        let leftToRight = solve(data, {
            direction: 0,
            i: i,
            j: 0
        });

        if (leftToRight > max) {
            max = leftToRight
        }

        let rightToLeft = solve(data, {
            direction: 1,
            i: i,
            j: data[i].length - 1
        });

        if (rightToLeft > max) {
            max = rightToLeft
        }
    }

    console.log('Result b)', max);
} catch(error) {
    console.log('Error:', error);
}