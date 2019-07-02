const checkData = function(data: number[]): void {
  const incorrectData = 'Данные некорректны!';
  if (!data.length) {
    throw new Error(incorrectData);
  }
  const isAllCorrect = data.every((value): boolean => {
    if (value === null || isNaN(value)) {
      return false;
    }
    return true;
  });

  if (!isAllCorrect) {
    throw new Error(incorrectData);
  }
};
export default checkData;
