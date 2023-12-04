const fs = require('fs');

const isSymbol = val => {
    if (val !== undefined && /[^0-9|.]/.test(val)) {
        return true;
    }

    return false;
}

const calcGearRatio = (arr, i, currentIndex, left, leftIndex, right, rightIndex, top, topIndex, bottom, bottomIndex, topLeft, topLeftIndex, topRight, topRightIndex, bottomLeft, bottomLeftIndex, bottomRight, bottomRightIndex) => {
    const gears = [];

    let numberLeft = '';
    let numberRight = '';
    let numberTopLeft = '';
    let numberTopRight = '';
    let numberBottomLeft = '';
    let numberBottomRight = '';
    let numberTop = '';
    let numberBottom = '';

    if (left !== undefined && /\d/.test(left)) {
        numberLeft += left;

        let reachedEnd = false;
        let tempIndex = leftIndex - 1;

        while (!reachedEnd) {
            if (arr[tempIndex] !== undefined && /\d/.test(arr[tempIndex])) {
                numberLeft = arr[tempIndex] + numberLeft;

                if (tempIndex % i === 0) {
                    reachedEnd = true;
                }

                tempIndex--;
            } else {
                reachedEnd = true;
            }
        }

        gears.push(numberLeft);
    }

    if (right !== undefined && /\d/.test(right)) {
        numberRight += right;

        let reachedEnd = false;
        let tempIndex = rightIndex + 1;

        while (!reachedEnd) {
            if (arr[tempIndex] !== undefined && /\d/.test(arr[tempIndex])) {
                numberRight += arr[tempIndex];

                if (tempIndex % i === i - 1) {
                    reachedEnd = true;
                }

                tempIndex++;
            } else {
                reachedEnd = true;
            }
        }

        gears.push(numberRight);
    }

    if (top === '.' || top === undefined) {
        if (topLeft !== undefined && /\d/.test(topLeft)) {
            numberTopLeft += topLeft;
    
            let reachedEnd = false;
            let tempIndex = topLeftIndex - 1;
    
            while (!reachedEnd) {
                if (arr[tempIndex] !== undefined && /\d/.test(arr[tempIndex])) {
                    numberTopLeft = arr[tempIndex] + numberTopLeft;
    
                    if (tempIndex % i === 0) {
                        reachedEnd = true;
                    }
    
                    tempIndex--;
                } else {
                    reachedEnd = true;
                }
            }
    
            gears.push(numberTopLeft);
        }

        if (topRight !== undefined && /\d/.test(topRight)) {
            numberTopRight += topRight;
    
            let reachedEnd = false;
            let tempIndex = topRightIndex + 1;
    
            while (!reachedEnd) {
                if (arr[tempIndex] !== undefined && /\d/.test(arr[tempIndex])) {
                    numberTopRight += arr[tempIndex];
    
                    if (tempIndex % i === i - 1) {
                        reachedEnd = true;
                    }
    
                    tempIndex++;
                } else {
                    reachedEnd = true;
                }
            }
    
            gears.push(numberTopRight);
        }
    } else {
        if (top !== undefined && /\d/.test(top)) {
            numberTop += top;

            if (topLeft !== undefined && /\d/.test(topLeft)) {
                numberTop = topLeft + numberTop;
        
                let reachedEnd = false;
                let tempIndex = topLeftIndex - 1;
        
                while (!reachedEnd) {
                    if (arr[tempIndex] !== undefined && /\d/.test(arr[tempIndex])) {
                        numberTop = arr[tempIndex] + numberTop;
        
                        if (tempIndex % i === 0) {
                            reachedEnd = true;
                        }
        
                        tempIndex--;
                    } else {
                        reachedEnd = true;
                    }
                }
            }
    
            if (topRight !== undefined && /\d/.test(topRight)) {
                numberTop += topRight;
        
                let reachedEnd = false;
                let tempIndex = topRightIndex + 1;
        
                while (!reachedEnd) {
                    if (arr[tempIndex] !== undefined && /\d/.test(arr[tempIndex])) {
                        numberTop += arr[tempIndex];
        
                        if (tempIndex % i === i - 1) {
                            reachedEnd = true;
                        }
        
                        tempIndex++;
                    } else {
                        reachedEnd = true;
                    }
                }
            }

            gears.push(numberTop);
        }
    }
    

    if (bottom === '.' || bottom === undefined) {
        if (bottomLeft !== undefined && /\d/.test(bottomLeft)) {
            numberBottomLeft += bottomLeft;
    
            let reachedEnd = false;
            let tempIndex = bottomLeftIndex - 1;
    
            while (!reachedEnd) {
                if (arr[tempIndex] !== undefined && /\d/.test(arr[tempIndex])) {
                    numberBottomLeft = arr[tempIndex] + numberBottomLeft;
    
                    if (tempIndex % i === 0) {
                        reachedEnd = true;
                    }
    
                    tempIndex--;
                } else {
                    reachedEnd = true;
                }
            }
    
            gears.push(numberBottomLeft);
        }

        if (bottomRight !== undefined && /\d/.test(bottomRight)) {
            numberBottomRight += bottomRight;
    
            let reachedEnd = false;
            let tempIndex = bottomRightIndex + 1;
    
            while (!reachedEnd) {
                if (arr[tempIndex] !== undefined && /\d/.test(arr[tempIndex])) {
                    numberBottomRight += arr[tempIndex];
    
                    if (tempIndex % i === i - 1) {
                        reachedEnd = true;
                    }
    
                    tempIndex++;
                } else {
                    reachedEnd = true;
                }
            }
    
            gears.push(numberBottomRight);
        }
    } else {
        if (bottom !== undefined && /\d/.test(bottom)) {
            numberBottom += bottom;

            if (bottomLeft !== undefined && /\d/.test(bottomLeft)) {
                numberBottom = bottomLeft + numberBottom;
        
                let reachedEnd = false;
                let tempIndex = bottomLeftIndex - 1;
        
                while (!reachedEnd) {
                    if (arr[tempIndex] !== undefined && /\d/.test(arr[tempIndex])) {
                        numberBottom = arr[tempIndex] + numberBottom;
        
                        if (tempIndex % i === 0) {
                            reachedEnd = true;
                        }
        
                        tempIndex--;
                    } else {
                        reachedEnd = true;
                    }
                }
            }
    
            if (bottomRight !== undefined && /\d/.test(bottomRight)) {
                numberBottom += bottomRight;
        
                let reachedEnd = false;
                let tempIndex = bottomRightIndex + 1;
        
                while (!reachedEnd) {
                    if (arr[tempIndex] !== undefined && /\d/.test(arr[tempIndex])) {
                        numberBottom += arr[tempIndex];
        
                        if (tempIndex % i === i - 1) {
                            reachedEnd = true;
                        }
        
                        tempIndex++;
                    } else {
                        reachedEnd = true;
                    }
                }
            }

            gears.push(numberBottom);
        }
    }

    // console.log('gears', gears);
    if (gears.length === 2) {
        return gears[0] * gears[1];
    } else {
        return 0;
    }
}

