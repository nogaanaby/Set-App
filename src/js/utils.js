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
  sameOrDiffAttr: function (attr1, attr2, attr3) {
    if (attr1 === attr2) {
      if (attr2 === attr3) {
        return true
      }
    } else if (attr1 !== attr2 && attr2 !== attr3 && attr1 !== attr3) {
      return true
    } else {
      return false
    }
  },
  /**************************************
     shapes
  *************************************/
  drawSub: function (context) {
  // subsidized stracture and size
  // 150 x 66

    let blx = 37 // blx= basic left x cordinate
    let bly = 33

    let bbx = 75 // blx= basic buttom x cordinate
    let bby = 56

    let brx = 112
    let bry = 33

    let bux = 75
    let buy = 10

    context.beginPath()

    context.moveTo(blx, bly)
    context.lineTo(bbx, bby)
    context.lineTo(brx, bry)
    context.lineTo(bux, buy)
    context.lineTo(blx, bly)

    context.closePath()
    context.stroke()
  },

  drawRect: function (ctx) {
    ctx.beginPath()
    ctx.moveTo(37, 10)
    ctx.lineTo(112, 10)
    ctx.lineTo(112, 56)
    ctx.lineTo(37, 56)
    ctx.lineTo(37, 10)
    ctx.closePath()
    ctx.stroke()
  },

  drawTri: function (ctx) {
    ctx.beginPath()
    ctx.moveTo(75, 10)
    ctx.lineTo(112, 56)
    ctx.lineTo(37, 56)
    ctx.lineTo(75, 10)
    ctx.closePath()
    ctx.stroke()
  },

  /************************************
   shape fill
  ************************************/
  drawStr: function (context, x, b, c) {
    let Ya = -0.6 * x + b
    let Yb = 0.6 * x + c

    context.moveTo(x, Ya)
    context.lineTo(x, Yb)

    context.stroke()
  },

  subStr: function (context) {
    for (let x = 39; x <= 75; x += 5) {
      this.drawStr(context, x, 55, 10.8)
    }

    for (let x = 79; x <= 112; x += 5) {
      this.drawStr(context, x, 100, -35)
    }
  },

  subFull: function (context) {
    for (let x = 39; x <= 75; x++) {
      this.drawStr(context, x, 55, 10.8)
    }

    for (let x = 76; x <= 112; x++) {
      this.drawStr(context, x, 100, -35)
    }
  },
  changeFillsub: function (ctx, fill) {
    if (fill === 'full') {
      this.subFull(ctx)
    } else if (fill === 'stripes') {
      this.subStr(ctx)
    } else {

    }
  },
  /************************************
   rectengle
  ************************************/
  rectStr: function (context) {
    let x
    for (x = 37; x <= 112; x += 5) {
      context.moveTo(x, 10)
      context.lineTo(x, 56)
      context.stroke()
    }
  },
  rectFull: function (context) {
    let x
    for (x = 37; x <= 112; x++) {
      context.moveTo(x, 10)
      context.lineTo(x, 56)
      context.stroke()
    }
  },
  changeFillrect: function (ctx, fill) {
    if (fill === 'full') {
      this.rectFull(ctx)
    } else if (fill === 'stripes') {
      this.rectStr(ctx)
    } else {

    }
  },
  /************************************
   triangle
  ************************************/
  triStr: function (context) {
    let x
    for (x = 39; x <= 75; x += 5) {
      let Ya = -1.21 * x + 100.79

      context.moveTo(x, Ya)
      context.lineTo(x, 56)

      context.stroke()
    }

    for (x = 79; x <= 112; x += 5) {
      let Yc = 1.24 * x - 83.24

      context.moveTo(x, Yc)
      context.lineTo(x, 56)

      context.stroke()
    }
  },
  triFull: function (context) {
    let x
    for (x = 39; x <= 75; x++) {
      let Ya = -1.21 * x + 100.79

      context.moveTo(x, Ya)
      context.lineTo(x, 56)

      context.stroke()
    }

    for (x = 76; x <= 112; x++) {
      let Yc = 1.24 * x - 83.24

      context.moveTo(x, Yc)
      context.lineTo(x, 56)

      context.stroke()
    }
  },
  changeFilltri: function (ctx, fill) {
    if (fill === 'full') {
      this.triFull(ctx)
    } else if (fill === 'stripes') {
      this.triStr(ctx)
    } else {

    }
  },
  /**************************************
   changim
  *************************************/

  changeColor: function (context, color) {
    context.strokeStyle = color
    context.stroke()
  },

  changeFill: function (context, shape, fill) {
    if (shape === 'sub') {
      this.changeFillsub(context, fill)
    } if (shape === 'rect') {
      this.changeFillrect(context, fill)
    } if (shape === 'tri') {
      this.changeFilltri(context, fill)
    }
  },

  drawShape: function (ctx, shape) {
    if (shape === 'sub') {
      this.drawSub(ctx)
    } if (shape === 'rect') {
      this.drawRect(ctx)
    } if (shape === 'tri') {
      this.drawTri(ctx)
    }
  },

  copyShape: function (ctx1, ctx2, num) {
    let imgData = ctx1.getImageData(0, 0, 150, 66)

    if (num === 1) {
      ctx2.putImageData(imgData, 0, 66)
    } else if (num === 3) {
      ctx2.putImageData(imgData, 0, 0)
      ctx2.putImageData(imgData, 0, 66)
      ctx2.putImageData(imgData, 0, 132)
    } else {
      ctx2.putImageData(imgData, 0, 45)
      ctx2.putImageData(imgData, 0, 105)
    }
  }
}
