export default function Button(callback, name: string, className: string = ''): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = className;
  button.textContent = name;
  button.onclick = callback;

  return button;
}
