import { Elements } from './utils/types';
import create from './utils/create-element';

export default function drawTmpl(destNode: HTMLElement): Elements {
  const input = create('input', {
    placeholder: 'Введите значение и нажмите "Отрисовать"',
  });
  const mainCont = create('div', {
    className: 'main-container',
  });
  const getDataBtn = create('button', {
    className: 'get-data-button',
    innerText: '+',
  });
  const renderBtn = create('button', {
    className: 'render-button',
    innerText: 'Отрисовать',
  });
  const select = create('select');
  const br = document.createElement('br');
  const sortBox = create(
    'div',
    { className: 'sorter-main-container' },
    'Источник: ',
    select,
    getDataBtn,
    br,
    'Данные: ',
    input,
    renderBtn,
    mainCont,
  );

  select.addEventListener('change', (): void => {
    if (select.selectedIndex === 1) {
      getDataBtn.style.display = 'inline-block';
      input.placeholder = 'Для получения данных нажмите кнопку "+"';
      input.disabled = true;
    } else {
      getDataBtn.style.display = 'none';
      input.placeholder = 'Введите значение и нажмите "Отрисовать"';
      input.disabled = false;
    }
  });

  const sources = {
    input: 'Ввести значение вручную',
    server: 'Получить значение от сервера',
  };

  for (const key in sources) {
    const option = create('option', { innerText: sources[key] });
    select.append(option);
  }

  destNode.append(sortBox);
  return {
    sortBox,
    mainCont,
    renderBtn,
    getDataBtn,
    select,
    input,
  };
}
