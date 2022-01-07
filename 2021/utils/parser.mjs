export const parseLinesToArray = (input) => {
    return input.split(/\n/);
};

export const parseLinesTo2dArray = (input) => {
    return input.split(/\n/).map((line) => line.split(''));
};

export const parseLinesToIntArray = (input) => {
    return parseLinesToArray(input).map((item) => parseInt(item, 10));
};
