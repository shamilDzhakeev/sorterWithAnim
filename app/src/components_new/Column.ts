function Column(height: number, position: number, color: string = 'gray'): HTMLDivElement {
  const COLUMN_HEIGHT_COEFFICIENT = 15;
  const COLUMN_SPACING = 30;

  const column = document.createElement('div');
  column.className = 'column';
  column.style.backgroundColor = color;
  column.style.height = `${height * COLUMN_HEIGHT_COEFFICIENT}px`;
  column.style.left = `${position * COLUMN_SPACING}px`;
  column.innerText = height.toString();

  return column;
}

export default Column;
