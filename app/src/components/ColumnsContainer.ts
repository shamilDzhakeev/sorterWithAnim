import Column from './Column';

export default function ColumnsContainer(values: number[], color = 'crimson'): HTMLDivElement {
  const columnsContainer = document.createElement('div');
  columnsContainer.className = 'col-container';
  values.forEach((value, index): void => {
    columnsContainer.append(Column(value, index, color));
  });
  return columnsContainer;
}
