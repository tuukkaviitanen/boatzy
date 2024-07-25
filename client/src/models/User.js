import rows from '../utils/rows';
import * as uuid from 'uuid';

class User {
  /**
   *
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
    this.column = rows.map(() => ({ value: null, tempValue: null }));
    this.id = uuid.v7();
  }
  /**
   * @type {{value: number | null, tempValue: number | null}}
   */
  column;
  /**
   * @type {string}
   */
  name;
}

export default User;
