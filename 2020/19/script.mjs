import { assertEqual } from '../utils/tools.mjs';
import { input, testInput, testInput2 } from './input.mjs';

const parse = (input) => {
    const rules = {};
    const messages = [];
    input.split('\n').forEach((line) => {
        const rule = line.match(/^(\d+): (.*)$/);
        if (rule) {
            rules[rule[1]] = rule[2].replace(/"/g, '');
        } else if (line) {
            messages.push(line);
        }
    });
    return { rules, messages };
};

const matchesRule = (ruleNumber, rules, message, usedRules = []) => {
    const rule = rules[ruleNumber];
    const orRule = rule.match(/^([\d\s]+) \| ([\d\s]+)$/);
    if (
        usedRules.reduce(
            (count, cur) => (cur === ruleNumber ? (count += 1) : count),
            0
        ) > 300
    ) {
        return false;
    }
    usedRules.push(ruleNumber);
    if (orRule) {
        return (
            orRule[1].split(' ').reduce((message, subruleNum) => {
                return matchesRule(subruleNum, rules, message, usedRules);
            }, message) ||
            orRule[2].split(' ').reduce((message, subruleNum) => {
                return matchesRule(subruleNum, rules, message, usedRules);
            }, message)
        );
    } else if (rule.match(/^\d+/)) {
        return rule.split(' ').reduce((message, subruleNum) => {
            return matchesRule(subruleNum, rules, message, usedRules);
        }, message);
    } else {
        return (
            message[0] === rule &&
            (message.length > 1 ? message.substring(1) : true)
        );
    }
};

const useRule = (ruleNumber, rules, message) => {
    const res = matchesRule(ruleNumber, rules, message);
    return typeof res === 'boolean' ? res : res.length === 0;
};

const testData = parse(testInput);
assertEqual(useRule(0, testData.rules, testData.messages[0]), true);
assertEqual(useRule(0, testData.rules, testData.messages[1]), false);
assertEqual(useRule(0, testData.rules, testData.messages[2]), true);
assertEqual(useRule(0, testData.rules, testData.messages[3]), false);
assertEqual(useRule(0, testData.rules, testData.messages[4]), false);

console.log('---------------------------------');

const data = parse(input);
console.log(
    'answer one:',
    data.messages.reduce(
        (sum, message) => sum + useRule(0, data.rules, message),
        0
    )
);

console.log('---------------------------------');

const testData2 = parse(testInput2);
assertEqual(useRule(0, testData2.rules, testData2.messages[0]), false);
assertEqual(useRule(0, testData2.rules, testData2.messages[1]), true);
assertEqual(useRule(0, testData2.rules, testData2.messages[2]), false);
assertEqual(useRule(0, testData2.rules, testData2.messages[3]), false);
assertEqual(useRule(0, testData2.rules, testData2.messages[4]), false);
assertEqual(useRule(0, testData2.rules, testData2.messages[5]), false);
assertEqual(useRule(0, testData2.rules, testData2.messages[6]), true);
assertEqual(useRule(0, testData2.rules, testData2.messages[7]), true);
assertEqual(useRule(0, testData2.rules, testData2.messages[8]), false);
assertEqual(useRule(0, testData2.rules, testData2.messages[9]), false);
assertEqual(useRule(0, testData2.rules, testData2.messages[10]), false);
assertEqual(useRule(0, testData2.rules, testData2.messages[11]), false);
assertEqual(useRule(0, testData2.rules, testData2.messages[12]), false);
assertEqual(useRule(0, testData2.rules, testData2.messages[13]), false);
assertEqual(useRule(0, testData2.rules, testData2.messages[14]), false);

console.log('---------------------------------');

testData2.rules[8] = '42 | 42 8';
testData2.rules[11] = '42 31 | 42 11 31';

assertEqual(useRule(0, testData2.rules, testData2.messages[0]), false);
assertEqual(useRule(0, testData2.rules, testData2.messages[1]), true);
assertEqual(useRule(0, testData2.rules, testData2.messages[2]), true);
assertEqual(useRule(0, testData2.rules, testData2.messages[3]), true);
assertEqual(useRule(0, testData2.rules, testData2.messages[4]), true);
assertEqual(useRule(0, testData2.rules, testData2.messages[5]), true);
assertEqual(useRule(0, testData2.rules, testData2.messages[6]), true);
assertEqual(useRule(0, testData2.rules, testData2.messages[7]), true);
assertEqual(useRule(0, testData2.rules, testData2.messages[8]), true);
assertEqual(useRule(0, testData2.rules, testData2.messages[9]), true);
assertEqual(useRule(0, testData2.rules, testData2.messages[10]), true);
assertEqual(useRule(0, testData2.rules, testData2.messages[11]), false);
assertEqual(useRule(0, testData2.rules, testData2.messages[12]), true);
assertEqual(useRule(0, testData2.rules, testData2.messages[13]), false);
assertEqual(useRule(0, testData2.rules, testData2.messages[14]), true);

console.log('---------------------------------');

data.rules[8] = '42 | 42 8';
data.rules[11] = '42 31 | 42 11 31';
// console.log(
//     'answer two:',
//     data.messages.reduce(
//         (sum, message) => sum + useRule(0, data.rules, message),
//         0
//     )
// );
