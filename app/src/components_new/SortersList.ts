import Sorter from './Sorter';

const sortersList: Sorter[] = [];

function addSorter(array: number[]): void {
  sortersList.push(new Sorter(array));
}

function removeSorter(sorter: Sorter): void {
  const index = sortersList.indexOf(sorter);
  sortersList.splice(index, 1);
}
