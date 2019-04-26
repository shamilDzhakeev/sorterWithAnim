import Sorter from './sorter';
import Renderer from './renderer';
import drawHeader from './header';
import { getDataSource } from './dataSources';

const dataSource = getDataSource('string');

function drawNewGraph(containerToRender: HTMLElement): void {
  const blockToDraw = containerToRender;
  const colectMap = new Map();
  let sorter: Sorter;
  let renderer: Renderer;

  function addNewGraph(): void {
    const valuesArr = dataSource.getData();
    if (valuesArr === null) {
      return;
    }
    let sorterLocal = new Sorter(valuesArr);
    sorter = sorterLocal;

    const rendererOptions = {
      valuesArr,
      blockToDraw,
      onclickEvent: (): void => {
        (function selectSorter(selected: Sorter): void {
          sorter = selected;
        })(sorterLocal);
      },
    };

    renderer = new Renderer(rendererOptions);
    colectMap.set(sorter, renderer);
  }

  function doNextStep(): void {
    colectMap.get(sorter).updateRender(sorter.doStepUp());
  }

  function doStepBack(): void {
    colectMap.get(sorter).updateRender(sorter.doStepBack());
  }

  const options = {
    onAddButtonClick: addNewGraph,
    onDownButtonClick: doStepBack,
    onUpButtonClick: doNextStep,
    destenationNode: blockToDraw,
  };

  drawHeader(options);
}

export default drawNewGraph;
