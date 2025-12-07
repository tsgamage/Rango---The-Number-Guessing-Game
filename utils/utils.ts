/**
 * This function returns a random index from the list
 * @param list - A list of items
 * @returns A random index from the list
 */
export const getRandomIndex = (list: Array<any>) => {
  const randomIndex = Math.floor(Math.random() * list.length);
  return randomIndex;
};

/**
 * This function returns a random item from the list
 * @param list - A list of items
 * @returns A random item from the list
 */
export const getRandomItem = (list: Array<any>) => {
  const randomIndex = getRandomIndex(list);
  return list[randomIndex];
};

/**
 * This function returns a random number between min and max
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns A random number between min and max
 */
export const generateRandomNumber = (min: number, max: number) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

export const generateRandomNumberExcluding = (min: number, max: number, excluding: Array<number>) => {
  if (min > max) {
    return min - max;
  }
  if (min === max) {
    return min;
  }
  let randomNumber = generateRandomNumber(min, max);
  while (excluding.includes(randomNumber)) {
    randomNumber = generateRandomNumber(min, max);
  }
  return randomNumber;
};
