import { PyramidCards } from '.';

export function isDisabledCardToSelect(cardIndex: number, pyramid: PyramidCards) {
  const indexLeftChild = RulesCards[cardIndex]?.[0];
  const indexRightChild = RulesCards[cardIndex]?.[1];
  return !!(
    indexLeftChild !== undefined &&
    indexRightChild !== undefined &&
    (pyramid[indexLeftChild] !== null || pyramid[indexRightChild] !== null)
  );
}

const RulesCards: { [key: number]: number[] } = {
  0: [1, 2],
  1: [3, 4],
  2: [4, 5],
  3: [6, 7],
  4: [7, 8],
  5: [8, 9],
  6: [10, 11],
  7: [11, 12],
  8: [12, 13],
  9: [13, 14],
  10: [15, 16],
  11: [16, 17],
  12: [17, 18],
  13: [18, 19],
  14: [19, 20],
  15: [21, 22],
  16: [22, 23],
  17: [23, 24],
  18: [24, 25],
  19: [25, 26],
  20: [26, 27],
};
