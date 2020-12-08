import { input } from './input.mjs';
import { parseLinesToArray } from '../utils/parser.mjs';

const validatePassword = ({ min, max, letter, password }) => {
    const regex = new RegExp(letter, 'g');
    const letterCount = (password.match(regex) || []).length;
    return letterCount >= min && letterCount <= max;
};

const validatePassword2 = ({ min, max, letter, password }) => {
    return (
        (password.charAt(min - 1) === letter) +
            (password.charAt(max - 1) === letter) ===
        1
    );
};

const passwords = parseLinesToArray(input).map((item) => {
    const match = item.match(/(\d+)-(\d+)\s([a-z]): (\w+)/);
    return {
        min: match[1],
        max: match[2],
        letter: match[3],
        password: match[4],
    };
});

const countValid = passwords.reduce(
    (count, entry) => count + validatePassword(entry),
    0
);

console.log('Answer one:', countValid);

const countValid2 = passwords.reduce(
    (count, entry) => count + validatePassword2(entry),
    0
);

console.log('Answer two:', countValid2);
