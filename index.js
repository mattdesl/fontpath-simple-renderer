var Base = require('fontpath-renderer')

function FontpathRenderer(options) {
    if (!(this instanceof FontpathRenderer))
        return new FontpathRenderer(options)
    options = options||{}
    Base.call(this, options.font, options.fontSize)

    if (typeof options.align === 'string')
        this.align = options.align
    if (typeof options.underline === 'boolean')
        this.underline = options.underline
    if (typeof options.underlineThickness === 'number')
        this.underlineThickness = options.underlineThickness
    if (typeof options.underlinePosition === 'number')
        this.underlinePosition = options.underlinePosition
    if (typeof options.text === 'string')
        this.text = options.text
    if (typeof options.wordwrap === 'string')
        this.wordwrap.mode = options.wordwrap
    if (typeof options.layout === 'number')
        this.layout(options.layout)
}

FontpathRenderer.prototype = Object.create(Base.prototype)
FontpathRenderer.constructor = FontpathRenderer
FontpathRenderer.Align = Base.Align

FontpathRenderer.prototype.renderGlyph = function(i, glyph, scale, x, y) {
    this.data.glyphs.push({
        glyph: glyph,
        charCode: this.text.charCodeAt(i),
        scale: [ scale, -scale ],
        position: [ x, y ],
        index: i
    })
}

FontpathRenderer.prototype.renderUnderline = function(x, y, width, height) {
    this.data.underlines.push({
        position: [ x, y ],
        size: [ width, height ]
    })
}

FontpathRenderer.prototype.render = function(x, y, start, end) {
    //new data for result
    this.data = {
        glyphs: [],
        underlines: []
    }
    Base.prototype.render.call(this, x, y, start, end)
    return this.data
}

module.exports = FontpathRenderer