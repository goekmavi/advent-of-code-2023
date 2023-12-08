const fs = require('fs');

const solveSilver = (instructions, values) => {
    console.log(instructions);
    console.log(values);
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const [instructions, values] = input.split(/\n\s*\n/);

    console.log('Result a)', solveSilver(instructions, values));
} catch (error) {
    console.log('Error:', error);
}