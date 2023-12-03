const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'ex_2.1.txt');
fs.readFile(filePath, (err, input) => {
  if (err) throw err;

  function compareNumbers(a, b) {
    return b - a;
  }

  function calculateCubes(str) {
    if (!str) return 0;
    const blueRegex = /(\d+)\s+blue/gi;
    const redRegex = /(\d+)\s+red/gi;
    const greenRegex = /(\d+)\s+green/gi;
    const gameRegex = /Game (\d+)/;

    let match;
    const blueNumbers = [];
    const redNumbers = [];
    const greenNumbers = [];

    while ((match = blueRegex.exec(str)) !== null) {
      blueNumbers.push(Number(match[1]));
    }

    while ((match = redRegex.exec(str)) !== null) {
      redNumbers.push(Number(match[1]));
    }

    while ((match = greenRegex.exec(str)) !== null) {
      greenNumbers.push(Number(match[1]));
    }

    if (blueNumbers.sort(compareNumbers)[0] > 14) {
      return 0;
    }
    if (redNumbers.sort(compareNumbers)[0] > 12) {
      return 0;
    }
    if (greenNumbers.sort(compareNumbers)[0] > 13) {
      return 0;
    }

    const gameMatch = str.match(gameRegex);
    return Number(gameMatch[1]);
  }

  const data = input.toString().split('\n');

  let gamesSum = 0;

  data.forEach((el) => (gamesSum += calculateCubes(el)));
  console.log(gamesSum);
});
