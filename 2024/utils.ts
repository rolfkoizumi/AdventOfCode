import * as fs from 'fs';
import { type NdArray } from 'ndarray';

export function readData<T>(filename: string, parser: undefined): string
export function readData<T>(filename: string, parser: (data: string) => T): T
export function readData<T>(filename: string, parser?: (data: string) => T) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        // console.log(data);
        return parser?.(data) ?? data;
    } catch (err) {
        console.error(err);
    }
}

export function splitLines(data: string) {
    return data.split(/\r?\n|\r|\n/g);
}

export function assert<T extends string | number | boolean>(assertion: T, expected?: T) {
    if (expected === undefined) {
        console.log(assertion === true ? '✓' : `✗ (${assertion})`);
    } else {
        console.log(assertion === expected ? '✓' : `✗ (expected ${expected}, got ${assertion})`);
    }
}

export function forEach2d(array2d: NdArray<string[][]>, callback: (x: number, y: number) => void) {
    for (let x = 0; x < array2d.shape[0]; x++) {
        for (let y = 0; y < array2d.shape[1]; y++) {
            callback(x, y);
        }
    }
}
