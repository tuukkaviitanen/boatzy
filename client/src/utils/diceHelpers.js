import sum from './sum';

export const findTwoPairs = (array) => {
  const grouped = Object.groupBy(array, (number) => number);

  const pairs = Object.entries(grouped).reduce(
    (nOfAKinds, [key, group]) =>
      group.length >= 2 && key > 0 ? [...nOfAKinds, key] : nOfAKinds,
    [],
  );

  const topPairs = structuredClone(pairs).sort().slice(0, 2);

  if (topPairs.length < 2) {
    return 0;
  }

  const sumOfPairs = sum(topPairs.map((pair) => pair * 2));

  return sumOfPairs;
};

export const findNOfAKind = (array, n) => {
  const grouped = Object.groupBy(array, (number) => number);

  const highest = Object.entries(grouped).reduce(
    (highest, [key, group]) =>
      group.length >= n && key > highest ? key : highest,
    0,
  );

  const sum = highest * n;

  return sum;
};

export const findFullHouse = (array) => {
  const grouped = Object.groupBy(array, (number) => number);

  const filteredGroups = Object.entries(grouped).filter(([key]) => key > 0);

  const counts =
    filteredGroups.length === 2 &&
    filteredGroups.map(([, groups]) => groups.length);

  const isFullHouse = counts && counts.includes(2) && counts.includes(3);

  return isFullHouse ? sum(array) : 0;
};
