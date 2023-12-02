const LIMITS = {
  red: 12,
  green: 13,
  blue: 14,
};

const COLORS = Object.keys(LIMITS);

/**
 * parse string data to a pretty object with this shape :
{
  id: 5,
  draws: [
    {
      red: 6,
      blue: 1,
      green: 3
    }, {
      blue: 2,
      red: 1,
      green: 2
    }
  ]
}
 */
const parseLine = (line: string) => {
  const regexGroups = /Game ([0-9]+): (.*)/g.exec(line);

  const id = parseInt(regexGroups[1]);

  const sets = regexGroups[2].split("; ");

  const draws = [];
  sets.forEach((set: string) => {
    const items = set.split(", ");

    const draw = {};
    items.forEach((item: string) => {
      item = item.split(" ");
      const amount = parseInt(item[0]);
      const color = item[1];

      draw[color] = amount;
    });
    draws.push(draw);
  });

  return {
    id,
    draws,
  };
};

export const run = async (input: string) => {
  const lines = input.split("\n");

  let total = 0;

  // each game
  lines.forEach((line: string) => {
    const data = parseLine(line);

    for (let i = 0; i < data.draws.length; i++) {
      const draw = data.draws[i];
      for (let j = 0; j < COLORS.length; j++) {
        const color = COLORS[j];

        if (draw[color] > LIMITS[color]) {
          return;
        }
      }
    }

    total += data.id;
  });

  return total;
};
