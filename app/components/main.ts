/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Sorterer from './sorter';
import Renderer from './render';
import drawEmptyTemplate from './template';
import getDataSource from './data-sources';
import createModalWindow from './modal-window';
import getErrorWindow from './error-msg-window';
import { Elements } from './types';

export let input;

function addNewSorterer(blockToDraw: HTMLElement): void {
  let sorterer: Sorterer;
  let renderer: Renderer;
  let elements: Elements;

  async function request() {
    const source = getDataSource(elements.select.selectedIndex);
    const waitMsg = createModalWindow('Загрузка данных, пожалуйста подождите.');
    elements.columnsContainer.innerHTML = '';
    elements.columnsContainer.appendChild(waitMsg);
    try {
      const data = await source.getData();
      waitMsg.remove();
      sorterer = new Sorterer(data);
      renderer = new Renderer(data, elements.columnsContainer);
    } catch (err) {
      waitMsg.remove();
      const errorMsg = getErrorWindow(
        'Ошибка загрузки данных. Повоторите попытку позже.',
      );
      elements.columnsContainer.appendChild(errorMsg);
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
