export default function SourcesSelect(): HTMLSelectElement {
  const select = document.createElement('select');

  /* select.addEventListener(
  'change',
  (): void => {
    if (select.selectedIndex === 1) {
      getDataBtn.style.display = 'inline-block';
      input.placeholder = 'Для получения данных нажмите кнопку "+"';
      input.disabled = true;
    } else {
      getDataBtn.style.display = 'none';
      input.placeholder = 'Введите значение и нажмите "Отрисовать"';
      input.disabled = false;
    }
  },
);
 */
  const sources = {
    input: 'Ввести значение вручную',
    server: 'Получить значение от сервера',
  };

  for (const key in sources) {
    const option = document.createElement('option');
    option.innerText = sources[key];
    select.append(option);
  }
  return select;
}
