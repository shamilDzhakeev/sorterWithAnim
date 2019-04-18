/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */

import Sorter from './sorter';
import Renderer from './renderer';
import drawHeader from './header';

function drawNewgraph(containerToRender = document.body) {
  const blockToDraw = containerToRender; // document.getElementById('b1');
  const colectMap = new Map();
  let sorter = null;
  let renderer = null;

  function addNewGraph() {
    const targetString = document.querySelector('.text-box').value;
    const valuesArr = targetString.split('').map(Number);
    const sorterLocal = new Sorter(valuesArr);
    sorter = sorterLocal;

    function selectSorter(selected) {
      sorter = selected;
    }

    const rendererObj = {
      valuesArr,
      blockToDraw,
      onclickEvent: () => {
        selectSorter(sorterLocal);
      },
    };

    renderer = new Renderer(rendererObj);
    colectMap.set(sorter, renderer);
  }

  function doNextStep() {
    colectMap.get(sorter).updateRender(sorter.doStepUp());
  }

  function doStepBack() {
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

export default drawNewgraph;
