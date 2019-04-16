/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */

import Sorter from './sorter';
import Renderer from './renderer';
import drawHeader from './header';

const blockToDraw = document.getElementById('b1');
const colectMap = new Map();
let sorter;
let renderer;

function addNewGraph() {
  const targetString = document.querySelector('.text-box').value;
  const valuesArr = targetString.split('').map(Number);

  sorter = new Sorter(valuesArr);
  renderer = new Renderer(sorter.curStateArr, blockToDraw);
}

colectMap.set(sorter, renderer);

function doNextStep() {
  renderer.updateRender(sorter.doStepUp());
}

function doStepBack() {
  renderer.updateRender(sorter.doStepBack());
}

const options = {
  onAddButtonClick: addNewGraph,
  onDownButtonClick: doStepBack,
  onUpButtonClick: doNextStep,
  destenationNode: blockToDraw,
};

drawHeader(options);
