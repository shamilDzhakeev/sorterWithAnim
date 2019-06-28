export default function Button(onClick, label: string, className: string = ''): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = className;
  button.textContent = label;
  button.addEventListener('click', onClick);

  return button;
}
