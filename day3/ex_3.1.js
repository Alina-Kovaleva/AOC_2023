const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'ex_3.txt');
fs.readFile(filePath, (err, input) => {
  if (err) throw err;

  const data = input.toString().split('\n');
  const numbersRegex = /\d+/dg;
  const numbersArr = [];
  let sum = 0;

  function getIndices(i, str, regex) {
    let arr = [];
    let temp = regex.exec(str);
    while (temp !== null) {
      arr.push([i, temp.indices[0][0], temp.indices[0][1] - 1]);
      temp = regex.exec(str);
    }
    return arr;
  }

  data.forEach((el, index) => numbersArr.push(...getIndices(index, el, numbersRegex)));

  numbersLoop: for (let i = 0; i < numbersArr.length; i++) {
    let [row, start, end] = numbersArr[i];
    const number = parseInt(data[row].substring(start, end + 1));
    if (data[row][start - 1] !== '.' && data[row][start - 1] !== undefined) {
      sum += number;
      continue;
    }
    if (data[row][end + 1] !== '.' && data[row][end + 1] !== undefined) {
      sum += number;
      continue;
    }

    if (row - 1 >= 0) {
      for (let j = start - 1; j <= end + 1; j++) {
        if (data[row - 1][j] !== '.' && data[row - 1][j] !== undefined) {
          sum += number;
          continue numbersLoop;
        }
      }
    }

    if (row + 1 < data.length) {
      for (let j = start - 1; j <= end + 1; j++) {
        if (data[row + 1][j] !== '.' && data[row + 1][j] !== undefined) {
          sum += number;
          continue numbersLoop;
        }
      }
    }
  }

  console.log('SUM: ', sum);
});
