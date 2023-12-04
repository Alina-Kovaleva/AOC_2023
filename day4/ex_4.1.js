const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'ex_4.txt');
fs.readFile(filePath, (err, input) => {
  if (err) throw err;

  function calculateCardScore(str) {
    if (!str) return 0;
    const winningNumbersRegex = /:(.*?)\|/;
    let winningNumbers = str
      .match(winningNumbersRegex)[1]
      .trim()
      .split(' ')
      .filter((s) => s)
      .map(Number);

    const numbersYouHaveRegex = /\|\s*(\d+(?:\s+\d+)*)/;
    const numbersYouHave = str
      .match(numbersYouHaveRegex)[1]
      .trim()
      .split(' ')
      .filter((s) => s)
      .map(Number);

    const commonNumbers = winningNumbers.filter((n) =>
      numbersYouHave.includes(n)
    );

    if (commonNumbers.length === 0) return Number(0);
    const score = Math.pow(2, commonNumbers.length - 1);
    return Number(score);
  }

  let sum = 0;
  const data = input.toString().split('\n');
  data.forEach((el) => (sum += calculateCardScore(el)));
  console.log(sum);
});
