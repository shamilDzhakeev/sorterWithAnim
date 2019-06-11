import Sorterer from './utils/sorter';
import Renderer from './utils/render';
//import ProgressLine from './components/progress-line';
import drawEmptyTemplate from './template';
import getDataSource from './utils/data-sources';
import createLoadingWindow from './components/data-loading-window';
import createErrorWindow from './components/error-msg-window';
import createCloseButton from './components/close-button';
import checkData from './utils/data-checker';

async function addNewSorterer(blockToDraw: HTMLElement): Promise<void> {
  const waitMsg = 'Загрузка данных, пожалуйста подождите.';
  const incorrectData = 'Данные некорректны!';

  const {
    sortererBlock,
    mainContainer,
    addButton,
    select,
    input,
  } = drawEmptyTemplate(blockToDraw);

  async function getDataFromSource(): Promise<number[]> {
    const source = getDataSource(select.selectedIndex);
    try {
      const data = await source.getData(input);

      if (!checkData(data)) {
        throw new Error(incorrectData);
      }
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async function renderData(): Promise<void> {
    const columnsContainer = document.createElement('div');
    const sortUpBtn = document.createElement('button');
    const sortDownBtn = document.createElement('button');
    const closeBtn = createCloseButton();
    sortUpBtn.innerText = '=>';
    sortDownBtn.innerText = '<=';
    columnsContainer.append(sortDownBtn, sortUpBtn, closeBtn);
    columnsContainer.classList.add('colums-container');

    const waitMsgWindow = createLoadingWindow(waitMsg);
    mainContainer.appendChild(waitMsgWindow);

    try {
      const data = await getDataFromSource();

      waitMsgWindow.remove();
      const sorterer = new Sorterer(data);
      const renderer = new Renderer(data, columnsContainer);

      mainContainer.appendChild(columnsContainer);

      sortUpBtn.onclick = (): void => {
        renderer.updateRender(sorterer.doStepUp());
      };
      sortDownBtn.onclick = (): void => {
        renderer.updateRender(sorterer.doStepBack());
      };
    } catch (err) {
      waitMsgWindow.remove();
      const errorMsg = createErrorWindow(err.message);
      sortererBlock.appendChild(errorMsg);
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  addButton.onclick = renderData;
}

export default addNewSorterer;
