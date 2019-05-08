/* eslint-disable @typescript-eslint/explicit-function-return-type */

import Renderer from './render';
import Sorterer from './sorter';
import { getDataSource } from './data-sources';
import { columnsContainer } from './header';

export async function getNumericArr() {
  const source = getDataSource('server');

  console.log('Ждем данные...');
  const arr: number[] = await source.getData();
  console.log('Получили данные от сервера: ', arr);

  const sorter = new Sorterer(arr);
  const render = new Renderer(arr, columnsContainer);
}
