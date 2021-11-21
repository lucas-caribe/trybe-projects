const memeContainerID = '#meme-image-container';
const sampleMemes = [
  { fileName: 'meme1.png', alt: 'Success Kid' },
  { fileName: 'meme2.png', alt: 'Sad Keanu' },
  { fileName: 'meme3.png', alt: 'Disaster Girl' },
  { fileName: 'meme4.png', alt: 'Distracted Boyfriend' },
];

function addMemeTextInputListener() {
  const textInput = document.querySelector('#text-input');

  textInput.addEventListener('input', (event) => {
    const memeText = document.querySelector('#meme-text');

    memeText.innerText = event.target.value;
  });
}

function setImage(image) {
  const memeImage = document.querySelector('#meme-image');

  if (typeof image === 'string') {
    memeImage.setAttribute('src', image);
  } else {
    memeImage.setAttribute('src', URL.createObjectURL(image));
  }
}

function addImageInputListener() {
  const imageInput = document.querySelector('#meme-insert');

  imageInput.addEventListener('change', (event) => {
    setImage(event.target.files[0]);
  });
}

function addFireEventListener() {
  const fireButton = document.querySelector('#fire');

  fireButton.addEventListener('click', (event) => {
    event.preventDefault();

    const imageContainer = document.querySelector(memeContainerID);

    imageContainer.className = 'fire-border';
  });
}

function addWaterEventListener() {
  const fireButton = document.querySelector('#water');

  fireButton.addEventListener('click', (event) => {
    event.preventDefault();

    const imageContainer = document.querySelector(memeContainerID);

    imageContainer.className = 'water-border';
  });
}

function addEarthEventListener() {
  const fireButton = document.querySelector('#earth');

  fireButton.addEventListener('click', (event) => {
    event.preventDefault();

    const imageContainer = document.querySelector(memeContainerID);

    imageContainer.className = 'earth-border';
  });
}

function setMemeProperties(meme, index) {
  const memeElement = document.createElement('img');
  memeElement.className = 'sample-meme';
  memeElement.src = `./imgs/${meme.fileName}`;
  memeElement.alt = meme.alt;
  memeElement.id = `meme-${index + 1}`;

  return memeElement;
}

function generateSampleMemes() {
  const sampleMemesSection = document.querySelector('.sample-memes-section');

  sampleMemes.forEach((meme, index) => {
    sampleMemesSection.appendChild(setMemeProperties(meme, index));
  });
}

function addSampleMemesEventListener() {
  const sampleMemesSection = document.querySelector('.sample-memes-section');

  sampleMemesSection.addEventListener('click', (event) => {
    const { target } = event;

    if (target.classList.contains('sample-meme')) {
      setImage(target.src);
    }
  });
}

window.onload = () => {
  addMemeTextInputListener();
  addImageInputListener();
  addFireEventListener();
  addWaterEventListener();
  addEarthEventListener();
  generateSampleMemes();
  addSampleMemesEventListener();
};
