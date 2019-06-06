const checkData = function(data: number[]): boolean {
  if (!data.length) {
    return false;
  }
  return data.every(
    (value): boolean => {
      if (value === null || isNaN(value)) {
        return false;
      }
      return true;
    },
  );
};
export default checkData;
