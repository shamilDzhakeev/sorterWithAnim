export default function getErrorWindow(msg: string): HTMLDivElement {
  const errWindow = document.createElement('div');
  const measge = document.createElement('p');
  const okButton = document.createElement('button');

  okButton.classList.add('center-block-element');
  okButton.innerText = 'Ok';

  measge.innerText = msg;
  errWindow.classList.add('modal-window');

  errWindow.appendChild(measge);
  errWindow.appendChild(okButton);

  function removeNode(): void {
    const elementToRemove = this.parentNode;
    elementToRemove.remove();
  }
  okButton.addEventListener('click', removeNode);
  return errWindow;
}
