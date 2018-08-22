/********************************************************
 * BACK-END
 ******************************************************/
module.exports = {
  cardObject (shape, color, number, fill) {
    return ({
      shape: shape,
      color: color,
      number: number,
      fill: fill
    })
  },

  /*****
  cardTable staff
  ******/
  takeNewCard: (array) => (array.splice((Math.floor(Math.random() * array.length)), 1)[0]),
  resetCardState (cardViewsArray) {
    cardViewsArray.forEach((element) => { element.state = 'unclicked' })
  },
  /******
     set staff
  ******/
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
  },

  allwaysSetOnTheTable (cardsViewsArray, cardsDeck) {
    while (this.findSet(cardsViewsArray, 0, 1, 2) === 'no set here') {
      cardsViewsArray[1].setNewCardAtrr(this.takeNewCard(cardsDeck))
    }
  },
  switchCards (cardVArray, cardsArray, setArray) {
    const tempArray = cardVArray
    tempArray.forEach((card, i) => {
      if (setArray[0] === card || setArray[1] === card || setArray[2] === card) {
        tempArray[i].setNewCardAtrr(this.takeNewCard(cardsArray))
        tempArray[i].state = 'isTaken'
      }
    })
    this.allwaysSetOnTheTable(tempArray, cardsArray)
    return tempArray
  }
}
