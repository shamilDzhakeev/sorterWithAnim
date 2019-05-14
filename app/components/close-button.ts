export default function createCloseButton(): HTMLButtonElement {
  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '✖';

  function removeNode(): void {
    const elementToRemove = this.parentNode;
    elementToRemove.remove();
  }

  closeButton.addEventListener('click', removeNode);
  return closeButton;
}
