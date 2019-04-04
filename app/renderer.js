export default class Renderer {
  constructor(sorterObj) {
    this.columsArr = sorterObj.colums;

    const COLUM_HEIGHT_COEFFICIENT = 15;
    const mainContainer = document.querySelector('.mainContainer');
    const container = document.createElement('div');
    container.className = 'container';
    container.id = Renderer.count++;

    container.addEventListener('click', sorterObj.onClick);
    container.addEventListener('click', Renderer.setID);
    for (let i = 0; i < this.columsArr.length; i += 1) {
      const newColumn = document.createElement('div');
      newColumn.className = 'column';
      newColumn.style.height = `${this.columsArr[i].value * COLUM_HEIGHT_COEFFICIENT}px`;
      newColumn.style.left = Renderer.getColumBias(i);
      newColumn.innerText = this.columsArr[i].value;

      container.appendChild(newColumn);
    }
    mainContainer.appendChild(container);
  }

  updateRender(columsArr) {
    let columsContainer;
    for (let i = 0; i < columsArr.length; i += 1) {
      columsContainer = document.querySelector('.mainContainer').children[Renderer.count - 1];
      columsContainer.children[this.columsArr[i].palce].style.left = Renderer.getColumBias(i);
    }
  }

  static getColumBias(index) {
    const COLUM_SPACING = 30;
    return `${(index + 1) * COLUM_SPACING}px`;
  }

  static setID() {
    Renderer.count = +this.id + 1;
  }
}

Renderer.count = 0;
