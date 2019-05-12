import load from './imgs/load.gif';

export default function createModalWindow(msg) {
  const window = document.createElement('div');
  const title = document.createElement('p');
  const img = document.createElement('img');
  img.classList.add('center-block-element');
  img.src = load;
  title.innerText = msg;
  window.appendChild(title);
  window.appendChild(img);
  window.classList.add('modal-window');
  return window;
}
