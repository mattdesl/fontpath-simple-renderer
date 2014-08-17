# fontpath-simple-renderer

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This is a generic module that various render engines (GL, canvas, etc) can use to draw fontpath glyphs to the screen. Most users are encouraged to use the higher level modules, [fontpath-canvas](https://github.com/mattdesl/fontpath-canvas) for 2D canvas, [fontpath-gl](https://github.com/mattdesl/fontpath-gl) for WebGL.

## Usage

[![NPM](https://nodei.co/npm/fontpath-simple-renderer.png)](https://nodei.co/npm/fontpath-simple-renderer/)

```js
var options = {
	font: MyFont,
	fontSize: 32,
	//etc..
}

var renderer = require('fontpath-simple-renderer')(options)

//set up some parameters
renderer.align = 'right'
renderer.wordwrap.mode = 'pre'
renderer.layout(250)

//renders glyphs and underline data
var result = renderer.render(x, y, startIndex, endIndex)

//handle underlines
result.underlines.forEach(function(item) {
	console.log( item.position, item.size )
})

//handle glyphs
result.glyphs.forEach(function(item) {
	//	draw/manipulate the glyph data
	console.log( item.index, item.position, item.scale, item.glyph, item.charCode )
})
```

### `renderer = Renderer([options])`

Creates a new renderer with the given options. These are not necessary.

Possible options:
- `font`: the Font object
- `fontSize`: the font size in pixels, defaults to what is defined in `font`
- `text`: the string of text we will be rendering
- `layout`: an initial number for wrap width (pixels) if we want to word-wrap the text, 
otherwise just lays the text out in a single line (no breaks)
- `align`: a string 'left', 'center', 'right' (also stored in `Renderer.Align` constants), default left
- `underline`: boolean, whether to underline, default false
- `underlinePosition`: the position of underline, leave undefined to compute automatically
- `underlineThickness`: the underline thickness, leave undefined to compute automatically
- `wordwrap`: same as setting `renderer.wordwrap.mode`, can be `normal`, `pre`, or `nowrap`

### `renderer.render(x, y, start, end)`

"Renders" the text and returns a `data` object with `underlines` and `glyphs` information:

```js
{
	underlines: [
		{ position: [x,y], size: [width,height] },
		//etc...
	],
	glyphs: [
		{ 
			charCode: 40,
			position: [x,y], 
			index: i, //character index in 'text' string
			scale: [x,y],
			glyph: glyphData //contains fontpath glyph data
		},
		//etc..
	]
}
```

The `x` and `y` parameters default to zero. The `start` and `end` indices allow you to control how much of the layout to draw; this is useful for styling or adding underlines to specific words. It will draw the glyphs within the given indices (start inclusive, end exclusive) as they would sit if the whole layout was rendered. If unspecified, the whole string is rendered.

### `renderer.clearLayout()`

Clears the current layout. The next render will draw all glyphs as if they are on a single line (no line breaks). This occurs whenever you change font, font size, or text.

### `renderer.layout(wrapWidth)`

Forces a new word wrap layout. This should be called after the layout has been cleared, and before rendering. It uses the current settings from the `renderer.wordwrap` instance. 

### `renderer.getBounds([includeUnderline, out])`

Gets the `{ x, y, width, height}` bounds of the current text layout. The height does not extend past the baseline of the last line unless `includeUnderline` is true, in which case the underline's position and height is included in the calculation. 

The bounding y position is offset so that the box has an upper-left origin, for parity with HTML5 canvas rendering.

If `out` is specified, it will re-use that object, otherwise it will create a new one.

### `renderer.getDescender()`

Utility method to get the font's descender.

### `renderer.getAscender()`

Utility method to get the font's ascender.

## members

### `renderer.font`
### `renderer.fontSize`
### `renderer.text`

Some font, font size and text parameters. Changing these values will clear the current layout.

### `renderer.underline` (bool)
### `renderer.underlinePosition` (number, in pixels)
### `renderer.underlineThickness` (number, in pixels)

Some underline parameters. If position or thickness is undefined, they will be computed automatically based on font information.

### `renderer.wordwrap` 

An instance of [fontpath-wordwrap](https://github.com/mattdesl/fontpath-wordwrap) which controls how layout is done.

### `renderer.align`

A string which indicates the align mode; left, right, or center. Can also reference `Renderer.Align.LEFT`, `Renderer.Align.CENTER`, and `Renderer.Align.RIGHT`.

# Note on `fontpath-renderer`

This is a simplified wrapper for [fontpath-renderer](https://github.com/mattdesl/fontpath-renderer/) that doens't involve subclassing anything. This has a slight overhead of GC thrashing and doesn't allow you to render glyphs on demand (as they are being laid out) but the difference is negligible for most applications.

It's encouraged that implementations use this over the low-level fontpath-renderer module. 

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/fontpath-simple-renderer/blob/master/LICENSE.md) for details.
