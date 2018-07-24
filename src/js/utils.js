
export class CardView {
  constructor (shapeCanvas, cardCanvas, shape, color, fill, number) {
    this.shapeCanvas = shapeCanvas
    this.cardCanvas = cardCanvas
    this.shape = shape
    this.color = color
    this.number = number
    this.fill = fill
  }

  copyCardView (card) {
    this.shapeCanvas = card.shapeCanvas
    this.cardCanvas = card.cardCanvas
    this.shape = card.shape
    this.color = card.color
    this.number = card.number
    this.fill = card.fill
  }

  get getShapeContext () {
    this.shapeContext = this.shapeCanvas.getContext('2d')
    return (this.shapeContext)
  }

  get getCardContext () {
    this.cardContext = this.cardCanvas.getContext('2d')
    return (this.cardContext)
  }

  setNewCardAtrr (shape, color, fill, number) {
    this.getCardContext.clearRect(0, 0, 150, 198)
    this.getShapeContext.clearRect(0, 0, 150, 66)
    this.shape = shape
    this.color = color
    this.fill = fill
    this.number = number
    this.drawCard()
  }

  drawCard () {
    // set the properties to the shape - witch is not displayed
    this.drawShape()
    this.changeColor()
    this.changeFill()
    // copy the properties on the card on the current atrr number
    this.copyShape()
  }

  draw (a, b, c, d, e, f, g, h) {
    this.getShapeContext.beginPath()
    this.getShapeContext.moveTo(a, b)
    this.getShapeContext.lineTo(c, d)
    this.getShapeContext.lineTo(e, f)
    this.getShapeContext.lineTo(g, h)
    this.getShapeContext.lineTo(a, b)
    this.getShapeContext.closePath()
    this.getShapeContext.stroke()
  }

  drawShape () {
    if (this.shape === 'sub') {
      this.draw(37, 33, 75, 56, 112, 33, 75, 10)
    } if (this.shape === 'rect') {
      this.draw(37, 10, 112, 10, 112, 56, 37, 56)
    } if (this.shape === 'tri') {
      this.draw(75, 10, 112, 56, 112, 56, 37, 56)
    }
  }
  /************************************
   shape fill
  ************************************/
  drawStr (x, b, c, m) {
    let Ya = -m * x + b
    let Yb = m * x + c

    this.getShapeContext.moveTo(x, Ya)
    this.getShapeContext.lineTo(x, Yb)

    this.getShapeContext.stroke()
  }
  subStr () {
    for (let x = 39; x <= 75; x += 5) {
      this.drawStr(x, 55, 10.8, 0.6)
    }

    for (let x = 79; x <= 112; x += 5) {
      this.drawStr(x, 100, -35, 0.6)
    }
  }

  subFull () {
    for (let x = 39; x <= 75; x++) {
      this.drawStr(x, 55, 10.8, 0.6)
    }

    for (let x = 76; x <= 112; x++) {
      this.drawStr(x, 100, -35, 0.6)
    }
  }
  changeFillsub () {
    if (this.fill === 'full') {
      this.subFull()
    } else if (this.fill === 'stripes') {
      this.subStr()
    } else {

    }
  }
  /************************************
   triangle
  ************************************/
  drawStr1func (x, b, m) {
    let Ya = m * x + b

    this.getShapeContext.moveTo(x, Ya)
    this.getShapeContext.lineTo(x, 56)

    this.getShapeContext.stroke()
  }
  triStr (context) {
    for (let x = 39; x <= 75; x += 5) {
      this.drawStr1func(x, 100.79, -1.21)
    }

    for (let x = 79; x <= 112; x += 5) {
      this.drawStr1func(x, -83.24, 1.24)
    }
  }
  triFull () {
    for (let x = 39; x <= 75; x++) {
      this.drawStr1func(x, 100.79, -1.21)
    }

    for (let x = 76; x <= 112; x++) {
      this.drawStr1func(x, -83.24, 1.24)
    }
  }
  changeFilltri () {
    if (this.fill === 'full') {
      this.triFull()
    } else if (this.fill === 'stripes') {
      this.triStr()
    } else {

    }
  }
  /************************************
   rectengle
  ************************************/
  rectStr (x) {
    this.getShapeContext.moveTo(x, 10)
    this.getShapeContext.lineTo(x, 56)
    this.getShapeContext.stroke()
  }
  changeFillrect () {
    if (this.fill === 'full') {
      for (let x = 37; x <= 112; x++) {
        this.rectStr(x)
      }
    } else if (this.fill === 'stripes') {
      for (let x = 37; x <= 112; x += 5) {
        this.rectStr(x)
      }
    } else {

    }
  }
  /**************************************
   changim
  *************************************/

  changeColor () {
    this.getShapeContext.strokeStyle = this.color
    this.getShapeContext.stroke()
  }

  changeFill () {
    if (this.shape === 'sub') {
      this.changeFillsub()
    } if (this.shape === 'rect') {
      this.changeFillrect()
    } if (this.shape === 'tri') {
      this.changeFilltri()
    }
  }

  copyShape () {
    let imgData = this.getShapeContext.getImageData(0, 0, 150, 66)

    if (this.number === 1) {
      this.getCardContext.putImageData(imgData, 0, 66)
    } else if (this.number === 3) {
      this.getCardContext.putImageData(imgData, 0, 0)
      this.getCardContext.putImageData(imgData, 0, 66)
      this.getCardContext.putImageData(imgData, 0, 132)
    } else {
      this.getCardContext.putImageData(imgData, 0, 45)
      this.getCardContext.putImageData(imgData, 0, 105)
    }
  }

  equalTo (card) {
    if (this.shape === card.shape &&
        this.color === card.color &&
        this.number === card.number &&
        this.fill === card.fill) {
      return true
    }
    return false
  }
}

export class Set {
  constructor (shape, color, fill, number, canvas, take) {
    this.shape = shape
    this.color = color
    this.fill = fill
    this.number = number
    this.canvas = canvas
    this.take = take
  }
}

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

  // only for cardOnTheTable (without canvasses)
  // because isSet uses simple obj cards
  // it is render the simple card obj and than put a cardView obj in the array
  changeCard: function (card1, card2) {
    card1.shape = card2.shape
    card1.number = card2.number
    card1.color = card2.color
    card1.fill = card2.fill
    card1.id = card2.id
  },

  findSet: function (array, x, y, z) {
    const setArray = []
    if (x > array.length - 3) {
      return ('no set here')
    }

    if (this.isSet(array, x, y, z)) {
      setArray.push(array[x], array[y], array[z])
      return (setArray)
    } else {
      if (y === array.length - 2) {
        x++
        y = x + 1
        z = y + 1
        return (this.findSet(array, x, y, z))
      } else {
        if (z === array.length - 1) {
          y = y + 1
          z = y + 1
          return (this.findSet(array, x, y, z))
        } else {
          z++
          return (this.findSet(array, x, y, z))
        }
      }
    }
  }
}
