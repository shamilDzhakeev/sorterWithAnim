export const checkData = function(data: number[]): boolean {
  return data.every(
    (value): boolean => {
      if (value === null || isNaN(value)) {
        return false;
      }
      return true;
    },
  );
};
