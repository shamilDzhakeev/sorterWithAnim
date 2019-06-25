import SortererHeader from './SortererHeader';
import ColumnsContainer from './ColumnsContainer';

export default function SortererN(): HTMLDivElement {
  const sorterer = document.createElement('div');
  sorterer.className = 'sorterer';

  sorterer.append(SortererHeader(null, null, null));
  sorterer.append(ColumnsContainer([5], 'yellow'));

  return sorterer;
}
