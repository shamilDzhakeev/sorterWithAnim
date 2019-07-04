import Sorter from './components/Sorter';
import Button from './components/Button';
import Renderer from './components/Render';
import ColumnsContainer from './components/ColumnsContainer';
import './css/stl.css';

function createAppTemplate(): HTMLDivElement {
  const sorterList: Sorter[] = [];

  function createSorter(data: number[]): Sorter {
    const sorter = new Sorter(data);
    sorterList.push(sorter);
    return sorter;
  }

  function createRenderer(data: number[], renderBox: HTMLDivElement, color: string): Renderer {
    const renderer = new Renderer(data, renderBox, color);
    return renderer;
  }

  const applicationContainer = document.createElement('div');
  applicationContainer.className = 'application-container';

  const dataInputField = document.createElement('input');

  const sortersWrapper = document.createElement('div');
  sortersWrapper.className = 'sorters-wrapper';

  const sorterContainer = document.createElement('div');
  sorterContainer.className = 'sorter-container';

  const renderInputedData = (): void => {
    const normalizedData = dataInputField.value.split('').map(Number);
    const sorter = createSorter(normalizedData);

    const renderer = createRenderer(normalizedData, sorterContainer, 'gray');

    function down(): void {
      renderer.updateRender(sorter.doStepBack());
    }

    function up(): void {
      renderer.updateRender(sorter.doStepUp());
    }

    const sortDownbutton = Button(down, '<');
    const sortUpbutton = Button(up, '>');

    sortersWrapper.append(sorterContainer);
  };

  const renderButton = Button(renderInputedData, 'Render');

  applicationContainer.append(dataInputField, renderButton, sortersWrapper);

  const conatiner = new ColumnsContainer([1, 2, 3], 'red');
  let flag = true;
  const testFunc = (): void => {
    const arg = flag ? [1, 3, 2] : [1, 2, 3];
    flag = !flag;
    conatiner.updateColumnsPositions(arg);
  };

  setInterval(testFunc, 50000);
  return conatiner.getColumnsContainer();
}

const applicationContainer = createAppTemplate();

document.body.append(applicationContainer);
