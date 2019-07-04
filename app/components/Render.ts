import Column from './Column';

export default class Renderer {
  private curValuesArr: number[];
  private index: number[];
  private container: HTMLDivElement;
  private static COLUMN_SPACING = 30;

  public constructor(arr: number[], columnsContainer: HTMLDivElement, color: string) {
    this.container = columnsContainer;
    this.curValuesArr = [...arr];
    this.index = [];

    this.curValuesArr.forEach((value, index): void => {
      //this.container.appendChild(Column(value, index, color));
      this.index.push(index);
    });
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

    Array.prototype.forEach.call(columns, (_: HTMLDivElement, i: number): void => {
      columns[this.index[i]].style.left = `${i * Renderer.COLUMN_SPACING}px`;
    });

    this.curValuesArr = [...newValuesArr];
  }
}
