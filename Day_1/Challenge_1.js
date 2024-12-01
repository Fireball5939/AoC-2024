import { AocClient } from "advent-of-code-client";
import { argv } from "node:process";

if (argv[2] === undefined || argv.length > 3) {
    throw new Error('Error! Token was not passed in or too many arguments were given!');
}

  const client = new AocClient({
      year: 2024,
     day: 1,
     token: argv[2]
});

const puzzleIn = await client.getInput();

const numberPairs = puzzleIn.split('\n');
let locationIDs1 = [];
let locationIDs2 = [];

for (const numberPair of numberPairs) {
    const numberPairArr = numberPair.split('   ');
    if (numberPairArr[0] === '') continue;
    locationIDs1.push(numberPairArr[0]);
    locationIDs2.push(numberPairArr[1]);
}

locationIDs1.sort();
locationIDs2.sort();

let totalDistance = 0;

for (let i = 0; i < 1000; i++) {
    const distance = Math.abs(locationIDs1[i] - locationIDs2[i]);
    totalDistance += distance;
}

console.log(`Possible solution found: ${totalDistance}. Submitting to AoC...`);
try {
    const success = await client.submit(1, totalDistance);
    if (success) {
        console.log(`Success! We found the correct answer!`);
    } else {
        console.log(`Bzzt! That wasn't it... There's a bug somewhere in the code...`);
    }
} catch(e) {
    if (e.message === "You don't seem to be solving the correct level. Did you already complete it?") console.log("Either you have already completed this challenge or cannot complete it yet.");
    else throw e;
}
process.exit();
