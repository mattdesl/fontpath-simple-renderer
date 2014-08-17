var Renderer = require('../')
var Font = require('fontpath-test-fonts/lib/Alegreya-Regular.otf');
var decompose = require('fontpath-shape2d')

var renderer = Renderer({
    font: Font,
    align: Renderer.Align.RIGHT,
    text: 'lorem ipsum',
    fontSize: 100
})

var result = renderer.render(25, 25)


function draw(result) {
    if (!this.cache) 
        this.cache = {}


}