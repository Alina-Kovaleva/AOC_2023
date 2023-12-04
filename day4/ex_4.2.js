const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'ex_4.txt');
fs.readFile(filePath, (err, input) => {
  if (err) throw err;

  function calculateCardCommonNumbers(str) {
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
    return commonNumbers.length;
  }

  let sum = 0;
  const data = input.toString().split('\n');

  const cardCount = data.filter((s) => s).fill(1);

  for (let i = 0; i < data.length - 1; i++) {
    const winningNumbers = calculateCardCommonNumbers(data[i]);
    for (let j = i + 1; j <= i + winningNumbers; j++) {
      cardCount[j] += cardCount[i];
    }
  }

  cardCount.forEach((el) => (sum += el));
  console.log(`SUM: `, sum);
});
