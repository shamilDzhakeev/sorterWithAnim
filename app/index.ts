import Sorter from './components/Sorter';
import { PrimaryButton, CloseButton } from './components/Buttons';
import ColumnsContainer from './components/ColumnsContainer';
import EmptyBox from './components/EmptyBox';
import SourceSelect from './components/SourceSelect';
import './css/stl.css';

function App(): HTMLDivElement {
  const sortersMap = new Map();

  const applicationContainer = EmptyBox();
  const select = SourceSelect();

  const dataInputField = document.createElement('input');

  const sortersWrapper = document.createElement('div');
  sortersWrapper.className = 'sorters-wrapper';

  const addNewSorter = (): void => {
    console.dir((select.firstElementChild as HTMLSelectElement).selectedIndex);

    const sorterContainer = EmptyBox();
    sorterContainer.className = 'sorter-container';

    const normalizedData = dataInputField.value.split('').map(Number);
    const sorter = new Sorter(normalizedData);
    const columnsContainer = new ColumnsContainer(normalizedData, '#084246');

    sortersMap.set(sorter, { columnsContainer });

    const columns = columnsContainer.container;

    function doStepBack(): void {
      columnsContainer.updateColumnsPositions(sorter.doStepBack());
    }

    function doStepUp(): void {
      columnsContainer.updateColumnsPositions(sorter.doStepUp());
    }

    function deleteSorter(clickEvent): void {
      sortersMap.delete(sorter);

      clickEvent.target.parentElement.remove();
    }

    const sortDownButton = PrimaryButton(doStepBack, '<<');
    const sortUpButton = PrimaryButton(doStepUp, '>>');
    const closeButton = CloseButton(deleteSorter);

    sorterContainer.append(sortDownButton, sortUpButton, closeButton, columns);
    sortersWrapper.append(sorterContainer);
  };

  const renderButton = PrimaryButton(addNewSorter, 'Add');
  applicationContainer.append(select, 'Value: ', dataInputField, renderButton, sortersWrapper);

  return applicationContainer;
}

const applicationContainer = App();
document.body.append(applicationContainer);
