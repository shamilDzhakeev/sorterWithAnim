
var sorterObjArr = []
var renderObjArr = [];
var groupsCount = 0;
var j = 0;


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
    this.groupOfColums.setAttribute('id', groupsCount)
    this.groupOfColums.onclick = function f(e) {
        e = e || window.event;
        var el = e.target || e.srcElement;
        j = +el.id + 1;
    }
    
    for (let i = 0; i < this.columsArr.length; i++) {
        var newColumn = document.createElement('div');
        newColumn.setAttribute('class', 'column');
        newColumn.style.height = this.columsArr[i].value * 16 +'px';
        newColumn.style.left = (i + 1) * 30 + 'px';
        newColumn.innerText = this.columsArr[i].value;
        this.groupOfColums.appendChild(newColumn);
       
    }
    document.body.children[1].appendChild(this.groupOfColums);

    Render.prototype.updateRender = function (columsArr) {
        for (let i = 0; i < columsArr.length; i++) {
            let columsGroup = document.body.children[1].children[j - 1];
            columsGroup.children[this.columsArr[i].palce].style.left = (i + 1) * 30 + 'px';
                   
        }
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
