export const isValid = (data: string): boolean => {
  return data.split('').every(
    (character): boolean => {
      if ('0123456789'.indexOf(character) === -1) {
        return false;
      }
      return true;
    }
  );
};
