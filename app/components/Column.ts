type ColumnProps = {
  height: number;
  color: string;
  spacing: number;
  index: number;
};

const Column = function(props: ColumnProps): HTMLDivElement {
  const columnHeightFactor = 15;
  const column = document.createElement('div');

  column.className = 'column';
  column.style.background = props.color;
  column.style.height = `${props.height * columnHeightFactor}px`;
  column.style.left = `${props.index * props.spacing}px`;
  column.innerText = props.height.toString();

  return column;
};

export default Column;
