import utils from '../js/utils.js'
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
            this.cardsDeckArray.push(utils.cardObject(shape, color, number, fill))
          )
        )
      )
    )
  }
}
