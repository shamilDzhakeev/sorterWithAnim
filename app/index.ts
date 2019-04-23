import drawNewGraph from './main';

let destinationBlock = document.getElementById('b1');

if (!destinationBlock) {
  destinationBlock = document.body;
}

drawNewGraph(destinationBlock);
