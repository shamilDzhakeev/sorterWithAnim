export default function createLoadingWindow(msg): HTMLDivElement {
  const modalWindow = document.createElement('div');
  modalWindow.classList.add('modal');

  const loadingWindow = document.createElement('div');

  const title = document.createElement('p');
  const loadingWheel = document.createElement('div');

  loadingWheel.classList.add('loader');
  title.innerText = msg;
  loadingWindow.appendChild(title);
  loadingWindow.appendChild(loadingWheel);
  loadingWindow.classList.add('modal-content');
  modalWindow.appendChild(loadingWindow);
  return modalWindow;
}
