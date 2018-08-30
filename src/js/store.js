import utils from '../js/utils.js'
import backGame, { CardsDeck } from '../js/backGame.js'

export class PracticeSetClass {
  constructor (card1, card2, card3) {
    this.first2cards = [card1, card2]
    this.third = card3
    const cards = new CardsDeck()
    const options =
    [
      card3,
      backGame.takeNewCard(cards.cardsDeckArray),
      backGame.takeNewCard(cards.cardsDeckArray),
      backGame.takeNewCard(cards.cardsDeckArray),
      backGame.takeNewCard(cards.cardsDeckArray),
      backGame.takeNewCard(cards.cardsDeckArray)
    ]

    this.optionsForTheThird = utils.mixArray(options)
  }
}

export default{
  /** Single Game */
  cardV: [],
  askForHelp: false,
  onGame: false,
  multplayerOffline: {
    player1: '',
    player2: ''
  },
  // this is the multiplayer online data, the inviting staff
  onlineUsersCopy: {
    users: []
  },
  thisUser: {
    nickname: ''
  },
  inviter: {
    nickname: ''
  },
  invited: {
    nickname: ''
  },
  gotMassage: {
    gotInvitation: false
  },
  // the game staff
  cardsOnTheTable: [],
  cards: new CardsDeck(),
  practiceSets: [
    new PracticeSetClass(
      backGame.cardObject('sub', 'purple', 1, 'stripes'),
      backGame.cardObject('sub', 'purple', 2, 'stripes'),
      backGame.cardObject('sub', 'purple', 3, 'stripes')
    ),
    new PracticeSetClass(
      backGame.cardObject('rect', 'red', 2, 'empty'),
      backGame.cardObject('rect', 'purple', 2, 'empty'),
      backGame.cardObject('rect', 'green', 2, 'empty')
    ),
    new PracticeSetClass(
      backGame.cardObject('sub', 'red', 2, 'full'),
      backGame.cardObject('tri', 'purple', 1, 'empty'),
      backGame.cardObject('rect', 'green', 3, 'stripes')
    ),
    new PracticeSetClass(
      backGame.cardObject('sub', 'green', 1, 'full'),
      backGame.cardObject('sub', 'red', 2, 'empty'),
      backGame.cardObject('sub', 'purple', 3, 'stripes')
    ),
    new PracticeSetClass(
      backGame.cardObject('rect', 'red', 3, 'stripes'),
      backGame.cardObject('sub', 'red', 2, 'empty'),
      backGame.cardObject('tri', 'red', 1, 'full')
    )
  ]
}
