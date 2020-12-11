import { input, testInput } from './input.mjs';

const parse = (input) =>
    input
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

const getAdjacent = (arr, x, y) => [
    ...(x > 0 && y > 0 ? [arr[x - 1][y - 1]] : []),
    ...(x > 0 ? [arr[x - 1][y]] : []),
    ...(x > 0 && y + 1 < arr[x].length ? [arr[x - 1][y + 1]] : []),
    ...(y > 0 ? [arr[x][y - 1]] : []),
    ...(y + 1 < arr[x].length ? [arr[x][y + 1]] : []),
    ...(x + 1 < arr.length && y > 0 ? [arr[x + 1][y - 1]] : []),
    ...(x + 1 < arr.length ? [arr[x + 1][y]] : []),
    ...(x + 1 < arr.length && y + 1 < arr[x].length ? [arr[x + 1][y + 1]] : []),
];

const getLineOfSight = (arr, x, y) => {
    const cnt = {
        up: x - 1,
        right: y + 1,
        down: x + 1,
        left: y - 1,
    };
    const lines = {
        upleft: [],
        up: [],
        upright: [],
        left: [],
        right: [],
        downleft: [],
        down: [],
        downright: [],
    };

    while (
        cnt.up > 0 ||
        cnt.left > 0 ||
        cnt.right < arr[0].length ||
        cnt.down < arr.length
    ) {
        if (cnt.up >= 0 && cnt.left >= 0) {
            lines.upleft.push(arr[cnt.up][cnt.left]);
        }
        if (cnt.up >= 0) {
            lines.up.push(arr[cnt.up][y]);
        }
        if (cnt.up >= 0 && cnt.right < arr[0].length) {
            lines.upright.push(arr[cnt.up][cnt.right]);
        }
        if (cnt.left >= 0) {
            lines.left.push(arr[x][cnt.left]);
        }
        if (cnt.right < arr[0].length) {
            lines.right.push(arr[x][cnt.right]);
        }
        if (cnt.down < arr.length && cnt.left >= 0) {
            lines.downleft.push(arr[cnt.down][cnt.left]);
        }
        if (cnt.down < arr.length) {
            lines.down.push(arr[cnt.down][y]);
        }
        if (cnt.down < arr.length && cnt.right < arr[0].length) {
            lines.downright.push(arr[cnt.down][cnt.right]);
        }
        cnt.up -= 1;
        cnt.left -= 1;
        cnt.right += 1;
        cnt.down += 1;
    }

    return Object.keys(lines).reduce(
        (arr, key) => [
            ...arr,
            ...(lines[key].length && lines[key].find((n) => n > -1) > -1
                ? [lines[key].find((n) => n > -1)]
                : []),
        ],
        []
    );
};

const filter = (arr, maxOccupied = 4, adjacency = 'direct') => {
    const newArr = [...Array(arr.length)].map((e) => Array(arr[0].length));
    for (let x = 0; x < arr.length; x++) {
        for (let y = 0; y < arr[x].length; y++) {
            const current = arr[x][y];
            const adjacent =
                adjacency === 'direct'
                    ? getAdjacent(arr, x, y)
                    : getLineOfSight(arr, x, y);
            if (current === 0 && adjacent.every((seat) => seat <= 0)) {
                newArr[x][y] = 1;
            } else if (
                current === 1 &&
                adjacent.reduce((count, seat) => count + (seat === 1), 0) >=
                    maxOccupied
            ) {
                newArr[x][y] = 0;
            } else {
                newArr[x][y] = current;
            }
        }
    }
    return newArr;
};

const part1 = (arr) => {
    let oldArr = arr;
    let newArr = filter(arr);

    while (oldArr.flat().join('') !== newArr.flat().join('')) {
        oldArr = newArr;
        newArr = filter(oldArr);
    }

    console.log(
        'answer one:',
        newArr.flat().reduce((count, num) => count + (num === 1 ? 1 : 0), 0)
    );
};

const part2 = (arr) => {
    let oldArr = [...arr];
    let newArr = filter(arr, 5, 'lineofsight');

    while (oldArr.flat().join('') !== newArr.flat().join('')) {
        oldArr = [...newArr];
        newArr = filter(oldArr, 5, 'lineofsight');
    }

    console.log(
        'answer two:',
        newArr.flat().reduce((count, num) => count + (num === 1 ? 1 : 0), 0)
    );
};

const input2d = parse(input);
part1(input2d);
part2(input2d);
