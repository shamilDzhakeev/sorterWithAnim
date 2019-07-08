import getDataSource from './DataSources';
import EmptyBox from './EmptyBox';
import Sorter from './Sorter';
import ColumnsContainer from './ColumnsContainer';
import modalWindow from './ModalWindow';
import { PrimaryButton, CloseButton } from './Buttons';
import { loadingWheel, dataChecker, getRandomColor } from './utils';
import ProgressLine from './ProgressLine';

const AppHeader = (sortersWrapper): HTMLDivElement => {
  const sorters = new Map();
  let totalStepsCount = 0;

  const waitMsg = 'Загрузка данных. Пожалуйста подождите.';
  const incorrectData = 'Данные некорректны!';
  const header = document.createElement('div');
  const select = document.createElement('select');
  const dataInputField = document.createElement('input');
  const br = document.createElement('br');

  async function getDataFromSource(): Promise<void> {
    const loadingWindow = modalWindow(waitMsg, loadingWheel());
    sortersWrapper.append(loadingWindow);

    const data = getDataSource(select.selectedIndex);
    try {
      const responseData = await data.getData(dataInputField);
      dataInputField.value = responseData.join('');
      loadingWindow.remove();
    } catch (err) {
      loadingWindow.remove();

      const errorWindow = modalWindow(
        err.message,
        PrimaryButton((): void => {
          errorWindow.remove();
        }, 'Ok'),
      );

      sortersWrapper.append(errorWindow);
    }
  }

  const getDataButton = PrimaryButton(getDataFromSource, '+');
  getDataButton.style.display = 'none';

  const addNewSorter = (): void => {
    let previousLenght = 0;
    const sorterContainer = EmptyBox();
    sorterContainer.classList.add('sorter-container');

    try {
      const normalizedData = dataInputField.value.split('').map(Number);
      if (!dataChecker(normalizedData)) {
        throw new Error(incorrectData);
      }
      const color = getRandomColor();
      const sorter = new Sorter(normalizedData);
      const columnsContainer = new ColumnsContainer(normalizedData, color);
      const progressLine = new ProgressLine(document.body, color);

      sorters.set(sorter, { columnsContainer, progressLine });

      function updateProgressLine(): void {
        const sorterCurrentLength = sorter.getCurrentSortLenght();
        if (previousLenght + 1 === sorterCurrentLength) {
          totalStepsCount++;
        } else if (previousLenght - 1 === sorterCurrentLength) {
          totalStepsCount--;
        }
        previousLenght = sorterCurrentLength;

        sorters.forEach((value, sorter): void => {
          value.progressLine.updateProgressLine(totalStepsCount, sorter.getCurrentSortLenght());
        });
      }

      function doStepBack(): void {
        columnsContainer.updateColumnsPositions(sorter.doStepBack());
        updateProgressLine();
      }

      function doStepUp(): void {
        columnsContainer.updateColumnsPositions(sorter.doStepUp());
        updateProgressLine();
      }

      function deleteSorter(clickEvent): void {
        sorters.delete(sorter);
        clickEvent.target.parentElement.remove();
      }

      const sortDownButton = PrimaryButton(doStepBack, '<<');
      const sortUpButton = PrimaryButton(doStepUp, '>>');
      const closeButton = CloseButton(deleteSorter);
      const columns = columnsContainer.container;

      sorterContainer.append(sortDownButton, sortUpButton, closeButton, columns);
      sortersWrapper.append(sorterContainer);
    } catch (err) {
      const errorWindow = modalWindow(
        err.message,
        PrimaryButton((): void => {
          errorWindow.remove();
        }, 'Ok'),
      );
      sortersWrapper.append(errorWindow);
    }
  };

  const addSorterButton = PrimaryButton(addNewSorter, 'Add');

  const sources = {
    input: 'Manual input',
    server: 'From server',
  };

  for (const key in sources) {
    const option = document.createElement('option');
    option.innerText = sources[key];
    select.append(option);
  }

  select.addEventListener('change', (): void => {
    if (select.selectedIndex === 1) {
      getDataButton.style.display = 'inline-block';
    } else {
      getDataButton.style.display = 'none';
    }
  });

  header.className = 'application-header';
  header.append('Source:', select, getDataButton, br);
  header.append('Value:', dataInputField, addSorterButton);

  return header;
};

export default AppHeader;
