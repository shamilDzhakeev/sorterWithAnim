import Sorterer from './sorter';
import Renderer from './render';
import drawEmptyTemplate from './template';
import getDataSource from './data-sources';
import createLoadingWindow from './data-loading-window';
import createErrorWindow from './error-msg-window';
import { Elements } from './types';

function addNewSorterer(blockToDraw: HTMLElement): void {
  let sorterer: Sorterer;
  let renderer: Renderer;
  let elements: Elements;
  let input: HTMLInputElement;

  async function request(): Promise<void> {
    const source = getDataSource(elements.select.selectedIndex);
    const waitMsg = createLoadingWindow(
      'Загрузка данных, пожалуйста подождите.',
    );
    elements.columnsContainer.innerHTML = '';
    elements.columnsContainer.appendChild(waitMsg);
    try {
      const data = await source.getData(input);
      waitMsg.remove();
      sorterer = new Sorterer(data);
      renderer = new Renderer(data, elements.columnsContainer);
    } catch (err) {
      waitMsg.remove();
      const errorMsg = createErrorWindow(
        'Ошибка загрузки данных. Повоторите попытку позже.',
      );
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
