// keep symbols as row index -> columns index dict
const symbols = {};

const GEAR = "*";

const parseSymbols = (lines: string[]) => {
  lines.forEach((line: string, rowIndex: number) => {
    line.split("").forEach((token: string, columnIndex: number) => {
      // parse only gears
      if (token !== GEAR) {
        return;
      }
      // is a number or dot, abort
      if (!symbols[rowIndex]) {
        symbols[rowIndex] = {};
      }
      symbols[rowIndex][columnIndex] = [];
    });
  });
};

const hasAdjacentSymbols = (
  number: number,
  row: number,
  start: number,
  end: number
) => {
  // check previous, current and next rows
  const rows = [row - 1, row, row + 1];

  rows.forEach((r: number) => {
    // if no symbol on this row, return
    if (!symbols[r]) {
      return;
    }

    for (let i = start - 1; i <= end + 1; i++) {
      if (symbols[r][i]) {
        symbols[r][i].push(number);

        return;
      }
    }
  });
};

const parseNumbers = (lines: string[]) => {
  lines.forEach((line: string, rowIndex: number) => {
    let numberBuffer = "";
    let numberStartIndex = null;
    let numberEndIndex = null;
    line.split("").forEach((token: string, columnIndex: number) => {
      // not a number
      if (isNaN(token)) {
        if (numberBuffer !== "") {
          hasAdjacentSymbols(
            numberBuffer,
            rowIndex,
            numberStartIndex,
            numberEndIndex
          );
        }
        numberBuffer = "";
        numberStartIndex = null;
        numberEndIndex = null;
        return;
      }

      // number
      numberBuffer = parseInt(`${numberBuffer}${token}`);
      if (numberStartIndex === null) {
        numberStartIndex = columnIndex;
      }

      numberEndIndex = columnIndex;

      if (columnIndex === line.length - 1) {
        hasAdjacentSymbols(
          numberBuffer,
          rowIndex,
          numberStartIndex,
          numberEndIndex
        );
      }
    });
  });
};

export const run = async (input: string) => {
  let total = 0;

  const lines = input.split("\n");

  parseSymbols(lines);

  parseNumbers(lines);

  // add to total the gears (i.e. symbols with 2 numbers)
  Object.keys(symbols).forEach((row) => {
    Object.keys(symbols[row]).forEach((gear) => {
      if (symbols[row][gear].length === 2) {
        total += symbols[row][gear][0] * symbols[row][gear][1];
      }
    });
  });

  return total;
};
