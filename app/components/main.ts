import Sorter from './sorter';
import Renderer from './renderer';
import { drawEmptyTemplate } from './header';
import { getDataSource } from './dataSources';

function addNewSorterer(blockToDraw: HTMLElement): void {
  //источник
  const dataSource = getDataSource('server');
  const valuesArr = dataSource.getData();
  const sorter = new Sorter(valuesArr);
  let renderer: Renderer;

  function doNextStep(): void {
    renderer.updateRender(sorter.doStepUp());
  }

  function doStepBack(): void {
    renderer.updateRender(sorter.doStepBack());
  }

  const templateOpts = {
    onDownButtonClick: doStepBack,
    onUpButtonClick: doNextStep,
    destenationNode: blockToDraw,
  };
  const columnsContainer = drawEmptyTemplate(templateOpts);

  const rendererOpts = {
    valuesArr,
    columnsContainer,
  };
  renderer = new Renderer(rendererOpts);
}

export default addNewSorterer;
