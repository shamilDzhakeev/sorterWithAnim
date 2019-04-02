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
          Sorter.swapElements(this.targetArr, i);
          this.stepsToSort.push(i);
          exitFlag = true;
        }
      }
    }
  }

  static swapElements(array, index) {
    [array[index], array[index + 1]] = [array[index + 1], array[index]];
  }

  step(direction) {
    if (direction) {
      if (this.currentPos < this.stepsToSort.length) {
        Sorter.swapElements(this.colums, this.stepsToSort[this.currentPos]);
        this.currentPos = this.currentPos + 1;
      }
      return this.colums;
    }
    if (this.currentPos > 0) {
      this.currentPos = this.currentPos - 1;
      Sorter.swapElements(this.colums, this.stepsToSort[this.currentPos]);
    }
    return this.colums;
  }
}
