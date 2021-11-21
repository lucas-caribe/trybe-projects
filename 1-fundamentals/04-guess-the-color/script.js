const numberOfChoices = 6;
let colorToGuess;
let guessed;
let score = 0;

function generateRandomRGB() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);

  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function generateRandomColors() {
  const colors = [];

  colors[0] = { color: colorToGuess, selected: false };

  for (let i = 1; i < numberOfChoices; i += 1) {
    colors.push({ color: generateRandomRGB(), selected: false });
  }

  return colors;
}

function pickRandomIndex(colors) {
  let randomIndex = Math.floor(Math.random() * numberOfChoices);

  while (colors[randomIndex].selected) {
    randomIndex = Math.floor(Math.random() * numberOfChoices);
  }

  return randomIndex;
}

function addCircles() {
  const circlesSection = document.querySelector('.circles-section');
  const colors = generateRandomColors();

  circlesSection.innerHTML = '';

  for (let i = 0; i < numberOfChoices; i += 1) {
    const randomIndex = pickRandomIndex(colors);
    const colorToSet = colors[randomIndex].color;
    const circle = document.createElement('div');
    circle.className = 'ball';
    circle.style.backgroundColor = colorToSet;
    colors[randomIndex].selected = true;

    circlesSection.appendChild(circle);
  }
}

function handleCirclesClick(event) {
  const { target } = event;

  if (target.classList.contains('ball') && !guessed) {
    const answerElement = document.querySelector('#answer');
    const scoreElement = document.querySelector('#score');
    guessed = true;

    if (target.style.backgroundColor === colorToGuess) {
      score += 3;
      answerElement.innerText = 'Acertou!';
      scoreElement.innerText = `Score: ${score}`;
    } else {
      answerElement.innerText = 'Errou! Tente novamente!';
    }
    target.style.boxShadow = '0 0 2px 1px gray';
  }
}

function addEventListenerToCircles() {
  const circlesSection = document.querySelector('.circles-section');

  circlesSection.addEventListener('click', handleCirclesClick);
}

function startRound() {
  const colorToGuessElement = document.querySelector('#rgb-color');
  const answerElement = document.querySelector('#answer');

  guessed = false;

  answerElement.innerText = 'Escolha uma cor';

  colorToGuess = generateRandomRGB();
  colorToGuessElement.innerText = colorToGuess.replace(/rgb/, '');

  addCircles();
  addEventListenerToCircles();
}

function addResetGameEventListener() {
  const resetButton = document.querySelector('#reset-game');

  resetButton.addEventListener('click', (event) => {
    event.preventDefault();

    startRound();
  });
}

window.onload = () => {
  const scoreElement = document.querySelector('#score');
  scoreElement.innerText = `Score: ${score}`;
  startRound();
  addResetGameEventListener();
};
