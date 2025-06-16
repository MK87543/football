
const line1 = readline();
const line2 = readline();


const reversedLine1 = line1.split('').reverse().join('');

let count = 0;

for (let i = 0; i < line2.length; i++) {
    if (line2[i] !== reversedLine1[i]) {
        count++;
    }
}

console.log(count);



/* 
Chat GPT solution


const line1 = readline();
const line2 = readline();

// 1. Reverse the first line to align it with the second.
const reversedLine1 = line1.split('').reverse().join('');

// 2. Chain methods to calculate the difference in one go.
const replacedCount = line2
    .split('')  // -> ['!', 'd', 'l', 'q', 'o', 'w', ' ', 'o', 'l', 'f', 'e', 'H']
    .filter(    // -> Keep only the elements where the condition is true.
        (char, index) => char !== reversedLine1[index]
    )           // -> ['q', 'f'] (an array of only the replaced characters)
    .length;    // -> 2

console.log(replacedCount);




*/