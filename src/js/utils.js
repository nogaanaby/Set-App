import backGame from './backGame'

export default{
  compare (card1, card2, card3) {
    return ({
      sameShape: (card1.shape === card2.shape || card1.shape === card3.shape),
      sameColor: (card1.color === card2.color || card1.color === card3.Color),
      sameNumber: (card1.number === card2.number || card1.number === card3.number),
      sameFill: (card1.fill === card2.fill || card1.fill === card3.fill)
    })
  },
  mixArray (orderd) {
    const mixed = []
    for (let i = 0; i < orderd.length + mixed.length; i++) {
      const card = backGame.takeNewCard(orderd)
      mixed.push(card)
    }
    return mixed
  }
}
