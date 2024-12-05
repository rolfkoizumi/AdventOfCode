import * as fs from 'fs';

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