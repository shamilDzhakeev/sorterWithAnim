export default class Render {
  constructor(columsArr) {
    const COLUM_HEIGHT_COEFFICIENT = 15;

    this.columsArr = columsArr;

    for (let i = 0; i < this.columsArr.length; i += 1) {
      const newColumn = document.createElement('div');
      newColumn.className = 'column';
      newColumn.style.height = `${this.columsArr[i].value * COLUM_HEIGHT_COEFFICIENT}px`;
      newColumn.style.left = Render.getColumBais(i);
      newColumn.innerText = this.columsArr[i].value;

      document.body.children[0].appendChild(newColumn);
    }
  }

  updateRender(columsArr) {
    for (let i = 0; i < columsArr.length; i += 1) {
      const columsContainer = document.querySelector('.mainContainer');
      columsContainer.children[this.columsArr[i].palce].style.left = Render.getColumBais(i);
    }
  }

  static getColumBais(index) {
    const COLUM_SPACING = 30;
    return `${(index + 1) * COLUM_SPACING}px`;
  }
}
