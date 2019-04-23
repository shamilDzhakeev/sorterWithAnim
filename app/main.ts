/* eslint-disable import/no-unresolved */

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
    // const textFieldElement = document.querySelector('.text-box');
    // @ts-ignore
    // const targetString = textFieldElement.value;
    const valuesArr = getData(); // targetString.split('').map(Number);
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
      }
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
    destenationNode: blockToDraw
  };

  drawHeader(options);
}

export default drawNewGraph;
