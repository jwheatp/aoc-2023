const parseLine = (line: string) => {
  const parts = line.split(": ");

  const numbers = parts[1].split(" | ");

  const winning = numbers[0].split(" ").map((n) => parseInt(n));

  const draw = numbers[1]
    .split(" ")
    .filter((n) => n !== "")
    .map((n) => parseInt(n));

  return { winning, draw };
};

const getMatchingNumbers = (winning: number[], draw: number[]) => {
  let score = 0;

  winning.forEach((w: number) => {
    if (draw.includes(w)) {
      score += 1;
    }
  });

  return score;
};

const copies = {};

export const run = async (input: string) => {
  const lines = input.split("\n");

  for (let i = 1; i <= lines.length; i++) {
    copies[i] = 1;
  }

  lines.forEach((line: string, index: number) => {
    const { winning, draw } = parseLine(line);

    index = index + 1;

    const score = getMatchingNumbers(winning, draw);

    for (let i = 0; i < copies[index]; i++) {
      for (let j = index + 1; j <= index + score; j++) {
        if (copies[j]) {
          copies[j] += 1;
        }
      }
    }
  });

  // sum all copies values
  const total = Object.values(copies).reduce((a: number, b: number) => a + b);
  return total;
};
