import { Elements } from './types';
import getRemoveButton from './close-button';

export default function drawEmptyTemplate(destNode: HTMLElement): Elements {
  const input = document.createElement('input');
  const sortererBlock = document.createElement('div');
  const columnsContainer = document.createElement('div');
  const upButton = document.createElement('button');
  const downButton = document.createElement('button');
  const addButton = document.createElement('button');
  const select = document.createElement('select');

  sortererBlock.classList.add('sorterer-main-container');
  addButton.classList.add('add-button');
  columnsContainer.classList.add('container');
  downButton.classList.add('down-button');
  upButton.classList.add('up-button');

  downButton.innerText = 'Шаг назад';
  upButton.innerText = 'Шаг вперед';
  addButton.innerText = 'Отрисовать';

  input.placeholder = 'Введите значение и нажмите "Отрисовать"';

  sortererBlock.appendChild(document.createTextNode('Источник: '));
  sortererBlock.appendChild(select);
  sortererBlock.appendChild(input);
  sortererBlock.appendChild(addButton);
  sortererBlock.appendChild(downButton);
  sortererBlock.appendChild(upButton);
  sortererBlock.appendChild(columnsContainer);
  sortererBlock.appendChild(getRemoveButton());

  select.addEventListener(
    'change',
    (): void => {
      if (select.selectedIndex === 1) {
        addButton.innerText = 'Загрузить и отрисовать';
        input.disabled = true;
      } else {
        addButton.innerText = 'Отрисовать';
        input.disabled = false;
      }
    },
  );

  const sources = {
    input: 'Ввести значение вручную',
    server: 'Получить значение от сервера',
  };

  for (const key in sources) {
    const option = document.createElement('option');
    option.innerText = sources[key];
    select.append(option);
  }

  destNode.appendChild(sortererBlock);
  return { columnsContainer, upButton, downButton, addButton, select, input };
}
