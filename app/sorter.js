export default class Sorter {
  constructor(arr) {
    this.targetArr = [...arr];
    this.stepsToSort = [];
    this.colums = [];
    this.currentPos = 0;

    for (let i = 0; i < this.targetArr.length; i += 1) {
      this.colums.push({ palce: i, value: this.targetArr[i] });
    }
    let exitFlag = true;
    while (exitFlag) {
      exitFlag = false;
      for (let i = 0; i < this.targetArr.length - 1; i += 1) {
        if (this.targetArr[i] > this.targetArr[i + 1]) {
          [this.targetArr[i + 1], this.targetArr[i]] = [this.targetArr[i], this.targetArr[i + 1]];
          this.stepsToSort.push(i);
          exitFlag = true;
        }
      }
    }
  }

  swap() {
    const m = this.stepsToSort[this.currentPos];
    const n = this.stepsToSort[this.currentPos] + 1;
    [this.colums[m], this.colums[n]] = [this.colums[n], this.colums[m]];
  }

  step(direction) {
    if (direction) {
      if (this.currentPos < this.stepsToSort.length) {
        this.swap();
        this.currentPos = this.currentPos + 1;
      }
      return this.colums;
    }
    if (this.currentPos > 0) {
      this.currentPos = this.currentPos - 1;
      this.swap();
    }
    return this.colums;
  }
}
