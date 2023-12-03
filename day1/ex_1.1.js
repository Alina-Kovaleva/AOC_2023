const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'ex_1.1.txt');
fs.readFile(filePath, (err, input) => {
  if (err) throw err;

  function findNumbers(str) {
    if (!str) return 0;
    const regex = /\d/i;
    const leftMatch = str.match(regex);
    const rightMatch = str.split('').reverse().join('').match(regex);
    return Number(leftMatch[0] + rightMatch[0]);
  }

  const data = input.toString().split('\n');

  let sum = 0;
  data.forEach((el) => (sum += findNumbers(el)));

  console.log(sum);
});
