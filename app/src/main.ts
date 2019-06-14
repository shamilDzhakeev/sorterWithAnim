import Sorterer from './utils/sorter';
import Renderer from './utils/render';
import ProgressLine from './components/progress-line';
import drawTmpl from './template';
import create from './utils/create-element';
import getDataSource from './utils/data-sources';
import createLoadingWindow from './components/data-loading-window';
import createErrorWindow from './components/error-msg-window';
import createCloseButton from './components/close-button';
import checkData from './utils/data-checker';

async function addNewSorterer(dest: HTMLElement): Promise<void> {
  const waitMsg = 'Загрузка данных, пожалуйста подождите.';
  const incorrectData = 'Данные некорректны!';
  let targetValue: number[];
  const { sortBox, mainCont, renderBtn, getDataBtn, select, input } = drawTmpl(dest);

  async function getDataFromSource(): Promise<void> {
    const source = getDataSource(select.selectedIndex);
    const waitMsgWindow = createLoadingWindow(waitMsg);
    mainCont.appendChild(waitMsgWindow);
    try {
      const data = await source.getData(input);
      if (!checkData(data)) {
        throw new Error(incorrectData);
      }
      targetValue = data;
      input.value = targetValue.join('');
      waitMsgWindow.remove();
    } catch (err) {
      waitMsgWindow.remove();
      const errorMsg = createErrorWindow(err.message);
      sortBox.appendChild(errorMsg);
    }
  }

  function renderData(): void {
    targetValue = input.value.split('').map(Number);
    try {
      if (!checkData(targetValue)) {
        throw new Error(incorrectData);
      }

      const sortUpBtn = create('button', { innerText: '⇒' });
      const sortDownBtn = create('button', { innerText: '⇐' });
      const closeBtn = createCloseButton('close-button');
      const colContainer = create(
        'div',
        { className: 'col-container' },
        sortDownBtn,
        sortUpBtn,
        closeBtn,
      );

      const sorterer = new Sorterer(targetValue);
      const renderer = new Renderer(targetValue, colContainer);
      const line = new ProgressLine(sortBox, 5);

      sortUpBtn.onclick = (): void => {
        renderer.updateRender(sorterer.doStepUp());
        line.stepUp();
      };
      sortDownBtn.onclick = (): void => {
        renderer.updateRender(sorterer.doStepBack());
        line.stepDown();
      };

      mainCont.appendChild(colContainer);
    } catch (err) {
      const errorMsg = createErrorWindow(err.message);
      sortBox.appendChild(errorMsg);
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
  renderBtn.onclick = renderData;
  getDataBtn.onclick = getDataFromSource;
}

export default addNewSorterer;
