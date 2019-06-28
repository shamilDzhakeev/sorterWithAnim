import Column from './Column';

export default function ColumnsContainer(valuesArray: number[], color: string): HTMLDivElement {
  const columnsContainer = document.createElement('div');
  columnsContainer.className = 'columns-container';

  valuesArray.forEach((value, index): void => {
    columnsContainer.append(Column(value, index, color));
  });

  return columnsContainer;
}
