/* Entry point */ import addNewSorter from './src/main';
addNewSorter(document.body);

import './css/stl.css';
import App from './src/components_new/App';

const root = document.getElementById('root') as HTMLDivElement;
root.append(App());
