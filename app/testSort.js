/* eslint-disable import/extensions */
import drawHeared from './header.js';
import Sorter from './sorter.js';
import Renderer from './renderer.js';

const objCollection = new Map();

let sorter = null;
let renderer = null;

function inputedNewString() {
  const inputedString = document.querySelector('.text-box').value;
  const valuesArr = inputedString.split('').map(Number);

  function selectSorter(selectedSorter) {
    sorter = selectedSorter;
  }

  const sorterLocal = new Sorter(valuesArr);
  sorter = sorterLocal;
  renderer = new Renderer({
    colums: sorterLocal.colums,
    onClick: () => {
      selectSorter(sorterLocal);
    },
    inputedString,
  });

  objCollection.set(sorterLocal, renderer);
}

function previousStep() {
  objCollection.get(sorter).updateRender(sorter.step(0));
}

function nextSortStep() {
  objCollection.get(sorter).updateRender(sorter.step(1));
}
drawHeared(inputedNewString, previousStep, nextSortStep);
