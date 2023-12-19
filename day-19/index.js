// https://adventofcode.com/2023/day/19

const fs = require('fs');

const paths = [];
const pathConditions = [];

const getPaths = (workflows, label, pathsString, conditions) => {
    const currentItems = workflows.get(label);
    const tempConditionsArr = [];

    for (item of currentItems) {
        const conditionArr = item.split(':');

        if (conditionArr.length > 1) {
            const updatedPathString = pathsString + ' ' + conditionArr[1];
            const updatedCondition = [];

            conditions.forEach(val => {
                updatedCondition.push(val);
            });

            updatedCondition.push(conditionArr[0]);
            updatedCondition.push(...tempConditionsArr);

            if (conditionArr[0].includes('>')) {
                let tempArr = conditionArr[0].split('>');
                let tempConditionString = tempArr[0] + '<=' + tempArr[1];

                tempConditionsArr.push(tempConditionString);
            } else if (conditionArr[0].includes('<')) {
                let tempArr = conditionArr[0].split('<');
                let tempConditionString = tempArr[0] + '>=' + tempArr[1];

                tempConditionsArr.push(tempConditionString);
            }

            if (conditionArr[1] === 'A') {
                paths.push(updatedPathString);
                pathConditions.push(updatedCondition);
            } else if (conditionArr[1] !== 'R') {
                getPaths(workflows, conditionArr[1], updatedPathString, updatedCondition);
            }
        } else {
            const updatedPathString = pathsString + ' ' + conditionArr[0];
            const updatedCondition = [];

            conditions.forEach(val => {
                updatedCondition.push(val);
            });

            updatedCondition.push(...tempConditionsArr);

            if (conditionArr[0] === 'A') {
                paths.push(updatedPathString);
                pathConditions.push(updatedCondition);
            } else if (conditionArr[0] !== 'R') {
                getPaths(workflows, conditionArr[0], updatedPathString, updatedCondition);
            }
        }
    }
}

const solveGold = data => {
    const mapWorkflows = new Map();
    const rangesX = [];
    const rangesM = [];
    const rangesA = [];
    const rangesS = [];
    const startLabel = 'in';

    let sum = 0;

    data[0].split('\n').map(line => {
        let tempLine = line.split('{');

        tempLine[1] = tempLine[1].split('');
        tempLine[1].pop();
        tempLine[1] = tempLine[1].join('');

        mapWorkflows.set(tempLine[0], tempLine[1].split(','));
    });

    getPaths(mapWorkflows, startLabel, startLabel, []);

    //console.log(paths);
    //console.log(pathConditions);

    for (conditions of pathConditions) {
        const conditionsMap = new Map();

        for (condition of conditions) {
            let conditionParts;

            if (condition.includes('>=')) {
                conditionParts = condition.split('>=');

                if (conditionsMap.has(conditionParts[0])) {
                    conditionsMap.set(conditionParts[0], [...conditionsMap.get(conditionParts[0]), [4000, Number(conditionParts[1])]]);
                } else {
                    conditionsMap.set(conditionParts[0], [[4000, Number(conditionParts[1])]]);
                }
            } else if (condition.includes('<=')) {
                conditionParts = condition.split('<=');

                if (conditionsMap.has(conditionParts[0])) {
                    conditionsMap.set(conditionParts[0], [...conditionsMap.get(conditionParts[0]), [Number(conditionParts[1]), 1]]);
                } else {
                    conditionsMap.set(conditionParts[0], [[Number(conditionParts[1]), 1]]);
                }
            } else if (condition.includes('>')) {
                conditionParts = condition.split('>');

                if (conditionsMap.has(conditionParts[0])) {
                    conditionsMap.set(conditionParts[0], [...conditionsMap.get(conditionParts[0]), [4000, Number(conditionParts[1]) + 1]]);
                } else {
                    conditionsMap.set(conditionParts[0], [[4000, Number(conditionParts[1]) + 1]]);
                }
            } else if (condition.includes('<')) {
                conditionParts = condition.split('<');

                if (conditionsMap.has(conditionParts[0])) {
                    conditionsMap.set(conditionParts[0], [...conditionsMap.get(conditionParts[0]), [Number(conditionParts[1]) - 1, 1]]);
                } else {
                    conditionsMap.set(conditionParts[0], [[Number(conditionParts[1]) - 1, 1]]);
                }
            }
        }

        if (conditionsMap.has('x')) {
            const arr = conditionsMap.get('x');

            let max = undefined;
            let min = undefined;

            for (item of arr) {
                if (max === undefined || item[0] < max) {
                    max = item[0];
                }

                if (min === undefined || item[1] > min) {
                    min = item[1];
                }
            }

            if (max >= min) {
                rangesX.push([max, min]);
            }
        } else {
            rangesX.push([4000, 1]);
        }

        if (conditionsMap.has('m')) {
            const arr = conditionsMap.get('m');

            let max = undefined;
            let min = undefined;

            for (item of arr) {
                if (max === undefined || item[0] < max) {
                    max = item[0];
                }

                if (min === undefined || item[1] > min) {
                    min = item[1];
                }
            }

            if (max >= min) {
                rangesM.push([max, min]);
            }
        } else {
            rangesM.push([4000, 1]);
        }

        if (conditionsMap.has('a')) {
            const arr = conditionsMap.get('a');

            let max = undefined;
            let min = undefined;

            for (item of arr) {
                if (max === undefined || item[0] < max) {
                    max = item[0];
                }

                if (min === undefined || item[1] > min) {
                    min = item[1];
                }
            }

            if (max >= min) {
                rangesA.push([max, min]);
            }
        } else {
            rangesA.push([4000, 1]);
        }

        if (conditionsMap.has('s')) {
            const arr = conditionsMap.get('s');

            let max = undefined;
            let min = undefined;

            for (item of arr) {
                if (max === undefined || item[0] < max) {
                    max = item[0];
                }

                if (min === undefined || item[1] > min) {
                    min = item[1];
                }
            }

            if (max >= min) {
                rangesS.push([max, min]);
            }
        } else {
            rangesS.push([4000, 1]);
        }
    }

    for (let i = 0; i < rangesX.length; i++) {
        sum += (rangesX[i][0] - rangesX[i][1] + 1) * (rangesM[i][0] - rangesM[i][1] + 1) * (rangesA[i][0] - rangesA[i][1] + 1) * (rangesS[i][0] - rangesS[i][1] + 1);
    }

    return sum;
}

