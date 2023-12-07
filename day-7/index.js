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

const strengthsB = Object.freeze({
    'A': 12,
    'K': 11,
    'Q': 10,
    'T': 9,
    '9': 8,
    '8': 7,
    '7': 6,
    '6': 5,
    '5': 4,
    '4': 3,
    '3': 2,
    '2': 1,
    'J': 0
});

const strengthsA = Object.freeze({
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

const calcHandValueB = hand => {
    const cards = hand.split('');
    const matches = {};
    let containsJoker = false;

    for (let i = 0; i < cards.length; i++) {
        const regex = new RegExp(cards[i], 'g');

        if (hand.match(regex)) {
            matches[cards[i]] = hand.match(regex).length;
        }
    }

    const matchesLength = Object.keys(matches).length;

    if (matchesLength === 1) { // fiveOfAKind
        return types.fiveOfAKind;
    } else if (matchesLength === 2) { // fourOfAKind || fullhouse || if it contains j -> fiveOfAKind
        let fourOfAKind = false;

        for (const item of Object.keys(matches)) {
            const val = matches[item];

            if (item === 'J') {
                containsJoker = true;

                break;
            }

            if (val === 1 || val === 4) {
                fourOfAKind = true;
            }
        }

        if (containsJoker) {
            return types.fiveOfAKind;
        } else if (fourOfAKind) {
            return types.fourOfAKind;
        } else {
            return types.fullHouse;
        }
    } else if (matchesLength === 3) { // twoPair || threeOfAKind || if it contains j -> fullhouse or fourOfAKind
        let threeOfAKind = false;
        let amountJoker = 0;

        for (const item of Object.keys(matches)) {
            const val = matches[item];

            if (item === 'J') {
                amountJoker = val;
                containsJoker = true;
            }

            if (val === 3) {
                threeOfAKind = true;
            }
        }

        if (containsJoker && threeOfAKind) {
            return types.fourOfAKind;
        } else if (containsJoker && !threeOfAKind) {
            if (amountJoker === 2) {
                return types.fourOfAKind;
            } else {
                return types.fullHouse;
            }
        } else if (!containsJoker && threeOfAKind) {
            return types.threeOfAKind;
        } else {
            return types.twoPair;
        }
    } else if (matchesLength === 4) { // onePair || if it contains j -> threeOfAKind
        for (const item of Object.keys(matches)) {
            if (item === 'J') {
                containsJoker = true;

                break;
            }
        }

        if (containsJoker) {
            return types.threeOfAKind;
        } else {
            return types.onePair;
        }
    } else if (matchesLength === 5) { // highCard || if it contains j -> onePair
        for (const item of Object.keys(matches)) {
            if (item === 'J') {
                containsJoker = true;

                break;
            }
        }

        if (containsJoker) {
            return types.onePair;
        } else {
            return types.highCard;
        }
    }
}

const calcHandValueA = hand => {
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

const isHandStrongerB = (handOne, handTwo) => {
    const valueHandOne = calcHandValueB(handOne);
    const valueHandTwo = calcHandValueB(handTwo);

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
            if (strengthsB[arrOne[i]] !== strengthsB[arrTwo[i]]) {
                if (strengthsB[arrOne[i]] > strengthsB[arrTwo[i]]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
}

const isHandStrongerA = (handOne, handTwo) => {
    const valueHandOne = calcHandValueA(handOne);
    const valueHandTwo = calcHandValueA(handTwo);

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
            if (strengthsA[arrOne[i]] !== strengthsA[arrTwo[i]]) {
                if (strengthsA[arrOne[i]] > strengthsA[arrTwo[i]]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
}

const solveGold = input => {
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
                    if (!isHandStrongerB(hand, map[i].hand)) {
                        map.unshift({
                            hand: hand,
                            bit: bit
                        });

                        break;
                    } else if (!isHandStrongerB(hand, map[i + 1].hand)) {
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
                    if (!isHandStrongerB(hand, map[i].hand)) {
                        map.unshift({
                            hand: hand,
                            bit: bit
                        });

                        break;
                    } else if (!isHandStrongerB(hand, map[i + 1].hand)) {
                        map.splice(i + 1, 0, {
                            hand: hand,
                            bit: bit
                        });

                        break;
                    }
                } else { // one el. exists
                    if (isHandStrongerB(hand, map[i].hand)) {
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
    });

    map.forEach((el, i) => {
        let multiply = i + 1;

        sum += multiply * (Number(el.bit));
    });

    return sum;
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
                    if (!isHandStrongerA(hand, map[i].hand)) {
                        map.unshift({
                            hand: hand,
                            bit: bit
                        });

                        break;
                    } else if (!isHandStrongerA(hand, map[i + 1].hand)) {
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
                    if (!isHandStrongerA(hand, map[i].hand)) {
                        map.unshift({
                            hand: hand,
                            bit: bit
                        });

                        break;
                    } else if (!isHandStrongerA(hand, map[i + 1].hand)) {
                        map.splice(i + 1, 0, {
                            hand: hand,
                            bit: bit
                        });

                        break;
                    }
                } else { // one el. exists
                    if (isHandStrongerA(hand, map[i].hand)) {
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
    console.log('Result b)', solveGold(input));
} catch (error) {
    console.log('Error:', error);
}