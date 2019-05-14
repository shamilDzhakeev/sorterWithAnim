export default function createErrorWindow(msg: string): HTMLDivElement {
  const errWindow = document.createElement('div');
  const message = document.createElement('p');
  const okButton = document.createElement('button');

  okButton.classList.add('center-block-element');
  okButton.innerText = 'Ok';

  message.innerText = msg;
  errWindow.classList.add('modal-window');

  errWindow.appendChild(message);
  errWindow.appendChild(okButton);

  function removeNode(): void {
    const elementToRemove = this.parentNode;
    elementToRemove.remove();
  }
  okButton.addEventListener('click', removeNode);
  return errWindow;
}
