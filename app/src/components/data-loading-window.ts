import loading from '../imgs/load.gif';

export default function createLoadingWindow(msg): HTMLDivElement {
  const modalWindow = document.createElement('div');
  modalWindow.classList.add('modal');

  const loadingWindow = document.createElement('div');

  const title = document.createElement('p');
  const img = document.createElement('img');

  img.classList.add('center-block-element');
  img.src = loading;
  title.innerText = msg;
  loadingWindow.appendChild(title);
  loadingWindow.appendChild(img);
  loadingWindow.classList.add('modal-content');
  modalWindow.appendChild(loadingWindow);
  return modalWindow;
}
