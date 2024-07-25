class Row {
  /**
   *
   * @param {string} title
   * @param {string} name
   * @param {(dices: number[], column: number[]) => number} rule
   * @param {boolean} generated
   */
  constructor(title, name, rule, generated = false) {
    (this.title = title),
      (this.name = name),
      (this.rule = rule),
      (this.generated = generated);
  }
}

export default Row;
