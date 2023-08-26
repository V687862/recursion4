/***********************************************************************
 * BONUS PROBLEM
************************************************************************
Write a recursive function that will find the best way to make change from a
given set of coin values for a given amount of money. The set of coin values
should default to using pennies (1 cent), nickels (5 cents), dimes (10 cents),
and quarters (25 cents). Return `null` if there are no possible ways to make
change for the given target amount.

Examples:

makeChange(21); // [1, 10, 10]
makeChange(75); // [25, 25, 25]
makeChange(33, [15, 3]); // [3, 15, 15]
makeChange(34, [15, 3]); // null
makeChange(24, [10, 7, 1]) // [7, 7, 10]

Here's a game plan for solving the problem:

First, write a 'greedy' version called `greedyMakeChange`:

Take as many of the biggest coin as possible and add them to your result.
Add to the result by recursively calling your method on the remaining amount,
leaving out the biggest coin, until the remainder is zero.
Once you have a working greedy version, talk with your partner about refactoring
this to `makeBetterChange`. What's wrong with `greedyMakeChange`?

Consider the case of `greedyMakeChange(24, [10,7,1])`. Because it takes as many
10 pieces as possible, `greedyMakeChange` misses the correct answer of
`[10,7,7]` (try it in node).

To `makeBetterChange`, we only take one coin at a time and never rule out
denominations that we've already used. This allows each coin to be available
each time we get a new remainder. By iterating over the denominations and
continuing to search for the best change, we assure that we test for
'non-greedy' uses of each denomination.

Discuss the following game plan and then work together to implement your
new method:

- Iterate over each coin.
- Grab only one of that one coin and recursively call `makeBetterChange` on the
  remainder using coins less than or equal to the current coin.
- Add the single coin to the change returned by the recursive call. This will be
  a possible solution, but maybe not the best one.
- Keep track of the best solution and return it at the end.

N.B. Don't generate every possible permutation of coins and then compare them.
Remember that a permutation is not the same thing as a combination - we will
need to check every combination of coins that add up to our target, we just
don't want to check the same combination in different orders. If you get stuck
you can start by writing a solution that calculates and compares all of the
permutations without storing them in an array. Then go back and refactor your
solution so that it only calculates and compares all of the different
combinations.
***********************************************************************/

function makeBetterChange(target, coins = [25, 10, 5, 1]) {
  // Your code here
  if (target === 0) {
    return [];
  } else if (target < 0) {
    return null;
  } else if (coins.length === 0) {
    return null;
  } else {
    const coin = coins[0];
    const remainingCoins = coins.slice(1);
    const result1 = makeBetterChange(target - coin, coins);
    const result2 = makeBetterChange(target, remainingCoins);
    if (result1 === null && result2 === null) {
      return null;
    } else if (result1 === null) {
      return result2;
    } else if (result2 === null) {
      return [coin].concat(result1);
    } else {
      if (result1.length + 1 <= result2.length) {
        return [coin].concat(result1);
      } else {
        return result2;
      }
    }
  }
}

// const makeBetterChange = (target, coins = [25, 10, 5, 1]) => {
//   // If the target amount is 0, return an empty arra4
//   // Sort the coins in descending order so we can start with the highest denomination
//   const sortedCoins = coins.sort((a, b) => b - a);
//   // Initialize a variable to keep track of the best (smallest number of coins) change found so far
//   let bestChange = null;

//   // Iterate over each coin denomination
//   sortedCoins.forEach(coin => {
//     // If the current coin denomination is greater than the target, skip this iteration
//     if (coin > target) return;

//     // Calculate the remaining amount after using one coin of the current denomination
//     const remainder = target - coin;4change for the remaining amount
//     // (pass only denominations less than or equal to the current coin to the recursive call)
//     const bestChangeForRest = makeBetterChange(remainder, sortedCoins.filter(val => val <= coin));

//     // If no change was found for the remaining amount, skip this iteration
//     if (!bestChangeForRest) return;

//     // Combine the current coin with the change found for the remaining amount to form the change for the current target
//     const thisChange = [coin, ...bestChangeForRest];
//     // Update the bestChange if the current change has fewer coins than the previously found best change
//     bestChange = (!bestChange || thisChange.length < bestChange.length) ? thisChange : bestChange;
//   });

//   // Return the best change found
//   return bestChange;
// }

const makeGreedyChange = (target, coins = [25, 10, 5, 1]) => {
  let result = [];
  coins = coins.sort((a, b) => b - a);
  let remaining = target;

  for (const coin of coins) {
    const numCoins = Math.floor(remaining / coin);
    for (let i = 0; i < numCoins; i++) {
      result.push(coin);
    }
    remaining %= coin;
  }
  return remaining === 0 ? result : null;
};

console.log(makeGreedyChange(26)); // [10, 10, 1]
console.log(makeBetterChange(26));

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = makeBetterChange
} catch (e) {
  module.exports = null;
}
