export default class Renderer {
  private curValuesArr: number[];
  private index: number[];
  private container: HTMLDivElement;
  private static COLUMN_SPACING = 30;

  public constructor(arr: number[], columnsContainer: HTMLDivElement, color: string) {
    const COLUMN_HEIGHT = 15;

    this.container = columnsContainer;
    this.curValuesArr = [...arr];
    this.index = [];

    this.curValuesArr.forEach(
      (value, index): void => {
        this.index.push(index);

        const newColumn = document.createElement('div');
        newColumn.className = 'column';
        newColumn.style.backgroundColor = color;
        newColumn.style.height = `${value * COLUMN_HEIGHT}px`;
        newColumn.style.left = `${index * Renderer.COLUMN_SPACING}px`;
        newColumn.innerText = value.toString();
        columnsContainer.appendChild(newColumn);
      }
    );
  }

  public updateRender(newValuesArr: number[]): void {
    const columns = this.container.getElementsByClassName('column') as HTMLCollectionOf<
      HTMLDivElement
    >;

    for (let i = 0; i < newValuesArr.length; i += 1) {
      if (newValuesArr[i] !== this.curValuesArr[i]) {
        [this.index[i], this.index[i + 1]] = [this.index[i + 1], this.index[i]];
        break;
      }
    }

    Array.prototype.forEach.call(
      columns,
      (_: HTMLDivElement, i: number): void => {
        columns[this.index[i]].style.left = `${i * Renderer.COLUMN_SPACING}px`;
      }
    );

    this.curValuesArr = [...newValuesArr];
  }
}
