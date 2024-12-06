// https://adventofcode.com/2024/day/2

import { readData, splitLines } from './utils';

const example = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

function parser(data: string) {
    return splitLines(data).map(line => {
        return line.split(' ').map(level => Number(level));
    });
}

function reportIsSafe(report: number[]): boolean {
    const differences = report.slice(1).reduce((differences, level, index) => {
        differences.push(level - report[index]);
        return differences;
    }, []);

    const allPositive = differences.every(level => level > 0);
    const allNegative = differences.every(level => level < 0);
    const condition1 = allPositive || allNegative;
    const condition2 = differences.every(diff => Math.abs(diff) >= 1 && Math.abs(diff) <= 3);

    return condition1 && condition2;
}

function reportIsSafeWithDampener(report: number[]): boolean {
    return report.map((_, index) => reportIsSafe(report.filter((_, i) => i !== index))).some(res => res)
}

function countSafeReports(reports: number[][], safetyChecker: (report: number[]) => boolean): number {
    return reports.reduce((count, report) => {
        return safetyChecker(report) ? count + 1 : count;
    }, 0);
}

const exampleReports = parser(example);
console.log('Example:', countSafeReports(exampleReports, reportIsSafe), countSafeReports(exampleReports, reportIsSafeWithDampener));

const reports = readData('02.txt', parser);
console.log('Answers:', countSafeReports(reports, reportIsSafe), countSafeReports(reports, reportIsSafeWithDampener));