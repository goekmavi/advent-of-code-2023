const fs = require('fs');

const findEdges = (pattern, isVertical, firstIndex, secondIndex) => {
    if (isVertical) {
        let j1 = firstIndex - 1;
        let j2 = secondIndex + 1;
    
        while (true) {
            for (let i = 0; i < pattern.length; i++) {
                if (pattern[i][j1] !== pattern[i][j2]) {
                    j1++;
                    j2--;
    
                    if (j1 === 0 || j2 === pattern[0].length - 1) {
                        return [true, j1, j2];
                    } else {
                        return [false, null, null];
                    }
                }
            }
    
            j1--;
            j2++;
        }
    } else {
        let i1 = firstIndex - 1;
        let i2 = secondIndex + 1;
    
        while (true) {
            for (let j = 0; j < pattern[0].length; j++) {
                if ((pattern[i1] === undefined || pattern[i2] === undefined) || (pattern[i1][j] !== pattern[i2][j])) {
                    i1++;
                    i2--;
    
                    if (i1 === 0 || i2 === pattern.length - 1) {
                        return [true, i1, i2];
                    } else {
                        return [false, null, null];
                    }
                }
            }
    
            i1--;
            i2++;
        }
    }
}

const findHorizontalLine = (pattern, mainIndex = undefined) => {
    const columnLength = pattern[0].length;

    for (let i = 0; i < pattern.length - 1; i++) {
        let matchCount = 0;

        for (let j = 0; j < columnLength; j++) {
            if (pattern[i][j] === pattern[i + 1][j]) {
                matchCount++;
            }
        }

        if (matchCount === columnLength) {
            const [hasHorizontalReflection, leftEdge, rightEdge] = findEdges(pattern, false, i, i + 1);

            if (mainIndex === undefined) {
                if (hasHorizontalReflection) {
                    return (i + 1);
                }
            } else {
                if (hasHorizontalReflection && (mainIndex !== i + 1)) {
                    return (i + 1);
                }
            }
        }
    }

    return 0;
}

const findVerticalLine = (pattern, mainIndex = undefined) => {
    const columnLength = pattern[0].length;

    for (let j = 0; j < columnLength - 1; j++) {
        let matchCount = 0;

        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i][j] === pattern[i][j + 1]) {
                matchCount++;
            }
        }

        if (matchCount === pattern.length) {
            const [hasVerticalReflection, leftEdge, rightEdge] = findEdges(pattern, true, j, j + 1);

            if (mainIndex === undefined) {
                if (hasVerticalReflection) {
                    return (j + 1);
                }
            } else {
                if (hasVerticalReflection && (mainIndex !== j + 1)) {
                    return (j + 1);
                }
            }
        }
    }

    return 0;
}

const solve = (input, isPartB = false) => {
    const data = input.split(/\n\s*\n/).map(pattern => pattern.split('\n'));

    if (!isPartB) {
        let sum = 0;
    
        data.forEach(pattern => {
            sum += findVerticalLine(pattern) + (findHorizontalLine(pattern) * 100);
        });
    
        return sum;
    } else {
        let sum = 0;

        data.forEach(pattern => {
            let tempSecondSum = 0;
            let tempMainVertical = findVerticalLine(pattern);
            let tempMainHorizontal = findHorizontalLine(pattern);
            let tempCurrentVertical = 0;
            let tempCurrentHorizontal = 0;

            for (let z = 0; z < pattern.length * pattern[0].length; z++) {
                let tempPattern = [];

                for (let i = 0; i < pattern.length; i++) {
                    let tempLine = '';
    
                    for (let j = 0; j < pattern[i].length; j++) {
                        if (((i * pattern[i].length) + j) === z) {
                            if (pattern[i][j] === '#') {
                                tempLine += '.';
                            } else if (pattern[i][j] === '.') {
                                tempLine += '#';
                            }
                        } else {
                            tempLine += pattern[i][j];
                        }
                    }

                    tempPattern.push(tempLine);
                }

                tempCurrentVertical = findVerticalLine(tempPattern, tempMainVertical);
                tempCurrentHorizontal = findHorizontalLine(tempPattern, tempMainHorizontal);

                if ((tempCurrentVertical + tempCurrentHorizontal) !== 0) {
                    tempSecondSum = tempCurrentVertical + (tempCurrentHorizontal * 100);
                }
            }

            sum += tempSecondSum;
        });

        return sum;
    }
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');

    console.log('Result a)', solve(input));
    console.log('Result b)', solve(input, true));
} catch (error) {
    console.log('Error:', error);
}