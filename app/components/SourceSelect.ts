import { PrimaryButton } from './Buttons';

const SourceSelect = (): HTMLDivElement => {
  const sourceSelectBox = document.createElement('div');

  const getDataButton = PrimaryButton((): void => {}, '+');

  const select = document.createElement('select');

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

  sourceSelectBox.append('Source: ', select, getDataButton);

  return sourceSelectBox;
};

export default SourceSelect;
