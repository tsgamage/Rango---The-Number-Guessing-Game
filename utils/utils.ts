export const pickRandomIndex = (list: Array<any>) => {
  const randomIndex = Math.floor(Math.random() * list.length);
  return randomIndex;
};
