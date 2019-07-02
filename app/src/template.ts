import { Elements } from './utils/types';

export default function drawTmpl(destNode: HTMLElement): Elements {
  const input = document.createElement('input');
  input.placeholder = 'Введите значение и нажмите "Отрисовать"';

  const mainCont = document.createElement('div');
  mainCont.className = 'main-container';

  const getDataBtn = document.createElement('button');
  getDataBtn.className = 'get-data-button';
  getDataBtn.innerText = 'Загрузить';

  const renderBtn = document.createElement('button');
  renderBtn.className = 'render-button';
  renderBtn.innerText = 'Отрисовать';

  const select = document.createElement('select');

  select.addEventListener('change', (): void => {
    if (select.selectedIndex === 1) {
      getDataBtn.style.display = 'inline-block';
      input.placeholder = 'Для получения данных нажмите "Загрузить"';
      input.disabled = true;
    } else {
      getDataBtn.style.display = 'none';
      input.placeholder = 'Введите значение и нажмите "Отрисовать"';
      input.disabled = false;
    }
  });

  const br = document.createElement('br');

  const sortBox = document.createElement('div');
  sortBox.className = 'sorter-main-container';
  sortBox.append('Источник: ', select, getDataBtn, br, 'Данные: ', input, renderBtn, mainCont);

  const sources = {
    input: 'Ввести значение вручную',
    server: 'Получить значение от сервера',
  };

  for (const key in sources) {
    const option = document.createElement('option');
    option.innerText = sources[key];
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
