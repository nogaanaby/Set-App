const backGame = {
  cardObject (shape, color, number, fill) {
    return ({
      shape: shape,
      color: color,
      number: number,
      fill: fill
    })
  },

  /**************************************
  cardTable staff
  *************************************/
  takeNewCard: (array) => (array.splice((Math.floor(Math.random() * array.length)), 1)[0]),
  pickRandomCard: (array) => {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  },
  resetCardState (cardViewsArray) {
    cardViewsArray.forEach((element) => { element.state = 'unclicked' })
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
  },
  haveTheSameCard (cardsViewsArray, cardsDeck) {
    for (let i = 0; i < cardsViewsArray.length; i++) {
      for (let j = i + 1; j < cardsViewsArray.length - 1; j++) {
        if (cardsViewsArray[i].getCardData === cardsViewsArray[j].getCardData) {
          cardsViewsArray[i].setNewCardAtrr(this.takeNewCard(cardsDeck))
          this.allwaysSetOnTheTable(cardsViewsArray, cardsDeck, i)
        }
      }
    }
  },
  allwaysSetOnTheTable (cardsViewsArray, cardsDeck, i) {
    while (this.findSet(cardsViewsArray, 0, 1, 2) === 'no set here') {
      cardsViewsArray[i].setNewCardAtrr(this.takeNewCard(cardsDeck))
      // this.haveTheSameCard(cardsViewsArray, cardsDeck)
    }
  },
  switchCards (cardVArray, cardsArray, setArray) {
    const tempArray = cardVArray
    let oneOfThemIndex = 0
    tempArray.forEach((card, i) => {
      if (setArray[0] === card || setArray[1] === card || setArray[2] === card) {
        tempArray[i].setNewCardAtrr(this.takeNewCard(cardsArray))
        tempArray[i].state = 'isTaken'
        oneOfThemIndex = i
      }
    })
    this.allwaysSetOnTheTable(tempArray, cardsArray, oneOfThemIndex)
    return tempArray
  }
}

export default backGame

export class CardsDeck {
  constructor () {
    const shapes = ['rect', 'sub', 'tri']
    const numbers = [1, 2, 3]
    const colors = ['green', 'purple', 'red']
    const fills = ['empty', 'full', 'stripes']

    this.cardsDeckArray = []

    shapes.forEach(shape => numbers
      .forEach(number => colors
        .forEach(color => fills
          .forEach(fill =>
            this.cardsDeckArray.push(backGame.cardObject(shape, color, number, fill))
          )
        )
      )
    )
  }
}
