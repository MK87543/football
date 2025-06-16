
const n = parseInt(readline());

let  area = (Math.sqrt(3) / 4) * (n * n);

const area_rounded = Math.ceil(area);

console.log(area_rounded);




/*
Chat GPT solution

const n = parseInt(readline());

// Calculate and round in a single, clear step.
// The formula (√3 / 4) * n² is directly nested inside Math.ceil.
const area = Math.ceil((Math.sqrt(3) / 4) * (n ** 2));

console.log(area);
*/