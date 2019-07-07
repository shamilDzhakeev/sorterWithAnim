import EmptyBox from './components/EmptyBox';
import AppHeader from './components/AppHeader';
import './css/stl.css';

function App(): HTMLDivElement {
  const application = EmptyBox();

  const sortersWrapper = document.createElement('div');
  sortersWrapper.className = 'sorters-wrapper';

  const appHeader = AppHeader(sortersWrapper);
  application.append(appHeader, sortersWrapper);

  return application;
}

const application = App();

document.body.append(application);
