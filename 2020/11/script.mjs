import ndarrayPack from 'ndarray-pack';
import ndarrayUnpack from 'ndarray-unpack';
import ops from 'ndarray-ops';
import zeros from 'zeros';
import { input, testInput } from './input.mjs';

const parse = (input) => {
    return input
        .split(/\n/)
        .map((line) =>
            line
                .split('')
                .map((seat) =>
                    parseInt(
                        seat.replace('.', -1).replace('L', 0).replace('#', 1),
                        10
                    )
                )
        );
};

const getAdjacent = (nd, x, y) => {
    const res = [];
    if (x > 0 && y > 0) {
        res.push(nd.get(x - 1, y - 1));
    }
    if (x > 0) {
        res.push(nd.get(x - 1, y));
    }
    if (x > 0 && y + 1 < nd.shape[1]) {
        res.push(nd.get(x - 1, y + 1));
    }
    if (y > 0) {
        res.push(nd.get(x, y - 1));
    }
    if (y + 1 < nd.shape[1]) {
        res.push(nd.get(x, y + 1));
    }
    if (x + 1 < nd.shape[0] && y > 0) {
        res.push(nd.get(x + 1, y - 1));
    }
    if (x + 1 < nd.shape[0]) {
        res.push(nd.get(x + 1, y));
    }
    if (x + 1 < nd.shape[0] && y + 1 < nd.shape[1]) {
        res.push(nd.get(x + 1, y + 1));
    }
    return res;
};

const filter = (oldArr) => {
    const newArr = zeros(oldArr.shape);
    for (let x = 0; x < oldArr.shape[0]; x++) {
        for (let y = 0; y < oldArr.shape[1]; y++) {
            const current = oldArr.get(x, y);
            const adjacent = getAdjacent(oldArr, x, y);
            if (current === 0 && adjacent.every((seat) => seat <= 0)) {
                newArr.set(x, y, 1);
            } else if (
                current === 1 &&
                adjacent.reduce(
                    (count, seat) => count + (seat === 1 ? 1 : 0),
                    0
                ) >= 4
            ) {
                newArr.set(x, y, 0);
            } else {
                newArr.set(x, y, current);
            }
        }
    }
    return newArr;
};

const input2d = parse(input);
const inputNd = ndarrayPack(input2d);

let oldArr = inputNd;
let newArr = filter(inputNd);
while (!ops.equals(oldArr, newArr)) {
    oldArr = newArr;
    newArr = filter(oldArr);
}

console.log(
    ndarrayUnpack(newArr)
        .flat()
        .reduce((count, num) => count + (num === 1 ? 1 : 0), 0)
);
