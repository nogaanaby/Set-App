import utils from '../js/utils.js'
import { CardsDeck } from '../js/CardsDeck.js'
export class PracticeSetClass {
  constructor (card1, card2, card3) {
    this.first2cards = [card1, card2]
    this.third = card3
    const cards = new CardsDeck()
    const options =
    [
      card3,
      utils.takeNewCard(cards.cardsDeckArray),
      utils.takeNewCard(cards.cardsDeckArray),
      utils.takeNewCard(cards.cardsDeckArray),
      utils.takeNewCard(cards.cardsDeckArray),
      utils.takeNewCard(cards.cardsDeckArray)
    ]

    this.optionsForTheThird = utils.mixArray(options)
  }
}

export default{
  multplayerOffline: {
    player1: '',
    player2: ''
  },
  cards: new CardsDeck(),
  practiceSets: [
    new PracticeSetClass(
      utils.cardObject('sub', 'purple', 1, 'stripes'),
      utils.cardObject('sub', 'purple', 2, 'stripes'),
      utils.cardObject('sub', 'purple', 3, 'stripes')
    ),
    new PracticeSetClass(
      utils.cardObject('rect', 'red', 2, 'empty'),
      utils.cardObject('rect', 'purple', 2, 'empty'),
      utils.cardObject('rect', 'green', 2, 'empty')
    ),
    new PracticeSetClass(
      utils.cardObject('sub', 'red', 2, 'full'),
      utils.cardObject('tri', 'purple', 1, 'empty'),
      utils.cardObject('rect', 'green', 3, 'stripes')
    ),
    new PracticeSetClass(
      utils.cardObject('sub', 'green', 1, 'full'),
      utils.cardObject('sub', 'red', 2, 'empty'),
      utils.cardObject('sub', 'purple', 3, 'stripes')
    ),
    new PracticeSetClass(
      utils.cardObject('rect', 'red', 3, 'stripes'),
      utils.cardObject('sub', 'red', 2, 'empty'),
      utils.cardObject('tri', 'red', 1, 'full')
    )
  ]
}
