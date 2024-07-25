class Row {
  /**
   *
   * @param {String} title
   * @param {String} name
   * @param {(cell: number, column: number[]) => number} rule
   */
  constructor(title, name, rule) {
    (this.title = title), (this.name = name), (this.rule = rule);
  }
}

export default Row;
