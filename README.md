# fontpath-simple-renderer

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This is a simplified wrapper for [fontpath-renderer](https://github.com/mattdesl/fontpath-renderer/) that doens't involve subclassing anything. This has a slight overhead of GC thrashing and doesn't allow you to render glyphs on demand (as they are being laid out) but the difference is negligible for most applications.

## Usage

[![NPM](https://nodei.co/npm/fontpath-simple-renderer.png)](https://nodei.co/npm/fontpath-simple-renderer/)

```js
var options = {
	font: MyFont,
	fontSize: 32,
	//etc..
}

var renderer = require('fontpath-simple-renderer')(options)

//we can set it up the same way as fontpath-renderer
renderer.wordwrap.mode = 'pre'
renderer.layout(250)

//renders glyphs and underline data into an object
var data = renderer.render(x, y, startIndex, endIndex)

//now let's draw the glyphs..
data.glyphs.forEach(function(item) {
	console.log( item.position, item.scale, item.index, item.glyph )
})

//and the underlines..
data.underlines.forEach(function(item) {
	console.log( item.position, item.size )
})
```


## License

MIT, see [LICENSE.md](http://github.com/mattdesl/fontpath-simple-renderer/blob/master/LICENSE.md) for details.
