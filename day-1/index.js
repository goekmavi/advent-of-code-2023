// https://adventofcode.com/2023/day/1

const fs = require('fs');
const pathToFile = './input.txt';

const replaceArray = [
    {
        text: "one",
        value: "1"
    },
    {
        text: "two",
        value: "2"
    },
    {
        text: "three",
        value: "3"
    },
    {
        text: "four",
        value: "4"
    },
    {
        text: "five",
        value: "5"
    },
    {
        text: "six",
        value: "6"
    },
    {
        text: "seven",
        value: "7"
    },
    {
        text: "eight",
        value: "8"
    },
    {
        text: "nine",
        value: "9"
    }
]

const calculateSumOfCalibrationValues = data => {
    const lines = data.split('\n');
    let sum = 0;

    lines.forEach(line => {
        let firstDigit;
        let lastDigit;
        let currentString = '';

        line.split('').map(character => {
            currentString += character;
            
            if (isNaN(character)) {
                replaceArray.forEach(obj => {
                    if (currentString.includes(obj.text)) {
                        currentString = character;
                        character = obj.value;

                        if (firstDigit === undefined) {
                            firstDigit = character;
                        }
        
                        lastDigit = character;
                    }
                });
            } else {
                currentString = '';

                if (firstDigit === undefined) {
                    firstDigit = character;
                }

                lastDigit = character;
            }
        });

        let value = Number(firstDigit + lastDigit);
        sum += value;

        console.log(line);
        console.log(firstDigit, lastDigit, '->', value);
    });

    return sum;
}

try {
    const data = fs.readFileSync(pathToFile, 'utf8');
    const sum = calculateSumOfCalibrationValues(data.toString().toLowerCase());

    console.log('Result:', sum);
} catch(error) {
    console.log('Error:', error)
}