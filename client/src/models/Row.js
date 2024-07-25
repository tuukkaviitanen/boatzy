class Row {
  /**
   *
   * @param {string} title
   * @param {string} name
   * @param {(dices: number[], column: number[]) => number} rule
   */
  constructor(title, name, rule) {
    (this.title = title), (this.name = name), (this.rule = rule);
  }
}

export default Row;
