import { HeaderOptions } from './types';
import getRemoveButton from '../elements/close-button';

export function drawEmptyTemplate(
  optionsObject: HeaderOptions
): HTMLDivElement {
  const sortererBlock = document.createElement('div');
  const upButton = document.createElement('button');
  const downButton = document.createElement('button');
  const addButton = document.createElement('button');
  const columnsContainer = document.createElement('div');
  sortererBlock.classList.add('sorterer-main-container');

  const { onDownButtonClick, onUpButtonClick, destenationNode } = optionsObject;

  downButton.innerText = 'Step back';
  downButton.onclick = onDownButtonClick;

  upButton.innerText = 'Sort';
  upButton.onclick = onUpButtonClick;

  addButton.innerText = '+';
  addButton.classList.add('add-button');
  addButton.onclick = (): void =>
    console.log('Рисовать по текущим значениям...');

  columnsContainer.classList.add('container');

  /*const label = `Original state: ${this.curValuesArr.join(' ')}`;
    const labelBox = document.createElement('legend');
    labelBox.classList.add('label');
    labelBox.innerText = label;
    columnsContainer.appendChild(labelBox);*/

  sortererBlock.appendChild(downButton);
  sortererBlock.appendChild(upButton);
  sortererBlock.appendChild(addButton);
  sortererBlock.appendChild(columnsContainer);
  sortererBlock.appendChild(getRemoveButton());
  destenationNode.appendChild(sortererBlock);

  return columnsContainer;
}
