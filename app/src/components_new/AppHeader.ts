import SourcesSelect from './SourcesSelect';
import Button from './Button';
import getDataSource from '../utils/data-sources';
import checkData from '../utils/data-checker';
import getRandomColor from '../utils/random-color';
import Sorter from './Sorter';
import SorterElement from './SorterElement';
import Render from '../utils/render';

export default function AppHeader(): HTMLDivElement {
  const appHeader = document.createElement('div');
  appHeader.className = 'application-header';

  const select = SourcesSelect();
  const dataInput = document.createElement('input');

  async function getDataFromSource(): Promise<void> {
    const source = getDataSource(select.selectedIndex);

    try {
      const data = await source.getData(dataInput);
      if (!checkData(data)) {
        throw new Error('Данные некорректны!');
      }
      const targetValue = data;
      dataInput.value = targetValue.join('');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  const getDataButton = Button(getDataFromSource, '+', 'get-data-button');

  select.addEventListener('change', (): void => {
    if (select.selectedIndex === 1) {
      getDataButton.style.display = 'inline-block';
      dataInput.placeholder = 'Для получения данных нажмите кнопку "+"';
    } else {
      getDataButton.style.display = 'none';
      dataInput.placeholder = 'Введите значение и нажмите "Отрисовать"';
    }
  });

  function renderData(): void {
    const targetValue = dataInput.value.split('').map(Number);
    const color = getRandomColor();
    try {
      if (!checkData(targetValue)) {
        throw new Error('Err');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  const renderButton = Button(renderData, 'Отрисовать', 'render-buton');

  appHeader.append('Источник: ', select, getDataButton, document.createElement('br'));

  dataInput.placeholder = 'Введите значение и нажмите "Отрисовать"';
  appHeader.append('Данные: ', dataInput, renderButton);

  return appHeader;
}
