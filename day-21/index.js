// https://adventofcode.com/2023/day/21

const fs = require('fs');

const solve = (map, finalSteps, startPos) => {
    const stack = new Map();

    let steps = 0;
    let plotAmounts = 0;

    stack.set(startPos.i + ':' + startPos.j, {
        i: startPos.i,
        j: startPos.j
    });

    while (steps < finalSteps) {
        const stackSize = stack.size;

        for (let z = 0; z < stackSize; z++) {
            const currentItem = stack.entries().next().value;
            const pos = currentItem[1].i + ':' + currentItem[1].j;
            const top = (currentItem[1].i - 1) + ':' + currentItem[1].j;
            const right = currentItem[1].i + ':' + (currentItem[1].j + 1);
            const bottom = (currentItem[1].i + 1) + ':' + currentItem[1].j;
            const left = currentItem[1].i + ':' + (currentItem[1].j - 1);

            plotAmounts = 0;
    
            stack.delete(currentItem[0]);

            if (map.has(top) && map.get(top).isPlot) {
                stack.set(map.get(top).i + ':' + map.get(top).j, {
                    i: map.get(top).i,
                    j: map.get(top).j
                });

                plotAmounts++;
            }

            if (map.has(right) && map.get(right).isPlot) {
                stack.set(map.get(right).i + ':' + map.get(right).j, {
                    i: map.get(right).i,
                    j: map.get(right).j
                });

                plotAmounts++;
            }

            if (map.has(bottom) && map.get(bottom).isPlot) {
                stack.set(map.get(bottom).i + ':' + map.get(bottom).j, {
                    i: map.get(bottom).i,
                    j: map.get(bottom).j
                });

                plotAmounts++;
            }

            if (map.has(left) && map.get(left).isPlot) {
                stack.set(map.get(left).i + ':' + map.get(left).j, {
                    i: map.get(left).i,
                    j: map.get(left).j
                });

                plotAmounts++;
            }
        }

        steps++;
    }

    //console.log(stack);
    //console.log(plotAmounts);

    return stack.size;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const map = new Map();
    const startPos = {
        i: undefined,
        j: undefined
    };

    input.split('\n').forEach((line, lineIndex) => line.split('').forEach((char, charIndex) => {
        if (char === 'S') {
            map.set(lineIndex + ':' + charIndex, {
                isPlot: true,
                i: lineIndex,
                j: charIndex
            });

            startPos.i = lineIndex;
            startPos.j = charIndex;
        } else if (char === '.') {
            map.set(lineIndex + ':' + charIndex, {
                isPlot: true,
                i: lineIndex,
                j: charIndex
            });
        } else if (char === '#') {
            map.set(lineIndex + ':' + charIndex, {
                isPlot: false,
                i: lineIndex,
                j: charIndex
            });
        }
    }));
    
    console.log('Result a)', solve(map, 64, startPos));
    //console.log('Result b)', solve(map, 64, startPos));
} catch(error) {
    console.log('Error:', error);
}