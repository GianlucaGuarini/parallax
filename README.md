
[![Build Status][travis-image]][travis-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Code Quality][codeclimate-image]][codeclimate-url]

# Why

> Oh no, why another parallax script? Do we really need it?

There are many parallax scripts but none of them was satisfying my personal needs:

  - No dependencies
  - No background positioning and heavy obtrusive DOM manipulations
  - Build only for modern devices without internal hacks
  - Modern and flexible api being thought mainly for ajax applications
  - Modern and clean ES6/2015 source code

So I decided to make my own and you can be free to use it or simply ignore it and move forward to the next one!

# Demos

  - [demo](http://gianlucaguarini.github.io/parallax/demo)

# Usage

## Installation

```sh
$ npm install scroll-parallax --save
# or
$ bower install scroll-parallax --save
```

## Markup and initialization

Once you have included the script in your page, you should wrap your parallax images in a wrapper having an `height`, `position:relative or absolute` and `overflow: hidden`
The images will be stretched to fit always the whole wrapper size

```html
<figure style="position: relative; height: 300px; overflow: hidden;">
  <img class="parallax" src="path/to/the/image.jpg" />
</figure>
```

The Parallax api is really simple and the following snippet should be enough:

```js
var p = new Parallax('.parallax').init()
```

## Options

The options available are only 4 at moment:

| Type    | Name            | Default Value   | Description                                                                                                                                                                         |
|-------- |---------------- |---------------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Number  | `offsetYBounds` | 50              | the offset top and bottom boundaries in pixels used by the parallax to consider an image in the viewport                                                                            |
| Number  | `intensity`     | 30              | the intensity of the parallax effect                                                                                                                                                |
| Number  | `center`        | 0.5             | the vertical center of the parallax. If you increase this value the image will be centered more on the top of the screen reducing it will look centered at bottom __this value should be between 0 and 1__ |
| Number  | `safeHeight`    | 0.15            | the safe image height gap value in percentage that ensures it can always properly parallax. Any image should be (by default) at least 15% higher than their DOM wrappers (7.5% bottom + 7.5% top) |

You can set the Parallax options in this way:

```js
var p = new Parallax('.parallax', {
  offsetYBounds: 50,
  intensity: 30,
  center: 0.5,
  safeHeight: 0.15
}).init()
```

Each image could be configured using custom Parallax options (except for the `offsetYBounds`) overriding the defaults:

```html
<figure>
  <img class="parallax" data-center="0.8" data-intensity="50" src="path/to/the/image.jpg" />
</figure>
<figure>
  <img class="parallax" data-center="0.2" data-intensity="10" data-safe-height="0.2" src="path/to/the/image.jpg" />
</figure>
```

## API

Each Parallax instance has some useful methods that could be used to adapt it to your application needs

### Parallax.init

Initialize the parallax internal event listeners. The listeners to `image:loaded` and `images:loaded` should be set before this method gets called

### Parallax.on

The `on` method allows you to listen the internal Parallax events from the outside.<br />
Currently it supports:
  - `image:loaded`: when a parallax image gets completely loaded
  - `images:loaded`: when all the images get loaded
  - `draw`: when a parallax image comes in the viewport and gets moved
  - `resize`: when the parallax images get resized
  - `update`: when the page is scrolling and the script has updated all the visible images

```js
p.on('image:loaded', function(image){
  // do something with the image tag
})
```

### Parallax.off

Stop listening an internal Parallax event

```js
var fn = function (image) {
    // do something with the image tag just drawn
    p.off('draw', fn) // stop listening the draw event
  }
p.on('draw', fn)
```

### Parallax.refresh

Refresh the position of the images visible in the viewport

```js
// do extremely heavy dom updates
p.refresh()
```

### Parallax.add

Add new images to the parallax instance

```js
// inject new images
p.add('.parallax-2')
```

### Parallax.remove

Remove images from the parallax instance

```js
p.remove('.parallax-2') // remove the images from the parallax
// and also from the DOM...
```

### Parallax.destroy

Destroy the parallax instance removing all the internal and external callbacks to its internal events

```js
p.destroy() // the parallax is dead!
```

# Contributing

## Available tasks

### Build and test
```shell
$ ./make # or also `$ npm run default`
```

### Convert the ES6 code into valid ES5 combining all the modules into one single file
```shell
$ ./make build # or also `$ npm run build`
```

### Run all the tests
```shell
$ ./make test # or also `$ npm run test`
```

### Start a nodejs static server
```shell
$ ./make serve # or also `$ npm run serve`
```

### To compile and/or test the project anytime a file gets changed
```shell
$ ./make watch # or also `$ npm run watch`
```

[travis-image]:https://img.shields.io/travis/GianlucaGuarini/parallax.svg?style=flat-square
[travis-url]:https://travis-ci.org/GianlucaGuarini/parallax

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE

[npm-version-image]:http://img.shields.io/npm/v/scroll-parallax.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/scroll-parallax.svg?style=flat-square
[npm-url]:https://npmjs.org/package/scroll-parallax

[coverage-image]:https://img.shields.io/coveralls/GianlucaGuarini/parallax/master.svg?style=flat-square
[coverage-url]:https://coveralls.io/r/GianlucaGuarini/parallax?branch=master

[codeclimate-image]:https://img.shields.io/codeclimate/github/GianlucaGuarini/parallax.svg?style=flat-square
[codeclimate-url]:https://codeclimate.com/github/GianlucaGuarini/parallax

