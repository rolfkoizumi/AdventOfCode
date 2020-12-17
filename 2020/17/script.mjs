import { assertEqual } from '../utils/tools.mjs';
import { input, testInput } from './input.mjs';
import { parseLinesToArray } from '../utils/parser.mjs';

const parse = (input) => {
    return [
        input
            .replace(/#/g, 1)
            .replace(/\./g, 0)
            .split('\n')
            .map((line) => line.split('').map(Number)),
    ];
};

const parse4d = (input) => {
    return [
        input
            .replace(/#/g, 1)
            .replace(/\./g, 0)
            .split('\n')
            .map((line) => [line.split('').map(Number)]),
    ];
};

const create3dZeroArray = (x, y, z) => {
    const array = [];
    for (let a = 0; a < x; a += 1) {
        array.push([]);
        for (let b = 0; b < y; b += 1) {
            array[a].push(new Array(z).fill(0));
        }
    }
    return array;
};

const create4dZeroArray = (x, y, z, w) => {
    const array = [];
    for (let a = 0; a < x; a += 1) {
        array.push([]);
        for (let b = 0; b < y; b += 1) {
            array[a].push([]);
            for (let c = 0; c < z; c += 1) {
                array[a][b].push(new Array(w).fill(0));
            }
        }
    }
    return array;
};

const expand3dArray = (array) => {
    for (let x = 0; x < array.length; x += 1) {
        for (let y = 0; y < array[x].length; y += 1) {
            array[x][y] = [0, ...array[x][y], 0];
        }

        array[x] = [
            new Array(array[x][0].length).fill(0),
            ...array[x],
            new Array(array[x][0].length).fill(0),
        ];
    }

    const empty2dArray = [];
    for (let i = 0; i < array[0][0].length; i += 1) {
        empty2dArray[i] = new Array(array[0][0].length).fill(0);
    }

    return [empty2dArray, ...array, empty2dArray];
};

const expand4dArray = (array) => {
    for (let x = 0; x < array.length; x += 1) {
        for (let y = 0; y < array[x].length; y += 1) {
            for (let z = 0; z < array[x][y].length; z += 1) {
                array[x][y][z] = [0, ...array[x][y][z], 0];
            }

            array[x][y] = [
                new Array(array[x][y][0].length).fill(0),
                ...array[x][y],
                new Array(array[x][y][0].length).fill(0),
            ];
        }

        const empty2dArray = [];
        for (let i = 0; i < array[0][0].length; i += 1) {
            empty2dArray[i] = new Array(array[0][0].length).fill(0);
        }

        array[x] = [empty2dArray, ...array[x], empty2dArray];
    }

    const empty3dArray = create3dZeroArray(
        array[0].length,
        array[0][0].length,
        array[0][0][0].length
    );

    return [empty3dArray, ...array, empty3dArray];
};

const getAllNeighbors = (array, x, y, z) => {
    const neighbors = [];
    for (let a = -1; a <= 1; a += 1) {
        for (let b = -1; b <= 1; b += 1) {
            for (let c = -1; c <= 1; c += 1) {
                if (!(a === 0 && b === 0 && c === 0)) {
                    try {
                        neighbors.push(array[x + a][y + b][z + c] || 0);
                    } catch (error) {
                        neighbors.push(0);
                    }
                }
            }
        }
    }
    return neighbors;
};

const getAllNeighbors4d = (array, x, y, z, w) => {
    const neighbors = [];
    for (let a = -1; a <= 1; a += 1) {
        for (let b = -1; b <= 1; b += 1) {
            for (let c = -1; c <= 1; c += 1) {
                for (let d = -1; d <= 1; d += 1) {
                    if (!(a === 0 && b === 0 && c === 0 && d === 0)) {
                        try {
                            neighbors.push(
                                array[x + a][y + b][z + c][w + d] || 0
                            );
                        } catch (error) {
                            neighbors.push(0);
                        }
                    }
                }
            }
        }
    }
    return neighbors;
};

const executeCycle = (array3d) => {
    const expanded = expand3dArray(array3d);
    const result = create3dZeroArray(
        expanded.length,
        expanded[0].length,
        expanded[0][0].length
    );

    for (let x = 0; x < expanded.length; x += 1) {
        for (let y = 0; y < expanded[x].length; y += 1) {
            for (let z = 0; z < expanded[x][y].length; z += 1) {
                const activeNeighbors = getAllNeighbors(
                    expanded,
                    x,
                    y,
                    z
                ).reduce((sum, cur) => sum + cur);
                if (
                    expanded[x][y][z] &&
                    !(activeNeighbors === 2 || activeNeighbors === 3)
                ) {
                    result[x][y][z] = 0;
                } else if (!expanded[x][y][z] && activeNeighbors === 3) {
                    result[x][y][z] = 1;
                } else {
                    result[x][y][z] = expanded[x][y][z];
                }
            }
        }
    }

    return result;
};

const executeCycle4d = (array4d) => {
    const expanded = expand4dArray(array4d);
    const result = create4dZeroArray(
        expanded.length,
        expanded[0].length,
        expanded[0][0].length,
        expanded[0][0][0].length
    );

    for (let x = 0; x < expanded.length; x += 1) {
        for (let y = 0; y < expanded[x].length; y += 1) {
            for (let z = 0; z < expanded[x][y].length; z += 1) {
                for (let w = 0; w < expanded[x][y][z].length; w += 1) {
                    const activeNeighbors = getAllNeighbors4d(
                        expanded,
                        x,
                        y,
                        z,
                        w
                    ).reduce((sum, cur) => sum + cur);
                    if (
                        expanded[x][y][z][w] &&
                        !(activeNeighbors === 2 || activeNeighbors === 3)
                    ) {
                        result[x][y][z][w] = 0;
                    } else if (!expanded[x][y][z][w] && activeNeighbors === 3) {
                        result[x][y][z][w] = 1;
                    } else {
                        result[x][y][z][w] = expanded[x][y][z][w];
                    }
                }
            }
        }
    }

    return result;
};

const part1 = (data) => {
    for (let i = 0; i < 6; i += 1) {
        data = executeCycle(data);
    }

    return data.flat(3).reduce((sum, cur) => sum + cur);
};

const part2 = (data) => {
    for (let i = 0; i < 6; i += 1) {
        data = executeCycle4d(data);
    }

    console.log(data.flat(4).reduce((sum, cur) => sum + cur));

    return data.flat(4).reduce((sum, cur) => sum + cur);
};

const testData = parse(testInput);
assertEqual(part1(testData), 112);

// const data = parse(input);
// console.log('answer one:', part1(data));

const testData4d = parse4d(testInput);
assertEqual(
    executeCycle4d(testData4d)
        .flat(4)
        .reduce((sum, cur) => sum + cur),
    29
);
// assertEqual(part2(testData4d), 848);
// console.log('answer two:', part2(data));
