

const pads = document.querySelectorAll('.pad');
const kickAudio = document.querySelector('.kick-sound');
const snareAudio = document.querySelector('.snare-sound');
const hihatAudio = document.querySelector('.hihat-sound');
const btnPlay = document.querySelector('.play');
const selects = document.querySelectorAll('select');
const muteBtns = document.querySelectorAll('.mute');
const tempoSlider = document.querySelector('.slider');
console.log(tempoSlider);

let index = 0;
let isPlaying = false;
let beatsPerMin = 150;

const repeat = () => {
  let step = index % 8;
  const activeBars = document.querySelectorAll(`.b${step}`);
  activeBars.forEach(bar => {
    bar.style.animation = 'bump 0.6s alternate ease-in-out ';
    bar.addEventListener('animationend', () => {
      bar.style.animation = '';
    });
    if (bar.classList.contains('active')) {
      if (bar.classList.contains('kick-pad')) {
        kickAudio.currentTime = 0;
        kickAudio.play();
      }
      if (bar.classList.contains('snare-pad')) {
        snareAudio.currentTime = 0;
        snareAudio.play();
      }
      if (bar.classList.contains('hihat-pad')) {
        hihatAudio.currentTime = 0;
        hihatAudio.play();
      }
    }
  });
  index++;
};
const start = () => {
  const interval = (60 / beatsPerMin) * 1000;
  if (!isPlaying) {
    isPlaying = true;
    play = setInterval(() => {
      repeat();
    }, interval);
  } else {
    clearInterval(play);
    isPlaying = false;
  }
  if (isPlaying) {
    btnPlay.innerHTML = 'Stop';
  } else {
    btnPlay.innerHTML = 'Play';
  }
};

const changeSound = e => {
  console.log(e.target);
  const selectName = e.target.name;
  const selectValue = e.target.value;
  switch (selectName) {
    case 'kick-select':
      kickAudio.src = selectValue;
      break;
    case 'hihat-select':
      hihatAudio.src = selectValue;
      break;
    case 'snare-select':
      snareAudio.src = selectValue;
      break;
    default:
      break;
  }
};

// Event handler

btnPlay.addEventListener('click', start);

pads.forEach(pad => {
  pad.addEventListener('click', () => {
    pad.classList.toggle('active');
  });
});
selects.forEach(select => {
  select.addEventListener('change', changeSound);
});

muteBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.target.classList.toggle('selected');
    const data = btn.dataset.track;
    if (e.target.classList.contains('selected')) {
      e.target.childNodes[1].classList.replace(
        'fa-volume-up',
        'fa-volume-mute'
      );

      switch (data) {
        case '0':
          kickAudio.volume = 0;
          break;
        case '1':
          snareAudio.volume = 0;
          break;
        case '2':
          hihatAudio.volume = 0;
          break;
      }
    } else {
      e.target.childNodes[1].classList.replace(
        'fa-volume-mute',
        'fa-volume-up'
      );
      switch (data) {
        case '0':
          kickAudio.volume = 1;
          break;
        case '1':
          snareAudio.volume = 1;
          break;
        case '2':
          hihatAudio.volume = 1;
          break;
      }
    }
  });
});

tempoSlider.addEventListener('input', e => {
  document.querySelector('.tempo-nr').innerText = e.target.value;
  beatsPerMin = e.target.value;
});
tempoSlider.addEventListener('change', e => {
  clearInterval(play);
  isPlaying = false;
  if (btnPlay.innerHTML === 'Stop') {
    start();
  }
});
