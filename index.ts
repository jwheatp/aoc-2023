// get the day number argument
const day = Bun.argv[3];

const folder = `day-${day}`;

// read data
const inputFile = Bun.file(`./${folder}/input.txt`);
const input = await inputFile.text();

// get functions for both challenges
const { run: runA } = await import(`./${folder}/challenge-a.ts`);
const { run: runB } = await import(`./${folder}/challenge-b.ts`);

// output
const outputA = await runA(input);
const outputB = await runB(input);

console.log(`🎄 Day ${day}`);
console.log("Challenge A ⭐", outputA);
console.log("Challenge B ⭐", outputB);
