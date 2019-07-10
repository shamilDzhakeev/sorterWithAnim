import { isValid } from './utils';

const NumberInputField = (): HTMLInputElement => {
  const input = document.createElement('input');

  input.oninput = evt => {
    const target = evt.target as HTMLInputElement;
    const inputtedValue = target.value;

    if (!isValid(inputtedValue)) {
      const validValue = target.value.slice(0, target.value.length - 1);
      target.value = validValue;
    }
  };
  return input;
};

export default NumberInputField;
