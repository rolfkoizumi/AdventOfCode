import { input } from './input.mjs';
import { parseLinesToIntArray } from '../utils/parser.mjs';
import { cartesian } from '../utils/tools.mjs';

const data = parseLinesToIntArray(input);

for (let i = 0; i < data.length; i++) {
    if (data.includes(2020 - data[i])) {
        console.log('Answer part one:', data[i] * (2020 - data[i]));
        break;
    }
}

cartesian(data, data).some(([num1, num2]) => {
    if (data.includes(2020 - num1 - num2)) {
        console.log('Answer part two:', num1 * num2 * (2020 - num1 - num2));
        return true;
    }
});
