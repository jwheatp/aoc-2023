const wordToDigit = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const digitWords = Object.keys(wordToDigit);

export const calibrationValue = (line: string) => {
  let first = null;
  let last = null;

  let buffer = "";
  for (let i = 0; i < line.length; i++) {
    let value = parseInt(line[i]);

    // not a number, continue
    if (isNaN(value)) {
      buffer += line[i];

      // challenge part 2
      let hasFoundWordDigit = false;
      digitWords.forEach((word: string) => {
        if (buffer.startsWith(word) || buffer.endsWith(word)) {
          value = wordToDigit[word];

          // for next overlapping word, keep the last letter
          buffer = buffer.slice(-1);

          hasFoundWordDigit = true;
        }
      });

      if (!hasFoundWordDigit) {
        continue;
      }
    }

    // this is the first we meet
    if (first === null) {
      first = value;
    }

    // get the last
    last = value;
  }

  return parseInt(`${first}${last}`);
};

export const run = async (input: string) => {
  const lines = input.split("\n");
  let total = 0;

  lines.forEach((line) => {
    total += calibrationValue(line);
  });

  return total;
};
