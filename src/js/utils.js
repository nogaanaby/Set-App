export default{
  cardObject (shape, color, number, filling) {
    return ({
      shape: shape,
      color: color,
      number: number,
      fill: filling
    })
  },

  /**************************************
  cardTable staff
  *************************************/
  takeNewCard: (array) => (array.splice((Math.floor(Math.random() * array.length)), 1)[0]),

  addThree: function (mainArray, pushedArray) {
    mainArray.push(this.takeNewCard(pushedArray), this.takeNewCard(pushedArray), this.takeNewCard(pushedArray))
  },
  /**************************************
     set staff
  *************************************/
  sameOrDiff: (a, b, c) =>
    (a === b && b === c) || (a !== b && b !== c && c !== a),

  isSet: function (array, x, y, z) {
    debugger
    return (this.sameOrDiff(array[x].shape, array[y].shape, array[z].shape) &&
    this.sameOrDiff(array[x].number, array[y].number, array[z].number) &&
    this.sameOrDiff(array[x].color, array[y].color, array[z].color) &&
    this.sameOrDiff(array[x].fill, array[y].fill, array[z].fill)
    )
  },

  findSet: function (array, x, y, z) {
    return (
      (x > array.length - 3)
        ? 'no set here'
        : (this.isSet(array, x, y, z))
          ? [array[x], array[y], array[z]]
          : (y === array.length - 2)
            ? this.findSet(array, x + 1, x + 2, x + 3)
            : (z === array.length - 1)
              ? this.findSet(array, x, y + 1, y + 2)
              : this.findSet(array, x, y, z + 1))
  }
}
