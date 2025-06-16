/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const level = parseInt(readline());
const xp = parseInt(readline());

const xpNectLevel = Math.floor(((level+1) ** 1.5) * 10);

let result = xpNectLevel - xp

if (result <= 0) {
    console.log("LEVEL UP");
} else {
    console.log(result);
}




/*
ChatGPT solution:


const level = parseInt(readline());
const xp = parseInt(readline());

// Calculate the remaining XP in a single step.
const remainingXp = Math.floor(((level + 1) ** 1.5) * 10) - xp;

// Use a ternary operator to decide what to print.
console.log(remainingXp <= 0 ? "LEVEL UP" : remainingXp);
 */