import { input } from './input.mjs';
import { parseLinesToIntArray } from '../utils/parser.mjs';

const data = parseLinesToIntArray(input);

outerLoop: for (let i = 0; i < data.length; i++) {
    for (let j = i; j < data.length; j++) {
        if (data[i] + data[j] === 2020) {
            console.log('Answer part one:', data[i] * data[j]);
            break outerLoop;
        }
    }
}

outerLoop: for (let i = 0; i < data.length; i++) {
    for (let j = i; j < data.length; j++) {
        for (let k = j; k < data.length; k++) {
            if (data[i] + data[j] + data[k] === 2020) {
                console.log('Answer part two:', data[i] * data[j] * data[k]);
                break outerLoop;
            }
        }
    }
}
