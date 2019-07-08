export const loadingWheel = (): HTMLDivElement => {
  const loadingWheel = document.createElement('div');
  loadingWheel.classList.add('loader');

  return loadingWheel;
};

export const dataChecker = function(data: number[]): boolean {
  if (!data.length) {
    return false;
  }
  return data.every((value): boolean => {
    if (value === null || isNaN(value)) {
      return false;
    }
    return true;
  });
};

export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
