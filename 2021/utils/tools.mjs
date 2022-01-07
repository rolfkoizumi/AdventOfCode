export const cartesian = (...a) =>
    a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

export const assert = (assertion) => {
    console.log(assertion ? '✓' : '✗');
};

export const assertEqual = (actual, expected) => {
    console.log(
        actual === expected ? '✓' : `✗ (expected ${expected}, got ${actual})`
    );
};

export const transpose2d = (array2d) => {
    return array2d[0]?.map((_, c) => array2d.map(r => r[c])) ?? array2d;
}