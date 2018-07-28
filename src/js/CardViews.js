
export class CardView {
  constructor (shapeCanvas, cardCanvas, card) {
    this.shapeCanvas = shapeCanvas
    this.cardCanvas = cardCanvas
    this.shape = card.shape
    this.color = card.color
    this.number = card.number
    this.fill = card.fill
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

  setNewCardAtrr (card) {
    this.getCardContext.clearRect(0, 0, 150, 198)
    this.getShapeContext.clearRect(0, 0, 150, 66)
    this.shape = card.shape
    this.color = card.color
    this.fill = card.fill
    this.number = card.number
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
    this.getShapeContext.lineWidth = 3
    this.getShapeContext.moveTo(a, b)
    this.getShapeContext.lineTo(c, d)
    this.getShapeContext.lineTo(e, f)
    this.getShapeContext.lineTo(g, h)
    this.getShapeContext.lineTo(a, b)
    this.getShapeContext.closePath()
    this.getShapeContext.stroke()
  }

  drawShape () {
    (this.shape === 'sub')
      ? this.draw(37, 33, 75, 56, 112, 33, 75, 10)
      : (this.shape === 'rect')
        ? this.draw(37, 10, 112, 10, 112, 56, 37, 56)
        : (this.shape === 'tri')
          ? this.draw(75, 10, 112, 56, 112, 56, 37, 56)
          : this.drawCircle()
  }

  drawCircle () {
    this.getShapeContext.beginPath()
    this.getShapeContext.arc(75, 33, 25, 0, 2 * Math.PI)
    this.getShapeContext.stroke()
  }
  /************************************
   shape fill
  ************************************/

  /*******
   sub
  *******/
  drawStr (x, b, c, m) {
    let Ya = -m * x + b
    let Yb = m * x + c
    this.getShapeContext.lineWidth = 1
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
  /*********
   triangle
  *********/
  drawStr1func (x, b, m) {
    let Ya = m * x + b
    this.getShapeContext.lineWidth = 1
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
  /**********
   rectengle
  ***********/
  rectStr (x) {
    this.getShapeContext.lineWidth = 1
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

  /*********
   circle
  *********/
  circleStrips (x1, x2, y) {
    this.getShapeContext.moveTo(x1, y)
    this.getShapeContext.lineTo(x2, y)
    this.getShapeContext.stroke()
  }

  circleStr (c) {
    const xArray = [0, 1, 1, 2, 5]
    let i = 0
    let x1 = 50
    let x2 = 100
    for (let y = 33; y > 12; y = y - 5) {
      this.circleStrips(x1 += xArray[i], x2 -= xArray[i], y)
      i++
    }
    i = 1; x1 = 51; x2 = 99
    for (let y = 38; y <= 53; y = y + 5) {
      this.circleStrips(x1 += xArray[i], x2 -= xArray[i], y)
      i++
    }
  }

  circleFull () {
    let x1 = 50
    let x2 = 100
    for (let y = 33; y >= 28; y--) {
      this.getShapeContext.moveTo(x1 += 0.1, y)
      this.getShapeContext.lineTo(x2 -= 0.1, y)
    }
    for (let y = 27; y >= 22; y--) {
      this.getShapeContext.moveTo(x1 += 0.25, y)
      this.getShapeContext.lineTo(x2 -= 0.25, y)
    }
    for (let y = 21; y >= 12; y--) {
      this.getShapeContext.moveTo(x1 += 0.8, y)
      this.getShapeContext.lineTo(x2 -= 0.8, y)
    }
    for (let y = 11; y >= 9; y--) {
      this.getShapeContext.moveTo(x1 += 2, y)
      this.getShapeContext.lineTo(x2 -= 2, y)
    }

    x1 = 51
    x2 = 99
    for (let y = 34; y <= 38; y++) {
      this.getShapeContext.moveTo(x1 += 0.1, y)
      this.getShapeContext.lineTo(x2 -= 0.1, y)
    }
    for (let y = 39; y <= 44; y++) {
      this.getShapeContext.moveTo(x1 += 0.25, y)
      this.getShapeContext.lineTo(x2 -= 0.25, y)
    }
    for (let y = 45; y <= 54; y++) {
      this.getShapeContext.moveTo(x1 += 0.8, y)
      this.getShapeContext.lineTo(x2 -= 0.8, y)
    }
    for (let y = 55; y <= 57; y++) {
      this.getShapeContext.moveTo(x1 += 2, y)
      this.getShapeContext.lineTo(x2 -= 2, y)
    }
    this.getShapeContext.stroke()
  }

  changeFillcircle () {
    if (this.fill === 'full') {
      this.circleFull()
    } else if (this.fill === 'stripes') {
      this.circleStr()
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
    if (this.shape === 'circle') {
      this.changeFillcircle()
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
