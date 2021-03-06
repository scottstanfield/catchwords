const R = require('ramda');

const arrOfWords = [
  "elbow",
 "sequins",
 "salmon",
 "hello",
 "ceiling",
 "drain",
 "rag",
 "nature",
 "shampoo",
 "picnic",
 "mine",
 "big",
 "cabin",
 "ping",
 "mower",
 "computer",
 "stockholder",
 "nest",
 "alligator",
 "spoon",
 "truck",
 "cord",
 "house",
 "avocado",
 "astronaut"
];

const simpleArr = () => {
  let i = 25;
  let arr = [];
  while(i > 0) {
    arr.push('x');
    i--;
  }
  return arr;
};

const findPositions = (item, arr) => {
  let i = 25; // arr.length
  let positions = [];
  while (i >= 0) {
    if (arr[i] === item) {
      positions.push(i); 
    }
    i--;
  }
  return positions;
};

const getRandomNum = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);

const placeNumbersInArr = R.curry((item, amount, arr, overlap) => {
  let i = amount;
  let newArr = arr;
  let positionsOfX = findPositions('x', newArr);
  if (overlap) {
    R.map(index => newArr.splice(index, 1, item), overlap);
  } else {
    while (i > 0) {
      let randNum;
      if (positionsOfX.length === 1) {
        randNum = 0;
      } else {
        randNum = getRandomNum(positionsOfX.length - 1, 0);
      }

      const randomX = positionsOfX[randNum];
      newArr.splice(randomX, 1, item);
      positionsOfX = findPositions('x', newArr);
      i--;
    }
  }
  return newArr;
});

const numNeutral = 13; // = 0
const numCorrect = 6; // = 1
const numAssassin = 3; /// = 2

// PLAYER ONE
const baseArr = simpleArr();
const playerOne = R.pipe(
  placeNumbersInArr(0, numNeutral, R.__, false),
  placeNumbersInArr(1, 9, R.__, false),
  placeNumbersInArr(2, numAssassin, R.__, false),
)(baseArr);
console.log('p1: ', playerOne);

// PLAYER TWO
const findOverlap = R.curry((p1, max) => {
  // MAKE THIS PURE
  let i = p1.length;
  let i2 = max;
  let overlap = [];
  let allGreenIndexes = [];
  while (i >= 0) {
    if (p1[i] === 1) {
      allGreenIndexes.push(i);
    }
    i--;
  }

  while (i2 > 0) {
    const randIndex = getRandomNum(allGreenIndexes.length - 1, 0);
    if (!R.includes(allGreenIndexes[randIndex], overlap)) {
      overlap.push(allGreenIndexes[randIndex]);
      i2--;
    }
  }
  return overlap;
});

const overlap = findOverlap(playerOne, 3);
const arrWithOverlap = placeNumbersInArr(1, overlap.length, simpleArr(), overlap);

const playerTwo = R.pipe(
  placeNumbersInArr(0, numNeutral, R.__, false),
  placeNumbersInArr(1, numCorrect, R.__, false),
  placeNumbersInArr(2, numAssassin, R.__, false),
)(arrWithOverlap);

console.log('p2: ', playerTwo);