// https://adventofcode.com/2023/day/19

const fs = require('fs');

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
    })

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
    //console.log('Result b)', combinations);
} catch(error) {
    console.log('Error:', error);
}