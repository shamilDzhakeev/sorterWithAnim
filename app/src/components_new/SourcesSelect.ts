export default function SourcesSelect(): HTMLSelectElement {
  const select = document.createElement('select');
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
