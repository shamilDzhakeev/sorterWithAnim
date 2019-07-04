const Column = function(props): HTMLDivElement {
  const height = 15;
  const column = document.createElement('div');

  column.className = 'column';
  column.style.background = props.color;
  column.style.height = `${props.value * height}px`;
  column.style.left = `${props.index * props.spacing}px`;
  column.innerText = props.value.toString();

  return column;
};

export default Column;
