export default class Sorter {
  private sortStates: number[][];

  private curStateIndex: number = 0;

  constructor(arr: number[]) {
    const targetArr = [...arr];
    this.sortStates = [];
    this.sortStates.push([...arr]);

    let exitFlag: boolean = true;
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

  public doStepUp(): number[] {
    if (this.curStateIndex < this.sortStates.length - 1) {
      this.curStateIndex += 1;
      return this.sortStates[this.curStateIndex];
    }
    return this.sortStates[this.curStateIndex];
  }

  public doStepBack(): number[] {
    if (this.curStateIndex > 0) {
      this.curStateIndex -= 1;
      return this.sortStates[this.curStateIndex];
    }
    return this.sortStates[this.curStateIndex];
  }
}
