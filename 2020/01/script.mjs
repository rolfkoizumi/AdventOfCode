import { input } from './input.mjs';
import { parseLinesToIntArray } from '../utils/parser.mjs';
import { cartesian } from '../utils/sci.mjs';

const data = parseLinesToIntArray(input);

for (let i = 0; i < data.length; i++) {
    if (data.includes(2020 - data[i])) {
        console.log('Answer part one:', data[i] * (2020 - data[i]));
        break;
    }
}

// outerLoop: for (let i = 0; i < data.length; i++) {
//     for (let j = i; j < data.length; j++) {
//         if (data.includes(2020 - data[i] - data[j])) {
//             console.log(
//                 'Answer part two:',
//                 data[i] * data[j] * (2020 - data[i] - data[j])
//             );
//             break outerLoop;
//         }
//     }
// }

// refactored with cartesian product. probably no performance gain in javascript but maybe nicer code?
cartesian(data, data).some(([num1, num2]) => {
    if (data.includes(2020 - num1 - num2)) {
        console.log('Answer part two:', num1 * num2 * (2020 - num1 - num2));
        return true;
    }
});
