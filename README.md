[demo](demo)

# Why

> Oh no, why another parallax library? Do we really need it?

There are many parallax scripts but none of them was satisfying my personal needs:

  - No dependencies
  - No background positioning, they cause weird scroll issues on safari
  - Modern and flexible api

So I decided to make my own, and you can be free to use it or simply ignore it!

# Usage

Once you have included the script in your page, you should wrap your parallax images in a wrapper

```html
<div style="position: relative; height: 300px; overflow: hidden;">
  <img class="parallax" src="path/to/the/image.jpg" />
</div>
```

The Parallax api is really simple and the following snippet should be enough:

```js
var p = new Parallax('.parallax').init()
```

## API

Each Parallax instance has some useful methods that could be used to adapt it to your application needs

### Parallax.on

The `on` method allows you to listen the internal Parallax events from the outside.<br />
Currently it supports:
  - `image:loaded`: when a parallax image gets completely loaded
  - `images:loaded`: when all the images get loaded
  - `draw`: when a parallax image comes in the viewport and gets moved
  - `resize`: when the parallax images get resized

```js
var p = new Parallax('.parallax')
p.on('image:loaded', function(image){
  // do something with the image tag
})
p.init()
```

### Parallax.off

Stop listening an internal Parallax event

```js
var p = new Parallax('.parallax'),
  fn = function (image) {
    // do something with the image tag just drawn
    p.off('draw', fn) // stop listening the draw event
  }
p.on('draw', fn)
p.init()
```

### Parallax.refresh

Refresh the position of the images visible in the viewport

```js
var p = new Parallax('.parallax').init()
// do extremely heavy dom updates
p.refresh()
```

### Parallax.add

Add new images to the parallax instance

```js
var p = new Parallax('.parallax').init()
// inject new images
p.add('.parallax-2')
```

### Parallax.remove

Remove images from the parallax instance

```js
var p = new Parallax('.parallax').init()
p.remove('.parallax-2') // remove the images from the parallax
// and also from the DOM...
```

### Parallax.destroy

Destroy the parallax instance removing all the internal and external callbacks to its internal events

```js
var p = new Parallax('.parallax').init()
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

