import Column from './Column';

class ColumnsContainer {
  public readonly columnsContainer: HTMLDivElement[] = [];
  private indexes: number[] = [];
  private arr: number[];
  private spacing: number;

  public constructor(arr: number[], color: string) {
    this.arr = arr;
    const spacing = 30;
    this.spacing = spacing;

    this.arr.forEach(
      (height, index): void => {
        this.columnsContainer.push(Column({ height, index, color, spacing }));
        this.indexes.push(index);
      }
    );
  }

  private static swap(arr: number[], i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  public update(newSequence: number[]): void {
    for (let i = 0; i < newSequence.length; i++) {
      if (newSequence[i] !== this.arr[i]) {
        for (let j = i; j < newSequence.length; j++) {
          if (newSequence[i] === this.arr[j]) {
            ColumnsContainer.swap(this.arr, i, j);
            ColumnsContainer.swap(this.indexes, i, j);
            break;
          }
        }
      }
    }

    this.columnsContainer.forEach(
      (column: HTMLDivElement, i: number, columnsArr: HTMLDivElement[]): void => {
        columnsArr[this.indexes[i]].style.left = `${i * this.spacing}px`;
      }
    );

    this.arr = [...newSequence];
  }
}

export default ColumnsContainer;
