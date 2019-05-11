/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Sorterer from './sorter';
import Renderer from './render';
import drawEmptyTemplate from './template';
import getDataSource from './data-sources';

let sorterer;
let renderer;
let elements;

async function getNumericArr() {
  const source = getDataSource(elements.select.selectedIndex);
  elements.columnsContainer.innerHTML = '';

  const data = await source.getData();
  console.log('данные: ', data);

  sorterer = new Sorterer(data);
  renderer = new Renderer(data, elements.columnsContainer);
}

function addNewSorterer(blockToDraw: HTMLElement): void {
  elements = drawEmptyTemplate(blockToDraw);

  elements.addButton.onclick = getNumericArr;
  elements.upButton.onclick = () => {
    renderer.updateRender(sorterer.doStepUp());
  };
  elements.downButton.onclick = () => {
    renderer.updateRender(sorterer.doStepBack());
  };
}

export default addNewSorterer;
