// keep symbols as row index -> columns index dict
const symbols = {};

const numbersWithSymbols = [];

const parseSymbols = (lines: string[]) => {
  lines.forEach((line: string, rowIndex: number) => {
    line.split("").forEach((token: string, columnIndex: number) => {
      // is a number or dot, abort
      if (!isNaN(parseInt(token)) || token === ".") {
        return;
      }

      if (!symbols[rowIndex]) {
        symbols[rowIndex] = {};
      }
      symbols[rowIndex][columnIndex] = token;
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

  let hasFoundSymbol = false;
  rows.forEach((r: number) => {
    // if no symbol on this row, return
    if (!symbols[r]) {
      return;
    }

    for (let i = start - 1; i <= end + 1; i++) {
      if (symbols[r][i]) {
        // jackpot, we have a symbol
        hasFoundSymbol = true;
        return;
      }
    }
  });

  if (hasFoundSymbol) {
    numbersWithSymbols.push(number);
  }
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

  numbersWithSymbols.forEach((number: number) => {
    total += number;
  });

  return total;
};
