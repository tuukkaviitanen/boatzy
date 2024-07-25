import Row from '../models/Row';

const rows = [
  new Row('11111', 'Ones'),
  new Row('22222', 'Twos'),
  new Row('33333', 'Threes'),
  new Row('44444', 'Fours'),
  new Row('55555', 'Fives'),
  new Row('66666', 'Sixes'),
  new Row('Total', 'Upper Section Total', undefined, true),
  new Row('Bonus', 'Bonus', undefined, true),
  new Row('66', 'One Pair'),
  new Row('55\t66', 'Two Pairs'),
  new Row('666', 'Three of a Kind'),
  new Row('5555', 'Four of a Kind'),
  new Row('12345', 'Small Straight'),
  new Row('23456', 'Large Straight'),
  new Row('55566', 'Full House'),
  new Row('00000', 'Chance'),
  new Row('Boatzy', 'Boatzy'),
  new Row('Total', 'Full Total', undefined, true),
];

export default rows;
