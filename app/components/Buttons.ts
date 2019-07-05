export const PrimaryButton = (clickHandler: () => void, label: string): HTMLButtonElement => {
  const btn = document.createElement('button');
  btn.addEventListener('click', clickHandler);
  btn.innerText = label;
  return btn;
};

export const CloseButton = (clickHandler: (click: MouseEvent) => void): HTMLButtonElement => {
  const btn = document.createElement('button');
  btn.addEventListener('click', clickHandler);
  btn.innerText = '✖';
  btn.className = 'close-button';
  return btn;
};
