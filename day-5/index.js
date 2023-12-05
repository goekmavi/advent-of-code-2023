const fs = require('fs');

const solveSilber = (seeds, data) => {
    let lowestLocationNumber;

    const [
        seedsToSoil,
        soilToFertilizer,
        fertilizerToWater,
        waterToLight,
        lightToTemperature,
        temperatureToHumidity,
        humidityToLocation
    ] = [
        data[0].split('\n').map(val => val.split(' ').map(val => Number(val))),
        data[1].split('\n').map(val => val.split(' ').map(val => Number(val))),
        data[2].split('\n').map(val => val.split(' ').map(val => Number(val))),
        data[3].split('\n').map(val => val.split(' ').map(val => Number(val))),
        data[4].split('\n').map(val => val.split(' ').map(val => Number(val))),
        data[5].split('\n').map(val => val.split(' ').map(val => Number(val))),
        data[6].split('\n').map(val => val.split(' ').map(val => Number(val)))
    ];

    seeds.forEach(seed => {
        let current = seed;

        [
            seedsToSoil,
            soilToFertilizer,
            fertilizerToWater,
            waterToLight,
            lightToTemperature,
            temperatureToHumidity,
            humidityToLocation
        ].forEach(valMap => {
            let match = false;

            for (let i = 0; i < valMap.length; i++) {
                if (current >= valMap[i][1] && current < (valMap[i][1] + valMap[i][2])) {
                    let destination = (current - valMap[i][1]) + valMap[i][0];
                    current = destination;
                    match = true;
                    
                    break;
                }
            }
        });

        if (lowestLocationNumber === undefined) {
            lowestLocationNumber = current;
        } else if (lowestLocationNumber > current) {
            lowestLocationNumber = current;
        }
    });

    return lowestLocationNumber;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    
    const data = input.split(/\n\s*\n/).map(val => val.split(':')[1].trim());
    const seeds = data[0].trim().split(' ').map(val => Number(val));
    data.shift();

    console.log('Result a)', solveSilber(seeds, data));
} catch (error) {
    console.log('Error:', error);
}