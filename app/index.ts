import drawNewGraph from './main';

let destinationBlock: HTMLElement | null = document.getElementById('b1');

if (!destinationBlock) {
  destinationBlock = document.body;
}

drawNewGraph(destinationBlock);
