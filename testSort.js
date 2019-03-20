import drawHeared from './app/header.js';
import Sorter from './app/sorter.js';
import Render from './app/render.js';

let sorter;
let render;

function inputedNewString() {
  const inputedString = document.querySelector('.text-box').value;
  const valuesArr = inputedString.split('').map(Number);
  const columsContainer = document.querySelector('.mainContainer');
  columsContainer.innerText = '';

  sorter = new Sorter(valuesArr);
  render = new Render(sorter.colums);
}

function previousStep() {
  render.updateRender(sorter.step(0));
}

function nextSortStep() {
  render.updateRender(sorter.step(1));
}
drawHeared(inputedNewString, previousStep, nextSortStep);
