export const parseLinesToArray = (input) => {
    return input.split(/\n/);
};

export const parseLinesToIntArray = (input) => {
    return parseLinesToArray(input).map((item) => parseInt(item, 10));
};
