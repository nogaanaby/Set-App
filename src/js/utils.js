export default{
  what: function (a) {
    console.log(a)
  },

  cardObject (name, shape, color, number, filling) {
    return ({
      name: name,
      shape: shape,
      color: color,
      number: number,
      fill: filling
    })
  },

  randomCardIndex: function (length) {
    return (Math.floor(Math.random() * length))
  },
  /**************************************
     GAME
  *************************************/
  sameOrDiff: (a, b, c) =>
    (a === b && b === c) || (a !== b && b !== c && c !== a),

  isSet: function (array, x, y, z) {
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
