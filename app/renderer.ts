export default class Renderer {
  private curValuesArr: number[];

  private container: HTMLDivElement;

  private index: number[];

  private ofsetsArr: string[];

  public constructor(optionsObj: {
    valuesArr: number[];
    blockToDraw: HTMLElement;
    onclickEvent: () => void;
  }) {
    const { valuesArr: arr, blockToDraw, onclickEvent } = optionsObj;
    const COLUMN_HEIGHT = 1;
    this.curValuesArr = [...arr];
    this.container = document.createElement('div');
    this.index = [];
    this.ofsetsArr = [];

    arr.forEach(
      (element, index): void => {
        this.index.push(index);
        this.ofsetsArr.push(Renderer.getColumnOffset(index));
      }
    );

    this.container.className = 'container';
    this.container.onclick = onclickEvent;

    for (let i = 0; i < this.curValuesArr.length; i += 1) {
      const newColumn = document.createElement('div');
      newColumn.className = 'column';
      newColumn.style.height = `${this.curValuesArr[i] * COLUMN_HEIGHT}px`;
      newColumn.style.left = Renderer.getColumnOffset(i);
      // @ts-ignore
      newColumn.innerText = this.curValuesArr[i]; // ???

      this.container.appendChild(newColumn);
    }

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = '✖';

    function removeNode(): void {
      // @ts-ignore
      const elementToRemove = this.parentNode;
      elementToRemove.remove();
    }

    removeButton.addEventListener('click', removeNode);
    this.container.appendChild(removeButton);

    const label = `Original state: ${this.curValuesArr.join(' ')}`;
    const labelBox = document.createElement('legend');
    labelBox.classList.add('label');
    labelBox.innerText = label;
    this.container.appendChild(labelBox);

    blockToDraw.appendChild(this.container);
  }

  private static getColumnOffset(index: number): string {
    const COLUM_SPACING = 38;
    return `${index * COLUM_SPACING}px`;
  }

  public updateRender(newValuesArr: number[]): void {
    let tempIndex: number[] = [];
    let changeFlag = false;
    const columns = this.container.getElementsByTagName('div');
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
    for (let i = 0; i < columns.length; i += 1) {
      columns[this.index[i]].style.left = this.ofsetsArr[i];
    }
    this.curValuesArr = newValuesArr;
  }
}
