export default function createErrorWindow(msg: string): HTMLDivElement {
  const modal = document.createElement('div');
  const content = document.createElement('div');
  const message = document.createElement('p');
  const okButton = document.createElement('button');

  function removeNode(): void {
    const elementToRemove = document.querySelector('.modal') as HTMLDivElement;
    elementToRemove.remove();
  }

  okButton.addEventListener('click', removeNode);

  modal.classList.add('modal');
  okButton.classList.add('center-block-element');
  okButton.innerText = 'Ok';

  message.innerText = msg;
  content.classList.add('modal-content');

  content.appendChild(message);
  content.appendChild(okButton);
  modal.appendChild(content);

  return modal;
}
