"use strict";

function Sorter (targetArr) {
    
    this.stepsToSort = [];
    this.arrayWithColumns = [];
    this.currentPosition = 0;
    var replaceCounter = 1; 

    for (let i = 0; i < targetArr.length; i++){
        this.arrayWithColumns.push( {"place":i, value: targetArr[i]} );
    }   
    
    while (replaceCounter){
        replaceCounter = 0;
        for (let i = 0; i < targetArr.length - 1; i++){
            if( targetArr[i] > targetArr[i + 1]){
                
                var swap = targetArr[i];
                targetArr[i] = targetArr[i + 1];
                targetArr[i + 1] = swap;
                this.stepsToSort.push(i);
                replaceCounter ++;
                                    
            }
        }
    } 
    
    this.step = function (direction) {
        switch(direction){
            case 'up':{
                if (this.currentPosition < this.stepsToSort.length) {
                    this.swap();
                    this.currentPosition = this.currentPosition + 1;
                }
                return this.arrayWithColumns;
            }

            case 'back':{
                if (this.currentPosition > 0) {
                    this.currentPosition = this.currentPosition - 1;
                    this.swap();
                } 
                return this.arrayWithColumns;
            }
        }                
    }

    this.swap = function () {

        var m = this.stepsToSort[this.currentPosition];
        var n = this.stepsToSort[this.currentPosition] + 1;   
        var swap = this.arrayWithColumns[m];
        this.arrayWithColumns[m] = this.arrayWithColumns[n];
        this.arrayWithColumns[n] = swap;

    }


}

function Graph (arrayWithColumns) {
    
    this.arrayWithColumns = arrayWithColumns;
    this.mainDiv = document.getElementById("mainDiv");
    this.newGroupOfColumns = document.createElement('div');
    this.newGroupOfColumns.classList.add ('groupOfcolumns');
    this.newGroupOfColumns.style.top = offset + 'px';
    
    for (let i = 0; i < this.arrayWithColumns.length; i++){

        var newColumn = document.createElement('div');
        newColumn.classList.add("column");	
        newColumn.style.height = this.arrayWithColumns[i].value * 16 + "px";
        newColumn.style.left = 30 * (i + 2) + "px";	
        newColumn.innerText = this.arrayWithColumns[i].value;
        this.newGroupOfColumns.appendChild(newColumn);

    }

    this.mainDiv.appendChild (this.newGroupOfColumns);
    offset += 170;

    this.update = function (arrayWithColumns) {

        for (let i = 0; i < arrayWithColumns.length; i++) {
            this.mainDiv.lastChild.children[this.arrayWithColumns[i].place].style.left = 30 * (i + 2) + "px";
        }
    }
}

var sorter, graph, offset = 90;

function inputedNewString() {
    
    var inputedString = document.querySelector(".text-box");
    var arrayWithValues = inputedString.value.split('').map(Number);
  
    sorter = new Sorter(arrayWithValues);
    graph = new Graph(sorter.arrayWithColumns);
}  

function previousStep() {
    graph.update(sorter.step('back'));
}

function nextSortStep() {
  graph.update(sorter.step('up'));
}