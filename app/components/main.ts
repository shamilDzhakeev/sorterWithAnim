import Sorter from './sorter';
import Renderer from './renderer';
import { drawEmptyTemplate } from './header';
import { getDataSource } from './dataSources';

function addNewSorterer(blockToDraw: HTMLElement): void {
  const valuesArr = [1, 5, 2, 4];
  const collect = new Map();
  const sorter = new Sorter(valuesArr);

  const renderer = new Renderer(valuesArr);

  function doNextStep(): void {
    collect.get(sorter).updateRender(sorter.doStepUp());
  }

  function doStepBack(): void {
    collect.get(sorter).updateRender(sorter.doStepBack());
  }

  const options = {
    onDownButtonClick: doStepBack,
    onUpButtonClick: doNextStep,
    destenationNode: blockToDraw,
  };

  drawEmptyTemplate(options);

  //источник доделать
  const dataSource = getDataSource('string');

  collect.set(sorter, renderer);
}

export default addNewSorterer;
