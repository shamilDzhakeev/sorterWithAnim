export default function createCloseButton(className: string = ''): HTMLButtonElement {
  const closeButton = document.createElement('button');
  closeButton.className = `${className}`;
  closeButton.innerHTML = '✖';

  function removeNode(): void {
    const elementToRemove = this.parentNode;
    elementToRemove.remove();
  }

  closeButton.addEventListener('click', removeNode);
  return closeButton;
}
