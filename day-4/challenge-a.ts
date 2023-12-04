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

const score = (winning: number[], draw: number[]) => {
  let score = 0;

  winning.forEach((w: number) => {
    if (draw.includes(w)) {
      if (score === 0) {
        score = 1;
      } else {
        score *= 2;
      }
    }
  });

  return score;
};

export const run = async (input: string) => {
  let total = 0;

  const lines = input.split("\n");

  lines.forEach((line: string) => {
    const { winning, draw } = parseLine(line);
    total += score(winning, draw);
  });

  return total;
};
