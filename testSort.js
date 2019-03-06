var sorterObj, renderObj;

function Sorter (arr) {
    this.stepsToSort = [];
    this.colums = [];
    this.currentPos = 0;
    
    for (let i = 0; i < arr.length; i++) {
        this.colums.push({palce: i, value: arr[i]});
    }

    var exitFlag = true;
    while (exitFlag){
        exitFlag = false;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr [i + 1]) {
                var swap = arr[i]
                arr[i] = arr[i + 1];
                arr[i + 1] = swap;
                this.stepsToSort.push(i);
                exitFlag = true;
                
            } 
        }
    }
    
    Sorter.prototype.swap = function () {
        var m = this.stepsToSort[this.currentPos];
        var n = this.stepsToSort[this.currentPos] + 1;
        var swap = this.colums[m];
        this.colums[m] = this.colums[n];
        this.colums[n] = swap;
    }

    Sorter.prototype.step = function (direction){
        switch (direction){
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

function Render (columsArr) {
    this.columsArr = columsArr;
    this.groupOfColums = document.createElement('div');
    this.groupOfColums.setAttribute('class', 'groupOfcolumns');
    
    for (let i = 0; i < this.columsArr.length; i++) {
        var newColumn = document.createElement('div');
        newColumn.setAttribute('class', 'column');
        newColumn.style.height = this.columsArr[i].value * 16 +'px';
        newColumn.style.left = (i + 1) * 30 + 'px';
        newColumn.innerText = this.columsArr[i].value;
        this.groupOfColums.appendChild(newColumn);
       
    }
    document.body.children[1].appendChild(this.groupOfColums);

    Render.prototype.updateRender = function (columsArr, groupID) {
        for (let i = 0; i < columsArr.length; i++) {
            let columsGroup = document.body.children[1].lastChild;
            columsGroup.children[this.columsArr[i].palce].style.left = (i + 1) * 30 + 'px';
                   
        }
    }
}

function inputedNewString() {
    
    var inputedString = document.querySelector(".text-box");
    var targetArr = inputedString.value.split('').map(Number);
  
    sorterObj = new Sorter (targetArr);
    renderObj = new Render (sorterObj.colums);

}  

function previousStep() {
    renderObj.updateRender(sorterObj.step('back'));
}

function nextSortStep() {
    renderObj.updateRender(sorterObj.step('up')); 
}
