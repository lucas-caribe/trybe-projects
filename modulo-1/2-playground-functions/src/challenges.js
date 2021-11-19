// Desafio 1
function compareTrue(firstValue, secondValue) {
  return firstValue && secondValue;
}

// Desafio 2
function calcArea(base, height) {
  return (base * height) / 2;
}

// Desafio 3
function splitSentence(sentence) {
  return sentence.split(' ');
}

// Desafio 4
function concatName(strings) {
  return `${strings[strings.length - 1]}, ${strings[0]}`;
}

// Desafio 5
function footballPoints(wins, ties) {
  return wins * 3 + ties;
}

// Desafio 6
function highestCount(array) {
  let max = Math.max(...array);

  return array.reduce((count, value) => {
    if (value === max) return count + 1;

    return count;
  }, 0);
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let distCat1 = Math.abs(mouse - cat1);
  let distCat2 = Math.abs(mouse - cat2);

  if (distCat1 < distCat2) return 'cat1';

  if (distCat2 < distCat1) return 'cat2';

  return 'os gatos trombam e o rato foge';
}

// Desafio 8
function checkNumberFizzBuzz(number) {
  if (number % 15 === 0) return 'fizzBuzz';
  if (number % 5 === 0) return 'buzz';
  if (number % 3 === 0) return 'fizz';

  return 'bug!';
}

function fizzBuzz(numbers) {
  let result = [];

  for (let number of numbers) {
    result.push(checkNumberFizzBuzz(number));
  }

  return result;
}

// Desafio 9
function getEncodedDecodedMessage(message, table) {
  let newMessage = '';

  for (let char of message) {
    if (table[char] !== undefined) newMessage += table[char];
    else newMessage += char;
  }

  return newMessage;
}

function encode(message) {
  let encodeTable = {
    a: '1',
    e: '2',
    i: '3',
    o: '4',
    u: '5',
  };

  return getEncodedDecodedMessage(message, encodeTable);
}
function decode(message) {
  let decodeTable = {
    1: 'a',
    2: 'e',
    3: 'i',
    4: 'o',
    5: 'u',
  };

  return getEncodedDecodedMessage(message, decodeTable);
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