const calcSumPartA = (arr, i) => {
    let sum = 0;
    let number = '';
    let isPartNumber = false;

    for (let index = 0; index < arr.length; index++) {
        if (/\d/.test(arr[index])) {
            if (index % i === 0) {
                if (number !== '' && isPartNumber) {
                    // console.log(Number(number));
                    sum += Number(number);
                }
    
                isPartNumber = false;
                number = '';
            }

            number += arr[index];

            let previous = isSymbol(arr[index - 1]);
            let over = isSymbol(arr[index - i]);
            let prevDiagonalA = isSymbol(arr[index - (i + 1)]);
            let prevDiagonalB = isSymbol(arr[index - (i - 1)]);
    
            let next = isSymbol(arr[index + 1]);
            let under = isSymbol(arr[index + i]);
            let nextDiagonalA = isSymbol(arr[index + (i - 1)]);
            let nextDiagonalB = isSymbol(arr[index + (i + 1)]);

            if (index % i === 0) {
                previous = false;
                prevDiagonalA = false;
                nextDiagonalA = false;
            } else if (index % i === i - 1) {
                next = false;
                prevDiagonalB = false;
                nextDiagonalB = false;
            }

            if (previous || next || prevDiagonalA || prevDiagonalB || nextDiagonalA || nextDiagonalB || over || under) {
                isPartNumber = true;
            }
        } else {
            if (number !== '' && isPartNumber) {
                // console.log(Number(number));
                sum += Number(number);
            }

            isPartNumber = false;
            number = '';
        }
    }

    if (number !== '' && isPartNumber) {
        // console.log(Number(number));
        sum += Number(number);
    }

    return sum;
}

const calcSumPartB = (arr, i) => {
    let sum = 0;

    for (let index = 0; index < arr.length; index++) {
        if (/\*/.test(arr[index])) {
            let left = arr[index - 1];
            let right = arr[index + 1];
            let top = arr[index - i];
            let bottom = arr[index + i];
            let topLeft = arr[index - i - 1];
            let topRight = arr[index - i + 1];
            let bottomLeft = arr[index + i - 1];
            let bottomRight = arr[index + i + 1];

            if (index % i === 0) {
                left = undefined;
                topLeft = undefined;
                bottomLeft = undefined;
            } else if (index % i === i - 1) {
                right = undefined;
                topRight = undefined;
                bottomRight = undefined;
            }

            sum += calcGearRatio(arr, i, index, left, index - 1, right, index + 1, top, index - i, bottom, index + i, topLeft, index - i - 1, topRight, index - i + 1, bottomLeft, index + i - 1, bottomRight, index + i + 1);
        }
    }

    return sum;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8').toString();
    const data = [];
    let j;

    for (let i = 0; i < input.length; i++) {
        if (input[i] !== '\n') {
            data.push(input[i]);
        } else if (j === undefined) {
            j = i;
        }
    }

    const sumPartA = calcSumPartA(data, j);
    const sumPartB = calcSumPartB(data, j);

    console.log('Result part A)', sumPartA);
    console.log('Result part B)', sumPartB);
} catch(error) {
    console.log('Error:', error);
}