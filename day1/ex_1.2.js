const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'ex_1.1.txt');

fs.readFile(filePath, (err, input) => {
  if (err) throw err;

  const data = input.toString().split('\n');

  function replaceDigitsLettersWithNumbers(str) {
    if (!str) return 0;
    const result = [];
    const regex = /\d|one|two|three|four|five|six|seven|eight|nine/i;
    const regex2 = /.*(\d|one|two|three|four|five|six|seven|eight|nine)/i;
    const leftMatch = str.match(regex);
    const rightMatch = str.match(regex2);

    if (leftMatch) result.push(leftMatch[0]);
    if (rightMatch) result.push(rightMatch[1]);

    const digitWords = {
      one: '1',
      two: '2',
      three: '3',
      four: '4',
      five: '5',
      six: '6',
      seven: '7',
      eight: '8',
      nine: '9',
    };

    if (result[0] in digitWords) {
      result[0] = digitWords[result[0]];
    }
    if (result[1] in digitWords) {
      result[1] = digitWords[result[1]];
    }
    return Number(result.join(''));
  }
  let sum = 0;
  data.forEach((el) => (sum += replaceDigitsLettersWithNumbers(el)));
  console.log(sum);
});
