import Sorterer from './sorter';
import Renderer from './render';
import drawEmptyTemplate from './template';
import getDataSource from './data-sources';
import createLoadingWindow from './data-loading-window';
import createErrorWindow from './error-msg-window';
import { Elements } from './types';
import { checkData } from './data-checker';

function addNewSorterer(blockToDraw: HTMLElement): void {
  const waitMsg = 'Загрузка данных, пожалуйста подождите.';
  const incorrectData = 'Данные некорректны!';
  let sorterer: Sorterer;
  let renderer: Renderer;
  let elements: Elements;
  let input: HTMLInputElement;

  async function request(): Promise<void> {
    const source = getDataSource(elements.select.selectedIndex);
    const waitMsgWindow = createLoadingWindow(waitMsg);
    elements.columnsContainer.innerHTML = '';
    elements.columnsContainer.appendChild(waitMsgWindow);
    try {
      const data = await source.getData(input);

      const isDataValid = checkData(data);
      if (!isDataValid) {
        throw new SyntaxError(incorrectData);
      }

      waitMsgWindow.remove();
      sorterer = new Sorterer(data);
      renderer = new Renderer(data, elements.columnsContainer);
    } catch (err) {
      waitMsgWindow.remove();
      const errorMsg = createErrorWindow(err.message);
      elements.sortererBlock.appendChild(errorMsg);
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  elements = drawEmptyTemplate(blockToDraw);
  input = elements.input;

  elements.addButton.onclick = request;
  elements.upButton.onclick = (): void => {
    renderer.updateRender(sorterer.doStepUp());
  };
  elements.downButton.onclick = (): void => {
    renderer.updateRender(sorterer.doStepBack());
  };
}

export default addNewSorterer;
