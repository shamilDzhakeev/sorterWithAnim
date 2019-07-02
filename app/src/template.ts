import { Elements } from './utils/types';
import getDataSource from './utils/data-sources';
import createLoadingWindow from './components/data-loading-window';
import createErrorWindow from './components/error-msg-window';

export default function drawTmpl(): Elements {
  const waitMsg = 'Загрузка данных, пожалуйста подождите.';

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
    } else {
      getDataBtn.style.display = 'none';
      input.placeholder = 'Введите значение и нажмите "Отрисовать"';
    }
  });

  const br = document.createElement('br');

  const sortBox = document.createElement('div');
  sortBox.className = 'sorter-main-container';

  async function getDataFromSource(): Promise<void> {
    const source = getDataSource(select.selectedIndex);
    const waitMsgWindow = createLoadingWindow(waitMsg);
    mainCont.appendChild(waitMsgWindow);
    try {
      const data = await source.getData(input);

      input.value = data.join('');
      waitMsgWindow.remove();
    } catch (err) {
      waitMsgWindow.remove();
      const errorMsg = createErrorWindow(err.message);
      sortBox.append(errorMsg);
    }
  }

  getDataBtn.onclick = getDataFromSource;
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

  return {
    sortBox,
    mainCont,
    renderBtn,
    getDataBtn,
    select,
    input,
  };
}
