import { HeaderOptions } from './types';
import getRemoveButton from '../elements/close-button';

export function drawEmptyTemplate(
  optionsObject: HeaderOptions,
): HTMLDivElement {
  const header = document.createElement('div');
  const upButton = document.createElement('button');
  const downButton = document.createElement('button');
  const addButton = document.createElement('button');
  const columnsContainer = document.createElement('div');

  const { onDownButtonClick, onUpButtonClick, destenationNode } = optionsObject;

  downButton.innerText = 'Step back';
  downButton.onclick = onDownButtonClick;

  upButton.innerText = 'Sort';
  upButton.onclick = onUpButtonClick;

  addButton.innerText = '+';
  addButton.classList.add('add-button');
  addButton.onclick = (): void =>
    console.log('Рисовать по текущим значениям...');

  columnsContainer.className = 'container';

  header.appendChild(downButton);
  header.appendChild(upButton);
  header.appendChild(addButton);
  header.appendChild(columnsContainer);
  header.appendChild(getRemoveButton());
  destenationNode.appendChild(header);

  return columnsContainer;
}
