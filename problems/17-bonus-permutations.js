/***********************************************************************
 * BONUS PROBLEM
************************************************************************
Write a recursive method permutations(array) that calculates all the
permutations of the given array. For an array of length n there are n! different
permutations. So for an array with three elements we will have 3 * 2 * 1 = 6
different permutations.

Examples:

permutations([1, 2]) // [[1, 2], [2, 1]]
permutations([1, 2, 3]) // [[1, 2, 3], [1, 3, 2],
                        // [2, 1, 3], [2, 3, 1],
                        // [3, 1, 2], [3, 2, 1]]
***********************************************************************/

const permutations = arr => {
  if (arr.length <= 1) return [arr];

  return arr.reduce((all, item, index) => {
    const remaining = [...arr.slice(0, index), ...arr.slice(index + 1)];
    const perms = permutations(remaining).map(p => [item, ...p]);
    return all.concat(perms);
  }, []);
};

console.log(permutations([1]));           // [[1]]
console.log(permutations([1, 2]));        // [[1, 2], [2, 1]]
console.log(permutations([1, 2, 3]));    /* [[1, 2, 3], [1, 3, 2], 
                                            [2, 1, 3], [2, 3, 1], 
                                            [3, 1, 2], [3, 2, 1]] */

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = permutations;
} catch (e) {
  module.exports = null;
}
