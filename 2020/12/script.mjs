import { input, testInput } from './input.mjs';
import { parseLinesToArray } from '../utils/parser.mjs';

const part1 = (sequence) => {
    const data = {
        north: 0,
        east: 0,
        facing: 0,
    };

    sequence.forEach((item) => {
        const [, action, valueString] = item.match(/(\w)(\d+)/);
        const value = parseInt(valueString, 10);
        switch (action) {
            case 'N':
                data.north += value;
                break;
            case 'S':
                data.north -= value;
                break;
            case 'E':
                data.east += value;
                break;
            case 'W':
                data.east -= value;
                break;
            case 'L':
                data.facing = (data.facing - value) % 360;
                break;
            case 'R':
                data.facing = (data.facing + value) % 360;
                break;
            case 'F':
                if (data.facing === 0) {
                    data.east += value;
                } else if (data.facing === 90 || data.facing === -270) {
                    data.north -= value;
                } else if (Math.abs(data.facing) === 180) {
                    data.east -= value;
                } else if (data.facing === 270 || data.facing === -90) {
                    data.north += value;
                }
                break;
        }
    });

    console.log('answer one:', Math.abs(data.north) + Math.abs(data.east));
};

const part2 = (sequence) => {
    const data = {
        north: 0,
        east: 0,
        waypointEast: 10,
        waypointNorth: 1,
    };

    sequence.forEach((item) => {
        const [, action, valueString] = item.match(/(\w)(\d+)/);
        const value = parseInt(valueString, 10);
        const rotations = (value % 360) / 90;
        const wE = data.waypointEast;
        const wN = data.waypointNorth;
        switch (action) {
            case 'N':
                data.waypointNorth += value;
                break;
            case 'S':
                data.waypointNorth -= value;
                break;
            case 'E':
                data.waypointEast += value;
                break;
            case 'W':
                data.waypointEast -= value;
                break;
            case 'L':
            case 'R':
                if (rotations === 1) {
                    data.waypointNorth = wE * (action === 'L' ? 1 : -1);
                    data.waypointEast = wN * (action === 'L' ? -1 : 1);
                } else if (rotations === 2) {
                    data.waypointNorth *= -1;
                    data.waypointEast *= -1;
                } else if (rotations === 3) {
                    data.waypointNorth = wE * (action === 'L' ? -1 : 1);
                    data.waypointEast = wN * (action === 'L' ? 1 : -1);
                }
                break;
            case 'F':
                data.east = data.east + data.waypointEast * value;
                data.north = data.north + data.waypointNorth * value;
                break;
        }
    });

    console.log('answer two:', Math.abs(data.north) + Math.abs(data.east));
};

const sequence = parseLinesToArray(input);

part1(sequence);
part2(sequence);
