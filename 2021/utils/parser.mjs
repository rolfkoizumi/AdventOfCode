export const parseLinesToArray = (input) => {
    return input.split(/\n/);
};

export const parseLinesToNumberArray = (input) => {
    return input.split(/\n/).map(Number);
};

export const parseLinesTo2dArray = (input) => {
    return input.split(/\n/).map((line) => line.split(''));
};

export const parseLinesTo2dNumberArray = (input) => {
    return input.split(/\n/).map((line) => line.split('').map(Number));
};
