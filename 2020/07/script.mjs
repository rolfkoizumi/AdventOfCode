import { input, testInput, testInput2 } from './input.mjs';

const parseRules = (data) => {
    const lines = data.split(/\n/);
    return lines.reduce((result, line) => {
        const [outer, inner] = line
            .replace(/\./, '')
            .replace(/bags?/g, '')
            .replace(/\s/g, '')
            .split('contain');
        result[outer] = {};
        if (inner !== 'noother') {
            inner.split(',').forEach((numItems) => {
                const numItem = numItems.match(/^(\d+)(.*)/);
                result[outer][numItem[2]] = numItem[1];
            });
        }
        return result;
    }, {});
};

const canBeContainedIn = (rules, color) => {
    color = color.replace(/bags?/g, '').replace(/\s/g, '');
    const containedIn = [];

    const checkChildRecursive = (parent, child) => {
        if (child in rules[parent]) {
            return true;
        } else if (Object.keys(rules[parent]).length !== 0) {
            return Object.keys(rules[parent]).some((key) => {
                return checkChildRecursive(key, child);
            });
        }
        return false;
    };

    Object.keys(rules).forEach((key) => {
        if (checkChildRecursive(key, color) && !containedIn.includes(key)) {
            containedIn.push(key);
        }
    });

    return containedIn;
};

const countChildren = (rules, color) => {
    color = color.replace(/bags?/g, '').replace(/\s/g, '');

    const countChildrenRecursive = (parent) => {
        if (Object.keys(rules[parent]).length === 0) {
            return 0;
        } else {
            return Object.entries(rules[parent]).reduce(
                (result, [key, count]) => {
                    return (
                        result +
                        parseInt(count, 10) +
                        countChildrenRecursive(key) * parseInt(count, 10)
                    );
                },
                0
            );
        }
    };

    return countChildrenRecursive(color);
};

const rules = parseRules(input);

console.log('Answer one:', canBeContainedIn(rules, 'shiny gold bag').length);
console.log('Answer two:', countChildren(rules, 'shiny gold'));
