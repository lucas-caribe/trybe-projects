// Desafio 10
function techList(techs, name) {
  if (techs.length === 0) return 'Vazio!';

  let output = [];

  techs.sort();

  for (let tech of techs) {
    output.push({
      tech,
      name,
    });
  }

  return output;
}

// Desafio 11
function checkNumbers(numbers) {
  let numbersCount = Array(10).fill(0);

  for (let number of numbers) {
    if (number < 0 || number > 9) return false;
    numbersCount[Number(number)] += 1;
  }

  return !numbersCount.some((number) => number >= 3);
}

function addMask(numbers) {
  let mask = '(__) _____-____';
  let phoneNumber = '';

  for (let char of mask) {
    if (char === '_') {
      phoneNumber += numbers.shift();
    } else {
      phoneNumber += char;
    }
  }

  return phoneNumber;
}

function generatePhoneNumber(numbers) {
  if (numbers.length !== 11) {
    return 'Array com tamanho incorreto.';
  }

  if (!checkNumbers(numbers)) {
    return 'não é possível gerar um número de telefone com esses valores';
  }

  return addMask(numbers);
}

// Desafio 12
function checkSidesSumDiff(side1, side2, side3) {
  let sum = side2 + side3;
  let diff = Math.abs(side2 - side3);

  return side1 < sum && side1 > diff;
}

function triangleCheck(lineA, lineB, lineC) {
  // checking side A
  if (!checkSidesSumDiff(lineA, lineB, lineC)) return false;

  // checking side B
  if (!checkSidesSumDiff(lineB, lineA, lineC)) return false;

  // checking side C
  if (!checkSidesSumDiff(lineC, lineA, lineB)) return false;

  return true;
}

// Desafio 13
function hydrate(string) {
  string = string.replace(/[^\d]/g, '');
  let sum = 0;

  for (let char of string) {
    sum += Number(char);
  }

  if (sum === 1) return '1 copo de água';

  return `${sum} copos de água`;
}

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
