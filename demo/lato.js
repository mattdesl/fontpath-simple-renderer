//get a test BMFont file / image
const font = require('bmfont-lato/64')
const datauri = require('bmfont-lato/image-uri')
const loadImage = require('img')
const bmfont2fontpath = require('fontpath-bmfont')
const createLayout = require('../')

//setup canvas 2D 
let context = require('2d-context')()
let canvas = context.canvas

//handle canvas resizing
let fit = require('canvas-fit')(canvas, window, window.devicePixelRatio)
let update = () => {
  fit()
  render()
}
window.addEventListener('resize', update, false)

//glyph texture atlas
let atlas = null
let copy = 'the quick\nbrown\n\nfox jumps over the\nlazy dog'
let glyphs, metrics

//on DOMReady....
require('domready')(() => {
  document.body.appendChild(canvas)
  document.body.style.background = '#1d1d1d'

  //start rendering when atlas image is loaded
  loadImage(datauri, (err, image) => {
    if (err) 
      throw err
    atlas = image
    start()
  })
})

function start() {
  //convert the BMFont spec to Fontpath spec
  //then setup a layout for our text
  metrics = createLayout({
    font: bmfont2fontpath(font),
    text: copy,
    align: 'right'
  })

  //lay out our glyphs..
  metrics.layout(300)
  
  let padding = 20

  //the origin (0, 0) is the baseline of the bottom-most
  //line of text in our box
  //so this pushes it down so we can render at top-left
  let y = metrics.getBounds().height
  let result = metrics.render(padding, y+padding)
  glyphs = result.glyphs

  //upadte canvas size then render
  update()
}

function render() {
  if (!atlas || !glyphs)
    return

  let { width, height } = canvas
  context.clearRect(0, 0, width, height)

  glyphs.forEach(item => {
    //get character ID of glyph
    let char = item.charCode
    //find the ID in the bitmap data set
    let bitmap = font.chars.filter(x => x.id === char)[0]
    if (!bitmap)
      return
  
    //render our bitmap glyph    
    let descender = metrics.getDescender() 
    let glyph = item.glyph
    let gWidth = bitmap.width
    let gHeight = bitmap.height

    //get position of glyph on screen
    let x = item.position[0] + glyph.hbx
    let y = item.position[1] + glyph.hby - descender
    context.drawImage(atlas, 
        bitmap.x, bitmap.y, 
        gWidth, gHeight,
        x, y, gWidth, gHeight)
  })
}