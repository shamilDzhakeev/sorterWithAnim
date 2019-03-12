
var sorterObjArr = []
var renderObjArr = [];
var groupsCount = 0;
var j = 0;


class Sorter {
    constructor(arr) {
        this.targetArr = arr;
        this.stepsToSort = [];
        this.colums = [];
        this.currentPos = 0;
        for (let i = 0; i < this.targetArr.length; i++) {
            this.colums.push({ palce: i, value: this.targetArr[i] });
        }
        
        do {
            var exitFlag = false;
            for (let i = 0; i < this.targetArr.length - 1; i++) {
                if (this.targetArr[i] > this.targetArr[i + 1]) {
                    var swap = this.targetArr[i];
                    this.targetArr[i] = this.targetArr[i + 1];
                    this.targetArr[i + 1] = swap;
                    this.stepsToSort.push(i);
                    exitFlag = true;
                }
            }
        } while (exitFlag);

        Sorter.prototype.swap = function () {
            var m = this.stepsToSort[this.currentPos];
            var n = this.stepsToSort[this.currentPos] + 1;
            var swap = this.colums[m];
            this.colums[m] = this.colums[n];
            this.colums[n] = swap;
        };
        Sorter.prototype.step = function (direction) {
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
        };
    }
}

class Render {

    constructor(columsArr) {
        
        const COLUM_HEIGHT_COEFFICIENT = 15;
        const COLUM_SPACING = 30;
        
        function getColumBais (index) {
            return (index + 1) * COLUM_SPACING + 'px';
        };

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
            newColumn.style.left = getColumBais(i);
            newColumn.innerText = this.columsArr[i].value;
            this.groupOfColums.appendChild(newColumn);
        }
        document.body.children[1].appendChild(this.groupOfColums);
        
        Render.prototype.updateRender = function (columsArr) {
            for (let i = 0; i < columsArr.length; i++) {
                let columsGroup = document.body.children[1].children[j - 1];
                columsGroup.children[this.columsArr[i].palce].style.left = getColumBais(i);
            }
        };
    }
}

function inputedNewString() {
    
    var inputedString = document.querySelector(".text-box");
    var targetArr = inputedString.value.split('').map(Number);
  
    sorterObjArr.push ( new Sorter (targetArr));
    renderObjArr.push ( new Render (sorterObjArr[groupsCount].colums));
    groupsCount++;
    j++; 
    console.log (groupsCount);

}  

function previousStep() {
    renderObjArr[j - 1].updateRender(sorterObjArr[j - 1].step('back'));
}

function nextSortStep() {
    renderObjArr[j - 1].updateRender(sorterObjArr[j - 1].step('up')); 
}
