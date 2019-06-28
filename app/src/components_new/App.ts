import AppHeader from './AppHeader';

export default function App(): HTMLDivElement {
  const application = document.createElement('div');
  application.className = 'application';
  application.append(AppHeader());

  return application;
}
