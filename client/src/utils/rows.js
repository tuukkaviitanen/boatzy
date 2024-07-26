import Row from '../models/Row';
import arraysEqual from './arraysEqual';
import { findTwoPairs, findNOfAKind, findFullHouse } from './diceHelpers';
import sum from './sum';

const calculateBonus = (column) =>
  sum(column.slice(0, 6).map((cell) => cell.value)) >= 63 ? 50 : 0;

const rows = [
  new Row('11111', 'Ones', (dices) => sum(dices.filter((dice) => dice === 1))),
  new Row('22222', 'Twos', (dices) => sum(dices.filter((dice) => dice === 2))),
  new Row('33333', 'Threes', (dices) =>
    sum(dices.filter((dice) => dice === 3)),
  ),
  new Row('44444', 'Fours', (dices) => sum(dices.filter((dice) => dice === 4))),
  new Row('55555', 'Fives', (dices) => sum(dices.filter((dice) => dice === 5))),
  new Row('66666', 'Sixes', (dices) => sum(dices.filter((dice) => dice === 6))),
  new Row(
    'Total',
    'Upper Section Total',
    (_, column) => sum(column.slice(0, 6).map((cell) => cell.value)),
    true,
  ),
  new Row('Bonus', 'Bonus', (_, column) => calculateBonus(column), true),
  new Row('66', 'One Pair', (dices) => findNOfAKind(dices, 2)),
  new Row('55\t66', 'Two Pairs', (dices) => findTwoPairs(dices)),
  new Row('666', 'Three of a Kind', (dices) => findNOfAKind(dices, 3)),
  new Row('5555', 'Four of a Kind', (dices) => findNOfAKind(dices, 4)),
  new Row('12345', 'Small Straight', (dices) =>
    arraysEqual([1, 2, 3, 4, 5], dices) ? sum(dices) : 0,
  ),
  new Row('23456', 'Large Straight', (dices) =>
    arraysEqual([2, 3, 4, 5, 6], dices) ? sum(dices) : 0,
  ),
  new Row('55566', 'Full House', (dices) => findFullHouse(dices)),
  new Row('00000', 'Chance', (dices) => sum(dices)),
  new Row('Boatzy', 'Boatzy', (dices) => findNOfAKind(dices, 5)),
  new Row(
    'Total',
    'Full Total',
    (_, column) =>
      sum(column.map((cell) => cell.value)) + calculateBonus(column),
    true,
  ),
];

export default rows;
