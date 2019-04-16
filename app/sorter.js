export default class Sorter {
  constructor(arr) {
    const targetArr = [...arr];
    this.sortStates = [];
    this.sortStates.push([...arr]);
    this.curStateIndex = 0;

    let exitFlag = true;
    while (exitFlag) {
      exitFlag = false;
      for (let i = 0; i < targetArr.length - 1; i += 1) {
        if (targetArr[i] > targetArr[i + 1]) {
          [targetArr[i], targetArr[i + 1]] = [targetArr[i + 1], targetArr[i]];
          this.sortStates.push([...targetArr]);
          exitFlag = true;
        }
      }
    }
  }

  get curStateArr() {
    return this.sortStates[this.curStateIndex];
  }

  doStepUp() {
    if (this.curStateIndex < this.sortStates.length - 1) {
      this.curStateIndex += 1;
      return this.sortStates[this.curStateIndex];
    }
    return this.sortStates[this.curStateIndex];
  }

  doStepBack() {
    if (this.curStateIndex > 0) {
      this.curStateIndex -= 1;
      return this.sortStates[this.curStateIndex];
    }
    return this.sortStates[this.curStateIndex];
  }
}
