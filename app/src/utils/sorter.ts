export default class Sorterer {
  private arr: number[];
  private indexes: number[];

  public constructor(targetArr: number[]) {
    this.arr = [...targetArr];
    this.indexes = [];
  }

  public doStepBack(): number[] {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.indexes.length !== 0) {
        [this.arr[this.indexes[0]], this.arr[this.indexes[0] + 1]] = [
          this.arr[this.indexes[0] + 1],
          this.arr[this.indexes[0]],
        ];
        this.indexes.shift();
        return this.arr;
      }
    }
    return this.arr;
  }

  public doStepUp(): number[] {
    let flag = true;
    while (flag) {
      flag = false;
      for (let i = 0; i < this.arr.length - 1; i++) {
        if (this.arr[i] > this.arr[i + 1]) {
          [this.arr[i], this.arr[i + 1]] = [this.arr[i + 1], this.arr[i]];
          this.indexes.unshift(i);
          flag = true;
          return this.arr;
        }
      }
    }
    return this.arr;
  }
}
