import load from './imgs/load.gif';

export default function createModalWindow(msg) {
  const waitModalWindow = document.createElement('div');
  const title = document.createElement('p');
  const img = document.createElement('img');
  img.classList.add('center-block-element');
  img.src = load;
  title.innerText = msg;
  waitModalWindow.appendChild(title);
  waitModalWindow.appendChild(img);
  waitModalWindow.classList.add('modal-window');
  return waitModalWindow;
}
