const calibrationValue = (line: string) => {
  let first = null;
  let last = null;

  for (let i = 0; i < line.length; i++) {
    let value = parseInt(line[i]);

    // not a number, continue
    if (isNaN(value)) {
      continue;
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
