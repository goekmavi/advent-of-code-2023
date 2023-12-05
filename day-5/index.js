const fs = require('fs');

const getDestination = (number, map) => {
    if (map[number]) {
        return map[number];
    } else {
        return Number(number);
    }
}

const createMap = arr => {
    const map = {};
    const tempArray = arr.split('\n').map(val => val.split(' ').map(val => Number(val)));
    
    tempArray.forEach(item => {
        for (let i = 0; i < item[2]; i++) {
            map[item[1] + i] = item[0] + i;
        }
    });

    return map;
}

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
        createMap(data[0]),
        createMap(data[1]),
        createMap(data[2]),
        createMap(data[3]),
        createMap(data[4]),
        createMap(data[5]),
        createMap(data[6])
    ];

    seeds.forEach(seed => {
        let result = seed;

        [
            seedsToSoil,
            soilToFertilizer,
            fertilizerToWater,
            waterToLight,
            lightToTemperature,
            temperatureToHumidity,
            humidityToLocation
        ].forEach(map => {
            result = getDestination(result, map);
        });

        if (lowestLocationNumber === undefined) {
            lowestLocationNumber = result;
        }

        if (lowestLocationNumber > result) {
            lowestLocationNumber = result;
        }
    });

    return lowestLocationNumber;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');
    
    const data = input.split(/\n\s*\n/).map(val => val.split(':')[1].trim());
    const seeds = data[0].trim().split(' ');
    data.shift();

    console.log('Result a)', solveSilber(seeds, data));
} catch (error) {
    console.log('Error:', error);
}