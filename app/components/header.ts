/* eslint-disable @typescript-eslint/explicit-function-return-type */
import getRemoveButton from './close-button';
import { getNumericArr } from './add-button';

export const columnsContainer = document.createElement('div');

const sortererBlock = document.createElement('div');
const upButton = document.createElement('button');
const downButton = document.createElement('button');
const addButton = document.createElement('button');
const select = document.createElement('select');
const input = document.createElement('input');

sortererBlock.classList.add('sorterer-main-container');
addButton.classList.add('add-button');
columnsContainer.classList.add('container');

/* downButton.onclick = down;
upButton.onclick = up; */

downButton.innerText = 'Step back';
upButton.innerText = 'Sort';
addButton.innerText = '+';

input.placeholder = 'Введите значение';

addButton.onclick = getNumericArr;

sortererBlock.appendChild(downButton);
sortererBlock.appendChild(upButton);
sortererBlock.appendChild(addButton);
sortererBlock.appendChild(select);
sortererBlock.appendChild(input);
sortererBlock.appendChild(columnsContainer);
sortererBlock.appendChild(getRemoveButton());

select.addEventListener('change', () => {
  if (select.selectedIndex === 1) {
    input.disabled = true;
  } else {
    input.disabled = false;
  }
  console.log(select.selectedIndex);
});

const sources = {
  input: 'Ввести значение ручками',
  server: 'Получить значение от сервера',
};

for (const key in sources) {
  const option = document.createElement('option');
  option.innerText = sources[key];
  select.append(option);
}

export function drawEmptyTemplate(destinationNode): void {
  destinationNode.appendChild(sortererBlock);
}
