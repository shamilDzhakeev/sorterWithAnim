import Column from './Column';

class ColumnsContainer {
  private container: HTMLDivElement;
  private indexes: number[] = [];
  private arr: number[];
  private spacing: number;

  public constructor(arr: number[], color: string) {
    this.arr = arr;
    const spacing = 30;
    this.spacing = spacing;
    this.container = document.createElement('div');
    this.container.className = 'columns-container';

    this.arr.forEach((value, index): void => {
      this.container.append(Column({ value, index, color, spacing }));
      this.indexes.push(index);
    });
  }

  public getColumnsContainer(): HTMLDivElement {
    return this.container;
  }

  public updateColumnsPositions(newSequence: number[]): void {
    const columns = this.container.getElementsByClassName('column') as HTMLCollectionOf<
      HTMLDivElement
    >;
    for (let i = 0; i < newSequence.length; i += 1) {
      if (newSequence[i] !== this.arr[i]) {
        [this.indexes[i], this.indexes[i + 1]] = [this.indexes[i + 1], this.indexes[i]];
        break;
      }
    }

    Array.prototype.forEach.call(columns, (_: HTMLDivElement, i: number): void => {
      columns[this.indexes[i]].style.left = `${i * this.spacing}px`;
    });

    this.arr = [...newSequence];
  }
}

export default ColumnsContainer;
