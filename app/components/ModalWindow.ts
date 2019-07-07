const modalWindow = (msg: string, content: HTMLElement): HTMLDivElement => {
  const modalWindow = document.createElement('div');
  modalWindow.className = 'modal';

  const contentBox = document.createElement('div');
  contentBox.className = 'modal-content';

  const message = document.createElement('p');
  message.innerText = msg;

  content.classList.add('center-block-element');

  contentBox.append(message, content);
  modalWindow.append(contentBox);

  return modalWindow;
};

export default modalWindow;
