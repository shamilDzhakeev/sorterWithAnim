import Sorter from './sorter';
import Renderer from './renderer';
import drawHeader from './header';
import getData from './datasource';

function drawNewGraph(containerToRender: HTMLElement): void {
  const blockToDraw = containerToRender;
  const colectMap = new Map();
  let sorter: Sorter;
  let renderer: Renderer;

  function addNewGraph(): void {
    const valuesArr = getData();
    if (valuesArr === null) {
      return;
    }
    const sorterLocal = new Sorter(valuesArr);
    sorter = sorterLocal;

    function selectSorter(selected: Sorter): void {
      sorter = selected;
    }

    const rendererOptions = {
      valuesArr,
      blockToDraw,
      onclickEvent: (): void => {
        selectSorter(sorterLocal);
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
