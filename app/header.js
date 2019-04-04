export default function drawHeared(inputedNewString, previousStep, nextSortStep) {
  const header = document.createElement('header');
  const upButton = document.createElement('button');
  const downButton = document.createElement('button');
  const textField = document.createElement('input');
  const addButton = document.createElement('button');

  downButton.id = 'down';
  downButton.innerText = 'Step back';
  downButton.onclick = previousStep;

  upButton.id = 'up';
  upButton.innerText = 'Sort';
  upButton.onclick = nextSortStep;

  addButton.innerText = '+';
  addButton.onclick = inputedNewString;

  textField.type = 'number';
  textField.value = Math.floor(Math.random() * 100000) + 100;
  textField.classList.add('text-box');
  textField.placeholder = 'Введите строку из цифр';

  header.appendChild(downButton);
  header.appendChild(upButton);
  header.appendChild(textField);
  header.appendChild(addButton);
  document.body.appendChild(header);
}
