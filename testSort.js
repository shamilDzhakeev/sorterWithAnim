"use strict";

function Sorter (targetArr) {
    
    this.stepsToSort = [];
    this.arrayWithColumns = [];
    this.currentPosition = 0;

    for (let i = 0; i < targetArr.length; i++){
        this.arrayWithColumns.push( {"place":i, value: targetArr[i]} );
    } 

    var replaceCounter = 1; 
    var tempArray = this.arrayWithColumns.slice(0);

    while (replaceCounter){
        replaceCounter = 0;
        for (let i = 0; i < tempArray.length - 1; i++){
            if( tempArray[i].value > tempArray[i + 1].value){
                
                var swap = tempArray[i];
                tempArray[i] = tempArray[i + 1];
                tempArray[i + 1] = swap;
                this.stepsToSort.push(i);
                replaceCounter ++;
                                    
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
}

function Graph (arrayWithColumns) {
 
    this.arrayWithColumns = arrayWithColumns;
    
    mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = "";

    for (let i = 0; i < arrayWithColumns.length; i++){

        var newDiv = document.createElement('div');
        newDiv.classList.add("column");	
        newDiv.style.height = this.arrayWithColumns[i].value * 17 + "px";
        newDiv.style.left = 30 * (i + 2) + "px";	
        newDiv.innerText = this.arrayWithColumns[i].value;
        mainDiv.appendChild(newDiv);

    }
    
    this.update = function (arrayWithColumns) {
    for (let i = 0; i < arrayWithColumns.length; i++) {
        mainDiv.children[this.arrayWithColumns[i].place].style.left = 30 * (i + 2) + "px";
    }
  }
  
}

var sorter, graph;

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