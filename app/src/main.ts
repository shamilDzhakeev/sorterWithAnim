import Sorter from './utils/sorter';
import Renderer from './utils/render';
import drawTmpl from './template';
import getRandomColor from './utils/random-color';
import createErrorWindow from './components/error-msg-window';
import createCloseButton from './components/close-button';
import checkData from './utils/data-checker';
import ProgressLine from './components/progress-line';

export default function App(destination: HTMLElement): void {
  let totalCount = 0;
  let progressLines = new Map();

  const { sortBox, mainCont, renderBtn, getDataBtn, select, input } = drawTmpl();

  function renderData(): void {
    let previousLen = 0;
    const targetValue = input.value.split('').map(Number);
    const color = getRandomColor();

    try {
      checkData(targetValue);
      const sortUpBtn = document.createElement('button');
      sortUpBtn.innerText = '⇒';
      const sortDownBtn = document.createElement('button');
      sortDownBtn.innerText = '⇐';

      const closeBtn = createCloseButton('close-button');
      const colContainer = document.createElement('div');
      colContainer.className = 'sorter-box';
      colContainer.append(sortDownBtn, sortUpBtn, closeBtn);

      const sorter = new Sorter(targetValue);
      const renderer = new Renderer(targetValue, colContainer, color);
      const line = new ProgressLine(document.body, color);
      progressLines.set(sorter, line);

      sortUpBtn.onclick = (): void => {
        renderer.updateRender(sorter.doStepUp());
        const currLen = sorter.getCurrentSortState();
        if (previousLen + 1 === currLen) {
          previousLen = currLen;
          totalCount++;
          progressLines.forEach((line, sorter): void => {
            line.updateProgressLine(totalCount, sorter.getCurrentSortState());
          });
        }
      };

      sortDownBtn.onclick = (): void => {
        renderer.updateRender(sorter.doStepBack());
        const currLen = sorter.getCurrentSortState();
        if (previousLen - 1 === currLen) {
          previousLen = currLen;
          totalCount--;
          progressLines.forEach((line, sorter): void => {
            line.updateProgressLine(totalCount, sorter.getCurrentSortState());
          });
        }
      };

      mainCont.appendChild(colContainer);
    } catch (err) {
      const errorMsg = createErrorWindow(err.message);
      sortBox.appendChild(errorMsg);
    }
  }

  renderBtn.onclick = renderData;

  destination.append(sortBox);
}
