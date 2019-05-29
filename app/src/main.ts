import Sorterer from './utils/sorter';
import Renderer from './utils/render';
import drawEmptyTemplate from './template';
import getDataSource from './utils/data-sources';
import createLoadingWindow from './components/data-loading-window';
import createErrorWindow from './components/error-msg-window';
import createCloseButton from './components/close-button';
import checkData from './utils/data-checker';

function addNewSorterer(blockToDraw: HTMLElement): void {
  const waitMsg = 'Загрузка данных, пожалуйста подождите.';
  const incorrectData = 'Данные некорректны!';

  const {
    sortererBlock,
    columnsContainer,
    addButton,
    select,
    input,
  } = drawEmptyTemplate(blockToDraw);

  async function renderContainer(): Promise<void> {
    const colCont = document.createElement('div');
    const sortUpBtn = document.createElement('button');
    const sortDownBtn = document.createElement('button');
    const closeBtn = createCloseButton();
    sortUpBtn.innerText = '=>';
    sortDownBtn.innerText = '<=';

    colCont.append(sortDownBtn, sortUpBtn, closeBtn);
    colCont.classList.add('colums-container');

    const source = getDataSource(select.selectedIndex);
    const waitMsgWindow = createLoadingWindow(waitMsg);

    columnsContainer.appendChild(waitMsgWindow);
    try {
      const data = await source.getData(input);
      const isDataValid = checkData(data);

      if (!isDataValid) {
        throw new Error(incorrectData);
      }

      waitMsgWindow.remove();
      const sorterer = new Sorterer(data);
      const renderer = new Renderer(data, colCont);
      columnsContainer.appendChild(colCont);

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

  addButton.onclick = renderContainer;
}

export default addNewSorterer;
