"use strict";

class Sorter {

    constructor(targetArr){

        this.targetArr = targetArr;
        for (let i = 0; i < targetArr.length; i++) {
          //alert(typeof targetArr[i]);
          
        }
        this.stepsToSort = [];
        this.arrayWithColumns = [];
        this.currentPosition = 0;

        for (let i = 0; i < this.targetArr.length; i++){

            this.arrayWithColumns.push( {"place":i, value: this.targetArr[i]} );

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
    }

    next(){

        if (this.currentPosition < this.stepsToSort.length){

            var m = this.stepsToSort[this.currentPosition];
            var n = this.stepsToSort[this.currentPosition] + 1;
            
            var swap = this.arrayWithColumns[m];
            this.arrayWithColumns[m] = this.arrayWithColumns[n];
            this.arrayWithColumns[n] = swap;

            this.currentPosition = this.currentPosition + 1;
            
       }
       return this.arrayWithColumns;
    }

    previous(){
        if (this.currentPosition > 0) {

            this.currentPosition = this.currentPosition - 1;

            var m = this.stepsToSort[this.currentPosition];
            var n = this.stepsToSort[this.currentPosition] + 1;
            
            var swap = this.arrayWithColumns[m];
            this.arrayWithColumns[m] = this.arrayWithColumns[n];
            this.arrayWithColumns[n] = swap;

        } 
      return this.arrayWithColumns;
    }
 
};


class Graph {

  constructor(arrayWithColumns) {

    this.mainDiv = document.getElementById("mainDiv");
    this.arrayWithColumns = arrayWithColumns;
    this.mainDiv.innerHTML = "";

    for (let i = 0; i < arrayWithColumns.length; i++){
      var newDiv = document.createElement('div');
      newDiv.classList.add("column");	
      newDiv.style.height = this.arrayWithColumns[i].value * 17 + "px";
      newDiv.style.left = 30 * (i + 2) + "px";	
      newDiv.innerText = this.arrayWithColumns[i].value;
      this.mainDiv.appendChild(newDiv);
      
    }
  }
  
  update(arrayWithColumns) {
    for (let i = 0; i < arrayWithColumns.length; i++) {
        mainDiv.children[this.arrayWithColumns[i].place].style.left = 30 * (i + 2) + "px";
    }
  }
  
};

var sorter, graph;

function inputedNewString() {
  
  var inputedString = document.getElementById("valueBox");
  var arrayWithValues = [];

  for (let item of inputedString.value) {
    arrayWithValues.push(+item);
  }
  
  sorter = new Sorter(arrayWithValues);
  graph = new Graph(sorter.arrayWithColumns);
}
    

function previousStep() {
  var mass = sorter.previous();
  graph.update(mass);
}

function nextSortStep() {
  var mass = sorter.next();
  graph.update(mass);
}