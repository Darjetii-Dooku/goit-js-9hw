function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const windowBody = document.querySelector('body')
startBtn.addEventListener('click', handlerStart);
const interval = 1000;
stopBtn.disabled = true;
function handlerStart(evt) {
  const id = setInterval(() => {
    windowBody.style.backgroundColor = getRandomHexColor();
  }, interval);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  stopBtn.addEventListener('click', stopHandler);
  function stopHandler(evt) {
  clearInterval(id);
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

};

