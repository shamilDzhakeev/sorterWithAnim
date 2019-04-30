export default function getRemoveButton(): HTMLButtonElement {
  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.innerHTML = '✖';

  function removeNode(): void {
    const elementToRemove = this.parentNode;
    elementToRemove.remove();
  }

  removeButton.addEventListener('click', removeNode);
  return removeButton;
}
