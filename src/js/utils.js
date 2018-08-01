import { CardView } from '../js/CardViews.js'
export default{
  cardObject (shape, color, number, fill) {
    return ({
      shape: shape,
      color: color,
      number: number,
      fill: fill
    })
  },

  compare (card1, card2, card3) {
    return ({
      sameShape: (card1.shape === card2.shape || card1.shape === card3.shape),
      sameColor: (card1.color === card2.color || card1.color === card3.Color),
      sameNumber: (card1.number === card2.number || card1.number === card3.number),
      sameFill: (card1.fill === card2.fill || card1.fill === card3.fill)
    })
  },

  drawCards (shapeCanvas, cardCanvas, card) {
    const cardView = new CardView(shapeCanvas, cardCanvas, card)
    cardView.drawCard()
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
