
import { CardView } from './CardViews.js'
import backGame from './backGame.js'
export default {
  drawCards (shapeCanvas, cardCanvas, card) {
    const cardView = new CardView(shapeCanvas, cardCanvas, card)
    cardView.drawCard()
  },
  /**************************************
     created
  *************************************/
  createCanvases (cards81) {
    // pull out random card from the card deck and puts it on the table
    const cardViewsArray = []
    for (let i = 0; i < 12; i++) {
      cardViewsArray[i] = new CardView('notThereYet', 'notThereYet', backGame.takeNewCard(cards81))
    }
    return cardViewsArray
  }
}