const solveSilver = data => {
    const mapWorkflows = new Map();

    let mapRatings;
    let sum = 0;
    let currentLabel = 'in';
    let stopProcessing = false;

    data[0].split('\n').map(line => {
        let tempLine = line.split('{');

        tempLine[1] = tempLine[1].split('');
        tempLine[1].pop();
        tempLine[1] = tempLine[1].join('');

        mapWorkflows.set(tempLine[0], tempLine[1].split(','));
    });

    mapRatings = data[1].split('\n').map(line => {
        const map = new Map();

        let tempLine = line.split('');

        tempLine.shift();
        tempLine.pop();
        tempLine = tempLine.join('');
        tempLine = tempLine.split(',');

        tempLine = tempLine.forEach(item => {
            const itemArr = item.split('=');
            map.set(itemArr[0], Number(itemArr[1]));
        });

        return map;
    });

    for (rating of mapRatings) {
        let isAccepted = false;

        stopProcessing = false;

        while (!stopProcessing) {
            const workflow = mapWorkflows.get(currentLabel);

            for (let i = 0; i < workflow.length; i++) {
                const conditionArr = workflow[i].split(':');
                
                if (conditionArr.length > 1) {
                    const condition = conditionArr[0];
                    const conditionChar = condition[0];
                    const updatedCondition = rating.get(conditionChar) + condition.substring(1);
                    const nextLabel = conditionArr[1];

                    let compareVal;

                    if (updatedCondition.includes('>')) {
                        let updatedConditionArr = updatedCondition.split('>');

                        compareVal = (Number(updatedConditionArr[0]) > Number(updatedConditionArr[1]));
                    } else if (updatedCondition.includes('<')) {
                        let updatedConditionArr = updatedCondition.split('<');

                        compareVal = (Number(updatedConditionArr[0]) < Number(updatedConditionArr[1]));
                    }

                    if (compareVal) {
                        if (nextLabel === 'A') {
                            stopProcessing = true;
                            isAccepted = true;
                            currentLabel = 'in';
    
                            break;
                        } else if (nextLabel === 'R') {
                            stopProcessing = true;
                            currentLabel = 'in';
    
                            break;
                        } else {
                            currentLabel = nextLabel;

                            break;
                        }
                    }
                } else {
                    const nextLabel = conditionArr[0];
    
                    if (nextLabel === 'A') {
                        stopProcessing = true;
                        isAccepted = true;
                        currentLabel = 'in';

                        break;
                    } else if (nextLabel === 'R') {
                        stopProcessing = true;
                        currentLabel = 'in';

                        break;
                    } else {
                        currentLabel = nextLabel;
                    }
                }
            }
        }

        if (isAccepted) {
            for (val of rating) {
                sum += val[1];
            }
        }
    }

    return sum;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const data = input.split(/\n\s*\n/);
    
    console.log('Result a)', solveSilver(data));
    console.log('Result b)', solveGold(data));
} catch(error) {
    console.log('Error:', error);
}