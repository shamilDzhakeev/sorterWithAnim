import SourcesSelect from '../SourcesSelect';
import Button from './Button';

export default function AppHeader(): HTMLDivElement {
  const appHeader = document.createElement('div');
  appHeader.className = 'application-header';

  appHeader.append(
    'Источник: ',
    SourcesSelect(),
    Button(null, '+', 'get-data-button'),
    document.createElement('br'),
  );

  const dataInput = document.createElement('input');
  dataInput.placeholder = 'Введите значение и нажмите "Отрисовать"';
  appHeader.append('Данные: ', dataInput, Button(null, 'Отрисовать', 'render-buton'));

  return appHeader;
}
