export default class Sorterer {
  private arr: number[];
  private indexes: number[];
  private j: number = 0;

  public constructor(targetArr: number[]) {
    this.arr = [...targetArr];
    this.indexes = [];
  }

  public doStepUp(): number[] {
    let flag = true;

    if (this.indexes.length === this.j) {
      while (flag) {
        flag = false;
        for (let i = 0; i < this.arr.length - 1; i++) {
          if (this.arr[i] > this.arr[i + 1]) {
            Sorterer.swap(this.arr, i);
            this.indexes.push(i);
            this.j = this.j + 1;
            flag = true;
            return this.arr;
          }
        }
      }
      return this.arr;
    } else {
      Sorterer.swap(this.arr, this.indexes[this.j]);
      this.j = this.j + 1;
      return this.arr;
    }
  }

  public doStepBack(): number[] {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.j > 0) {
        this.j = this.j - 1;
        Sorterer.swap(this.arr, this.indexes[this.j]);
        return this.arr;
      }
    }
    return this.arr;
  }

  private static swap(arr: number[], i: number): void {
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
  }
}
