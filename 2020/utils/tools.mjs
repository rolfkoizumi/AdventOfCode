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