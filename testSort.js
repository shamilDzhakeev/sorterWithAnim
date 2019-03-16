
var keys = [];   
var groupsCount = 0;
var j = 0;

var objectsCollection = new Map();
    
    var header = document.createElement('header'),
    upButton = document.createElement('button'),
    downButton = document.createElement('button'),
    textField = document.createElement('input'),
    addButton = document.createElement('button');

    downButton.id = 'down';
    downButton.innerText = 'Step back';
    downButton.onclick = previousStep;

    upButton.id = 'up';
    upButton.innerText = 'Sort';
    upButton.onclick = nextSortStep;

    addButton.innerText = '+'
    addButton.classList.add('addButton');
    addButton.onclick = inputedNewString;

    textField.type = 'number';
    textField.classList.add('text-box');
    textField.placeholder = 'Введите строку из цифр';
    
    header.appendChild (downButton);
    header.appendChild (upButton);
    header.appendChild (textField);
    header.appendChild (addButton);
    document.body.appendChild (header);

class Sorter {
    constructor(arr) {

        this.targetArr = arr;
        this.stepsToSort = [];
        this.colums = [];
        this.currentPos = 0;
        
        for (let i = 0; i < this.targetArr.length; i++) {
            this.colums.push({ palce: i, value: this.targetArr[i] });
        }
        var exitFlag = true;
        while (exitFlag) {
            var exitFlag = false;
            for (let i = 0; i < this.targetArr.length - 1; i++) {
                if (this.targetArr[i] > this.targetArr[i + 1]) {
                    [this.targetArr[i + 1], this.targetArr[i]] = [this.targetArr[i], this.targetArr[i + 1]]
                    this.stepsToSort.push(i);
                    exitFlag = true;
                }
            }
        } 
    }

    swap() {
        var m = this.stepsToSort[this.currentPos];
        var n = this.stepsToSort[this.currentPos] + 1;
        var swap = this.colums[m];
        this.colums[m] = this.colums[n];
        this.colums[n] = swap;
    }

    step (direction) {
        switch (direction) {
            case 'up': {
                if (this.currentPos < this.stepsToSort.length) {
                    this.swap();
                    this.currentPos = this.currentPos + 1;
                }
                return this.colums;
            }
            case 'back': {
                if (this.currentPos > 0) {
                    this.currentPos = this.currentPos - 1;
                    this.swap();
                }
                return this.colums;
            }
        }
    }
}

class Render {

    constructor(columsArr) {
        
        const COLUM_HEIGHT_COEFFICIENT = 15;
            
        this.columsArr = columsArr;
        this.groupOfColums = document.createElement('div');
        this.groupOfColums.className = 'groupOfcolumns';
        this.groupOfColums.id = groupsCount;
        this.groupOfColums.onclick = function f(e) {
            e = e || window.event;
            var el = e.target || e.srcElement;
            j = +el.id + 1;
        };
        for (let i = 0; i < this.columsArr.length; i++) {
            var newColumn = document.createElement('div');
            newColumn.className = 'column';
            newColumn.style.height = this.columsArr[i].value * COLUM_HEIGHT_COEFFICIENT + 'px';
            newColumn.style.left = Render.getColumBais(i);
            newColumn.innerText = this.columsArr[i].value;
            this.groupOfColums.appendChild(newColumn);
        }
        document.body.children[0].appendChild(this.groupOfColums);        

    }

    updateRender(columsArr) {
        for (let i = 0; i < columsArr.length; i++) {
            let columsGroup = document.body.children[0].children[j - 1];
            columsGroup.children[this.columsArr[i].palce].style.left = Render.getColumBais(i);
        }
    }

    static getColumBais(index) {
        const COLUM_SPACING = 30;
        return (index + 1) * COLUM_SPACING + 'px';
    }
}

function inputedNewString() {
    
    var inputedString = document.querySelector(".text-box").value;
    var valuesArr = inputedString.split('').map(Number);

    var sorter = new Sorter (valuesArr);
    var render = new Render (sorter.colums);

    console.dir(sorter);
    console.dir(render);
    console.log(valuesArr);
    
    objectsCollection.set (sorter, render);
    keys.push(sorter);

    
    groupsCount++;
    j++; 
   
}  

function previousStep() {
    objectsCollection.get(keys[j - 1]).updateRender((keys[j - 1]).step('back'))
}

function nextSortStep(){ 
    objectsCollection.get(keys[j - 1]).updateRender((keys[j - 1]).step('up'))
    
}

