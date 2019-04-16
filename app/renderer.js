export default class Renderer {
  constructor(optionsObj) {
    const { valuesArr: arr, blockToDraw, onclickEvent } = optionsObj;
    const COLUMN_HEIGHT = 15;
    this.curValuesArr = [...arr];
    this.container = document.createElement('div');
    this.index = [];
    this.ofsetsArr = [];

    for (let i = 0; i < arr.length; i += 1) {
      this.index.push(i);
      this.ofsetsArr.push(Renderer.getColumnOffset(i));
    }

    this.container.className = 'container';
    this.container.onclick = onclickEvent;
    this.container.classList.add(`c${Renderer.counter}`);

    for (let i = 0; i < this.curValuesArr.length; i += 1) {
      const newColumn = document.createElement('div');
      newColumn.className = 'column';
      newColumn.style.height = `${this.curValuesArr[i] * COLUMN_HEIGHT}px`;
      newColumn.style.left = Renderer.getColumnOffset(i);
      newColumn.innerText = this.curValuesArr[i];

      this.container.appendChild(newColumn);
    }
    blockToDraw.appendChild(this.container);
  }

  static getColumnOffset(index) {
    const COLUM_SPACING = 30;
    return `${(index + 0.5) * COLUM_SPACING}px`;
  }

  updateRender(newValuesArr) {
    let tempIndex = null;
    let changeFlag = false;
    const col = this.container.getElementsByTagName('div');
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
    for (let i = 0; i < col.length; i += 1) {
      col[this.index[i]].style.left = this.ofsetsArr[i];
    }
    this.curValuesArr = newValuesArr;
  }
}
