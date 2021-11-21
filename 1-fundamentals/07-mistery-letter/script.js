const classes = {
  style: ['newspaper', 'magazine1', 'magazine2'],
  size: ['medium', 'big', 'reallybig'],
  transform: ['rotateleft', 'rotateright', 'skewleft', 'skewright'],
};

let genClasses = {};

function selectClasses() {
  const selectedClasses = Object.entries(classes).map(([_, classArray]) => {
    const max = classArray.length;
    const randomIndex = Math.floor(Math.random() * max);

    return classArray[randomIndex];
  });

  return selectedClasses;
}

function drawRandomClasses(functionCalls = 0) {
  if (functionCalls >= 36) return '';

  const selectedClasses = selectClasses();
  const classesString = selectedClasses.join(' ');

  if (genClasses[classesString] && genClasses[classesString] !== 0) {
    const callsCount = functionCalls + 1;
    drawRandomClasses(callsCount);
  } else {
    genClasses[classesString] = 1;
  }

  return classesString;
}

function generateCard(text) {
  const wordArray = text.split(' ');
  const fragment = document.createDocumentFragment();
  const wordCount = document.querySelector('#carta-contador');

  wordCount.innerText = wordArray.length;

  wordArray.forEach((word) => {
    const wordElement = document.createElement('span');
    wordElement.innerText = word;
    wordElement.className = drawRandomClasses();

    fragment.appendChild(wordElement);
  });

  return fragment;
}

function addGenerateLetterEvent() {
  const generateLetterButton = document.querySelector('#criar-carta');
  const wordCount = document.querySelector('#carta-contador');

  generateLetterButton.addEventListener('click', () => {
    genClasses = {};

    const letterInput = document.querySelector('#carta-texto');
    const cardsContainer = document.querySelector('#carta-gerada');

    if (letterInput.value.match(/\w/g)) {
      cardsContainer.innerHTML = '';
      cardsContainer.appendChild(generateCard(letterInput.value.trim()));
    } else {
      cardsContainer.innerHTML = 'Por favor, digite o conteúdo da carta.';
      wordCount.innerText = 0;
    }
  });
}

function addCardsClickEvent() {
  const cardsContainer = document.querySelector('#carta-gerada');

  cardsContainer.addEventListener('click', (event) => {
    const { target } = event;

    genClasses[target.className] = 0;

    if (target.tagName === 'SPAN') {
      target.className = drawRandomClasses();
    }
  });
}

window.onload = () => {
  addGenerateLetterEvent();
  addCardsClickEvent();
};
