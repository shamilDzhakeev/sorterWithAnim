import { HeaderOptions } from './types';

export const header = document.createElement('header');
const upButton = document.createElement('button');
const downButton = document.createElement('button');
const addButton = document.createElement('button');

export function drawHeader(optionsObject: HeaderOptions): void {
  const {
    onAddButtonClick,
    onDownButtonClick,
    onUpButtonClick,
    destenationNode,
  } = optionsObject;

  downButton.innerText = 'Step back';
  downButton.onclick = onDownButtonClick;

  upButton.innerText = 'Sort';
  upButton.onclick = onUpButtonClick;

  addButton.innerText = '+';
  addButton.onclick = onAddButtonClick;

  header.appendChild(downButton);
  header.appendChild(upButton);

  header.appendChild(addButton);
  destenationNode.appendChild(header);
}
