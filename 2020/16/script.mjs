import { assert } from '../utils/tools.mjs';
import { input, testInput, testInput2 } from './input.mjs';

const parse = (input) => {
    const rules = {};
    const nearbyTickets = [];
    let ticket = [];
    let part = '';
    input.split('\n').forEach((line) => {
        if (line.startsWith('your') || line.startsWith('nearby')) {
            part = line;
        } else if (part === 'your ticket:' && line) {
            ticket = line.split(',').map(Number);
        } else if (part === 'nearby tickets:') {
            nearbyTickets.push(line.split(',').map(Number));
        } else if (/^[a-z]+/.test(line)) {
            const [ruleName, rule] = line.split(':');
            const nums = rule.match(/(\d+)-(\d+) or (\d+)-(\d+)/);
            rules[ruleName] = [nums[1], nums[2], nums[3], nums[4]];
        }
    });
    return { rules, ticket, nearbyTickets };
};

const part1 = (data) => {
    return data.nearbyTickets.reduce(
        (sum, ticket) =>
            sum +
            ticket
                .filter(
                    (num) =>
                        !Object.values(data.rules).some(
                            (rule) =>
                                (num >= rule[0] && num <= rule[1]) ||
                                (num >= rule[2] && num <= rule[3])
                        )
                )
                .reduce((sum, n) => sum + n, 0),
        0
    );
};

const getRules = (data) => {
    const validTickets = data.nearbyTickets.filter((ticket) =>
        ticket.reduce(
            (valid, num) =>
                valid &&
                Object.values(data.rules).some(
                    (rule) =>
                        (num >= rule[0] && num <= rule[1]) ||
                        (num >= rule[2] && num <= rule[3])
                ),
            true
        )
    );

    const possibleRules = [];

    data.nearbyTickets.forEach((ticket) => {
        ticket.forEach((num, index) => {
            const possible = Object.entries(data.rules).reduce(
                (possible, [rule, values]) => {
                    if (
                        (num >= values[0] && num <= values[1]) ||
                        (num >= values[2] && num <= values[3])
                    ) {
                        possible.push(rule);
                    }
                    return possible;
                },
                []
            );
            if (!possibleRules[index]) {
                possibleRules[index] = possible;
            } else {
                possibleRules[index] = possibleRules[index].filter((value) =>
                    possible.includes(value)
                );
            }
        });
    });

    const positionRules = {};

    while (Object.values(positionRules).length !== data.ticket.length) {
        possibleRules.forEach((rules, index) => {
            if (rules.length === 1) {
                positionRules[index] = rules[0];
            } else {
                possibleRules[index] = rules.filter(
                    (val) => !Object.values(positionRules).includes(val)
                );
            }
        });
    }

    const res = {};
    Object.values(positionRules).forEach((rule, index) => {
        res[rule] = index;
    });
    return res;
};

assert(part1(parse(testInput)) === 71);
console.log('answer one:', part1(parse(input)));

const testInput2Data = parse(testInput2);
const testInput2Rules = getRules(testInput2Data);
assert(testInput2Data.ticket[testInput2Rules.class] === 12);
assert(testInput2Data.ticket[testInput2Rules.row] === 11);
assert(testInput2Data.ticket[testInput2Rules.seat] === 13);

const inputData = parse(input);
const inputRules = getRules(inputData);
console.log(
    'answer two:',
    Object.entries(inputRules).reduce(
        (product, [rule, index]) =>
            rule.startsWith('departure')
                ? product * inputData.ticket[index]
                : product,
        1
    )
);
