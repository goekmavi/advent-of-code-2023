// https://adventofcode.com/2023/day/20

const fs = require('fs');

const getListOfInputModules = (moduleName, input) => {
    const map = new Map();
    const tempArr = input.split('\n').map(line => line.split('->').map(val => val.trim()));

    for (line of tempArr) {
        if (line[0] !== 'broadcaster') {
            const name = line[0].substring(1);
            const items = line[1].split(',').map(item => item.trim());

            if (items.includes(moduleName)) {
                map.set(name, 'low')
            }
        }
    }

    return map;
}

const pressButton = (map, amount, stopModule) => {
    let totalLowPulses = 0;
    let totalHighPulses = 0;

    for (let i = 0; i < amount; i++) {
        const stack = [];

        let stopModuleCounter = 0;

        totalLowPulses++; // button -low-> broadcaster

        // console.log('button - low -> broadcaster');

        map.get('broadcaster').destinationModules.forEach(moduleName => {
            stack.push(new Map().set(moduleName, 'low:broadcaster'));
        });

        while (stack.length > 0) {
            const [currentModuleName, currentModuleProps] = stack[0].entries().next().value;
            const [currentModulePulse, currentModuleSender] = currentModuleProps.split(':');
            
            stack.shift();

            if (currentModulePulse === 'low') {
                totalLowPulses++;
            } else if (currentModulePulse === 'high') {
                totalHighPulses++;
            }

            if (stopModule !== undefined && currentModuleName === stopModule) {
                stopModuleCounter++;
            }

            // console.log(currentModuleSender, '-', currentModulePulse, '->', currentModuleName);

            if (map.has(currentModuleName)) {
                if (map.get(currentModuleName).type === 'flipflop') {
                    if (currentModulePulse === 'low') {
                        map.get(currentModuleName).isOn = !map.get(currentModuleName).isOn;
    
                        let pulseType = undefined;
    
                        if (map.get(currentModuleName).isOn) {
                            pulseType = 'high';
                        } else {
                            pulseType = 'low';
                        }
    
                        map.get(currentModuleName).destinationModules.forEach(moduleName => {
                            stack.push(new Map().set(moduleName, pulseType + ':' + currentModuleName));
                        });
                    }
                } else if (map.get(currentModuleName).type === 'conjunction') {
                    map.get(currentModuleName).inputModules.set(currentModuleSender, currentModulePulse);
    
                    let allPulsesHigh = true;
    
                    for (let [key, value] of map.get(currentModuleName).inputModules) {
                        if (value === 'low') {
                            allPulsesHigh = false;
    
                            break;
                        }
                    }
    
                    if (allPulsesHigh) {
                        map.get(currentModuleName).destinationModules.forEach(moduleName => {
                            stack.push(new Map().set(moduleName, 'low' + ':' + currentModuleName));
                        });
                    } else {
                        map.get(currentModuleName).destinationModules.forEach(moduleName => {
                            stack.push(new Map().set(moduleName, 'high' + ':' + currentModuleName));
                        });
                    }
                }
            }
        }

        // console.log('------------------');

        if (stopModule !== undefined && stopModuleCounter === 1) {
            console.log('Done!', stopModuleCounter, i);
            return i;
        }
    }

    return totalHighPulses * totalLowPulses;
}

const initMap = input => {
    const map = new Map();

    const modules = input.split('\n').map(line => {
        const lineArr = line.split('->').map(val => val.trim());

        if (lineArr[0][0] === '%') {
            map.set(lineArr[0].substring(1), {
                value: lineArr[0].substring(1),
                type: 'flipflop',
                destinationModules: lineArr[1].split(',').map(val => val.trim()),
                isOn: false
            });
        } else if (lineArr[0][0] === '&') {
            map.set(lineArr[0].substring(1), {
                value: lineArr[0].substring(1),
                type: 'conjunction',
                destinationModules: lineArr[1].split(',').map(val => val.trim()),
                inputModules: getListOfInputModules(lineArr[0].substring(1), input)
            });
        } else if (lineArr[0] === 'broadcaster') {
            map.set(lineArr[0], {
                type: 'broadcaster',
                destinationModules: lineArr[1].split(',').map(val => val.trim())
            });
        }
    });

    return map;
}

const solve = (input, amount, stopModule) => {
    const modulesMap = initMap(input);

    return pressButton(modulesMap, amount, stopModule);
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');

    // console.log('Result a)', solve(input, 1000));
    console.log('Result b)', solve(input, Number.MAX_VALUE, 'rx'));
} catch(error) {
    console.log('Error:', error);
}