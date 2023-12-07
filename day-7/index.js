const fs = require('fs');

const types = Object.freeze({
    'fiveOfAKind': 6,
    'fourOfAKind': 5,
    'fullHouse': 4,
    'threeOfAKind': 3,
    'twoPair': 2,
    'onePair': 1,
    'highCard': 0
});

const strengths = Object.freeze({
    'A': 12,
    'K': 11,
    'Q': 10,
    'J': 9,
    'T': 8,
    '9': 7,
    '8': 6,
    '7': 5,
    '6': 4,
    '5': 3,
    '4': 2,
    '3': 1,
    '2': 0
});

const calcHandValue = hand => {
    const cards = hand.split('');
    const matches = {};

    for (let i = 0; i < cards.length; i++) {
        const regex = new RegExp(cards[i], 'g');

        if (hand.match(regex)) {
            matches[cards[i]] = hand.match(regex).length;
        }
    }

    const matchesLength = Object.keys(matches).length;

    if (matchesLength === 1) { // fiveOfAKind
        return types.fiveOfAKind;
    } else if (matchesLength === 2) { // fourOfAKind || fullhouse
        for (const item of Object.keys(matches)) {
            const val = matches[item];

            if (val === 1 || val === 4) {
                return types.fourOfAKind;
            }
          }

        return types.fullHouse;
    } else if (matchesLength === 3) { // twoPair || threeOfAKind
        for (const item of Object.keys(matches)) {
            const val = matches[item];

            if (val === 3) {
                return types.threeOfAKind;
            }
          }

        return types.twoPair;
    } else if (matchesLength === 4) { // onePair
        return types.onePair;
    } else if (matchesLength === 5) { // highCard
        return types.highCard;
    }
}

const isHandStronger = (handOne, handTwo) => {
    const valueHandOne = calcHandValue(handOne);
    const valueHandTwo = calcHandValue(handTwo);

    if (valueHandOne !== valueHandTwo) {
        if (valueHandOne > valueHandTwo) {
            return true;
        } else {
            return false;
        }
    } else { // compare card by card
        let arrOne = handOne.split('');
        let arrTwo = handTwo.split('');

        for (let i = 0; i < arrOne.length; i++) {
            if (strengths[arrOne[i]] !== strengths[arrTwo[i]]) {
                if (strengths[arrOne[i]] > strengths[arrTwo[i]]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
}

const solveSilber = input => {
    const data = input.split('\n');
    const map = [];
    let sum = 0;

    data.forEach(item => {
        let split = item.split(' ');
        const hand = split[0];
        const bit = split[1];

        if (map.length === 0) {
            map.push({
                hand: hand,
                bit: bit
            });
        } else {
            for (let i = 0; i < map.length; i++) {
                if ((map[i - 1] !== undefined) && (map[i + 1] !== undefined)) { // prev and next el. exists
                    if (!isHandStronger(hand, map[i].hand)) {
                        map.unshift({
                            hand: hand,
                            bit: bit
                        });

                        break;
                    } else if (!isHandStronger(hand, map[i + 1].hand)) {
                        map.splice(i + 1, 0, {
                            hand: hand,
                            bit: bit
                        });

                        break;
                    }
                } else if ((map[i - 1] !== undefined) && !(map[i + 1] !== undefined)) { // prev el. exists
                    map.push({
                        hand: hand,
                        bit: bit
                    });

                    break;
                } else if (!(map[i - 1] !== undefined) && (map[i + 1] !== undefined)) { // next el. exists
                    if (!isHandStronger(hand, map[i].hand)) {
                        map.unshift({
                            hand: hand,
                            bit: bit
                        });

                        break;
                    } else if (!isHandStronger(hand, map[i + 1].hand)) {
                        map.splice(i + 1, 0, {
                            hand: hand,
                            bit: bit
                        });

                        break;
                    }
                } else { // one el. exists
                    if (isHandStronger(hand, map[i].hand)) {
                        map.push({
                            hand: hand,
                            bit: bit
                        });
                    } else {
                        map.unshift({
                            hand: hand,
                            bit: bit
                        });
                    }

                    break;
                }

            }
        }
    
        // console.log(map);
    });

    map.forEach((el, i) => {
        let multiply = i + 1;

        sum += multiply * (Number(el.bit));
    });

    return sum;
}

try {
    const input = fs.readFileSync('input.txt', 'utf8');

    console.log('Result a)', solveSilber(input));
    //console.log('Result b)', solveGold(input));
} catch (error) {
    console.log('Error:', error);
}