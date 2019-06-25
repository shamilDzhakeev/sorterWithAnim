import AppHeader from './AppHeader';

export default function App(): void {
  const root = document.getElementById('root') as HTMLDivElement;

  root.append(AppHeader());
}
