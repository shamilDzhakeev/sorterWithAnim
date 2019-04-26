import { HeaderOptions } from './types';

export const textField = document.createElement('input');
const header = document.createElement('header');
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

  downButton.id = 'down';
  downButton.innerText = 'Step back';
  downButton.onclick = onDownButtonClick;

  upButton.id = 'up';
  upButton.innerText = 'Sort';
  upButton.onclick = onUpButtonClick;

  addButton.innerText = '+';
  addButton.onclick = onAddButtonClick;

  textField.type = 'number';
  textField.classList.add('text-box');
  textField.placeholder = 'Введите строку из цифр';

  header.appendChild(downButton);
  header.appendChild(upButton);
  header.appendChild(textField);
  header.appendChild(addButton);
  destenationNode.appendChild(header);
}
