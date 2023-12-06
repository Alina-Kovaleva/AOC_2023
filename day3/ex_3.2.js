const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'ex_3.txt');
fs.readFile(filePath, (err, input) => {
  if (err) throw err;

  const data = input.toString().split('\n');

  const numbersRegex = /\d+/dg;
  const gearRegex = /\*/dg;

  let sum = 0;

  function isBetween(x, min, max) {
    return x >= min && x <= max;
  }

  function getIndices(i, str, regex) {
    let arr = [];
    let temp = regex.exec(str);
    while (temp !== null) {
      arr.push([i, temp.indices[0][0], temp.indices[0][1] - 1]);
      temp = regex.exec(str);
    }
    return arr;
  }

  const numbersArr = [];
  const gearsArr = [];

  data.forEach((el, index) => numbersArr.push(...getIndices(index, el, numbersRegex)));
  data.forEach((el, index) => gearsArr.push(...getIndices(index, el, gearRegex)));

  for (let i = 0; i < gearsArr.length; i++) {
    let [row, col, _] = gearsArr[i];
    let numAround = [];
    for (let j = 0; j < numbersArr.length; j++) {
      let [numberRow, numberStart, numberEnd] = numbersArr[j];
      if (numberRow == row && (numberStart == col + 1 || numberEnd == col - 1)) {
        numAround.push(parseInt(data[numberRow].substring(numberStart, numberEnd + 1)));
      }
      if (numberRow == row - 1 && isBetween(col, numberStart - 1, numberEnd + 1)) {
        numAround.push(parseInt(data[numberRow].substring(numberStart, numberEnd + 1)));
      }
      if (numberRow == row + 1 && isBetween(col, numberStart - 1, numberEnd + 1)) {
        numAround.push(parseInt(data[numberRow].substring(numberStart, numberEnd + 1)));
      }
    }

    if (numAround.length == 2) {
      sum += numAround[0] * numAround[1];
    }
  }
  console.log('SUM: ', sum);
});
