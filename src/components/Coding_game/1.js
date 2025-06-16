const n = parseInt(readline());

for (let i = 1; i <= n; i++) {


    if (i % 3 == 0 && i % 4 == 0 && i % 5 == 0) {
        console.log("FizzBuzzBar");
    }

    else if (i % 3 == 0 && i % 4 == 0 && i % 5 != 0) {
        console.log("FizzBar");
    }

    else if (i % 5 == 0 && i % 4 == 0 && i % 3 != 0) {
        console.log("BuzzBar");
    }

    else if (i % 5 == 0 && i % 3 == 0 && i % 4 != 0) {
        console.log("FizzBuzz");
    }
    else if (i % 3 == 0) {
        console.log("Fizz");
    }

    else if (i % 5 == 0) {
        console.log("Buzz");
    }

    else if (i % 4 == 0) {
        console.log("Bar");
    }





    else {
        console.log(i)
    }
}

//ChatGPT solution:
/*
const n = parseInt(readline());

for (let i = 1; i <= n; i++) {
    // 1. Start with an empty string for each number.
    let output = "";

    // 2. Append words based on individual rules.
    if (i % 3 === 0) {
        output += "Fizz";
    }
    if (i % 5 === 0) {
        output += "Buzz";
    }
    if (i % 4 === 0) {
        output += "Bar";
    }

    // 3. If the string is still empty, use the number. Otherwise, use the string.
    console.log(output || i);
}
*/