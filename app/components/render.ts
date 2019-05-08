export default class Renderer {
  private curValuesArr: number[];
  private index: number[];
  private container: HTMLDivElement;

  public constructor(arr: number[], columnsContainer) {
    const COLUMN_HEIGHT = 15;

    this.container = columnsContainer;
    this.curValuesArr = [...arr];
    this.index = [];
    this.index = arr.map((_, i): number => i);

    for (let i = 0; i < this.curValuesArr.length; i += 1) {
      const newColumn = document.createElement('div');

      newColumn.className = 'column';
      newColumn.style.height = `${this.curValuesArr[i] * COLUMN_HEIGHT}px`;
      newColumn.style.left = Renderer.getColumnOffset(i);
      newColumn.innerText = this.curValuesArr[i].toString();

      columnsContainer.appendChild(newColumn);
    }
  }

  private static COLUM_SPACING = 30;

  private static getColumnOffset(index: number): string {
    return `${index * Renderer.COLUM_SPACING}px`;
  }

  public updateRender(newValuesArr: number[]): void {
    let tempIndex: number[] = [];
    let changeFlag = false;
    const columns = this.container.getElementsByTagName('div');
    for (let i = 0; i < newValuesArr.length; i += 1) {
      if (newValuesArr[i] !== +this.curValuesArr[i]) {
        tempIndex = [...this.index];
        [tempIndex[i], tempIndex[i + 1]] = [tempIndex[i + 1], tempIndex[i]];
        changeFlag = true;
        break;
      }
    }
    if (changeFlag) {
      this.index = tempIndex;
    }
    for (let i = 0; i < columns.length; i += 1) {
      columns[this.index[i]].style.left = Renderer.getColumnOffset(i);
    }
    this.curValuesArr = newValuesArr;
  }
}
