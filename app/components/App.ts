import AppHeader from './AppHeader';

export const state = [];

export default function App() {
  const appContainer = document.createElement('div');
  appContainer.append(AppHeader());
  return appContainer;
}
