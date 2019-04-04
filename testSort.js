import drawHeared from './app/header.js';
import Sorter from './app/sorter.js';
import Renderer from './app/renderer.js';

const objCollection = new Map();

let sorter = null;
let renderer = null;

function selectSorter(selectedSorter) {
  sorter = selectedSorter;
}

function inputedNewString() {
  const inputedString = document.querySelector('.text-box').value;
  const valuesArr = inputedString.split('').map(Number);

  sorter = new Sorter(valuesArr);
  renderer = new Renderer({
    colums: sorter.colums,
    onClick: () => {
      selectSorter(sorter);
      console.log(sorter.colums.length);
    },
  });

  objCollection.set(sorter, renderer);
  // console.dir(objCollection);
}

function previousStep() {
  objCollection.get(sorter).updateRender(sorter.step(0));
}

function nextSortStep() {
  objCollection.get(sorter).updateRender(sorter.step(1));
}
drawHeared(inputedNewString, previousStep, nextSortStep);
