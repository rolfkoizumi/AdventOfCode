# encoding: utf-8

import math
import numpy as np
import scipy.ndimage as ndimage

# ---------- INPUT ------------

input = """#......#
##.#..#.
#.#.###.
.##.....
.##.#...
##.#....
#####.#.
##.#.###"""

testInput = """.#.
..#
###"""

# ---------- METHODS ----------

def parse(input, dim = 3):
    lines = input.replace('#', '1').replace('.', '0').split('\n')
    shape = tuple([1 for i in range(dim - 2)] + [len(lines), len(lines[0])])
    data = [int(char) for char in ''.join(lines)]
    return np.array(data).reshape(shape)

def filterNeighbors(array):
    current = array[math.floor(len(array) / 2)]
    array[math.floor(len(array) / 2)] = 0
    sum = np.sum(array)
    if (current and not (sum == 2 or sum == 3)):
        return 0
    elif (not current and sum == 3):
        return 1
    else:
        return current

def executeCycle(array, dim = 3):
    extended = np.zeros(tuple([len + 2 for len in array.shape]))
    if dim == 3:
        extended[1:array.shape[0] + 1, 1:array.shape[1] + 1, 1:array.shape[2] + 1] = array
    elif dim == 4:
        extended[1:array.shape[0] + 1, 1:array.shape[1] + 1, 1:array.shape[2] + 1, 1:array.shape[3] + 1] = array
    return ndimage.generic_filter(extended, filterNeighbors, size=tuple([3 for i in range(dim)]))

# ---------- AS MAIN ----------

if __name__ == '__main__':
    testArray = parse(testInput)
    for i in range(6):
        testArray = executeCycle(testArray)
    print(int(np.sum(testArray)))

    array = parse(input)
    for i in range(6):
        array = executeCycle(array)
    print(int(np.sum(array)))

    testArray = parse(testInput, 4)
    for i in range(6):
        testArray = executeCycle(testArray, 4)
    print(int(np.sum(testArray)))

    array = parse(input, 4)
    for i in range(6):
        array = executeCycle(array, 4)
    print(int(np.sum(array)))
