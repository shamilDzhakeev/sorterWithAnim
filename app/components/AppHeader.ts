import NumberInputField from './NumberInputField';

const AppHeader = (): HTMLDivElement => {
  const input = NumberInputField();

  const header = document.createElement('div');
  header.append(input);
  return header;
};

export default AppHeader;
