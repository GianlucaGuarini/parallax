/* global Parallax */
describe('Core', function() {

  this.timeout(5000)

  const PLACEHOLDER_IMAGE_URL = 'base/demo/img1.jpg'

  var container = document.createElement('div'),
    addImage = () => {
      var img = new Image(),
        figure = document.createElement('figure')

      img.src = `${PLACEHOLDER_IMAGE_URL}?${Math.random()}`
      img.className = 'parallax'
      figure.appendChild(img)
      figure.style.top = `${Math.random() * 100}px`
      figure.style.left = '0'
      figure.style.position = 'relative'
      figure.style.overflow = 'hidden'
      figure.style.display = 'block'
      figure.style.width = `${Math.random() * 20}%`
      figure.style.margin = '0'
      figure.style.height = '400px'
      container.appendChild(figure)
    },
    p

  before(() => {
    document.body.appendChild(container)
  })

  beforeEach(() => {
    var i = 2
    while (i --) {
      addImage()
    }
  })

  afterEach(() => {
    if (p) p.destroy()
    container.innerHTML = ''
  })

  it('Parallax exsists', () => expect(Parallax).is.not.undefined)

  it('It can be correctly initialized', () => {
    p = new Parallax('.parallax').init()
    expect(p.canvases).to.have.length(2)
  })

  it('It can be initialized also using a nodesList', () => {
    p = new Parallax(document.querySelectorAll('.parallax')).init()
    expect(p.canvases).to.have.length(2)
  })

  it('The "image:loaded", "images:loaded", "draw","resize" events get called', (done) => {
    var imagesLoaded = sinon.spy(),
      resize = sinon.spy(),
      draw = sinon.spy()

    p = new Parallax('.parallax')

    p.on('image:loaded', imagesLoaded)
    p.one('draw', draw)
    p.one('resize', resize)

    p.on('images:loaded', () => {

      p.resize({width: 300, height: 300})
      p.resize({width: 500, height: 500})
      p.scroll(300)
      expect(imagesLoaded).to.have.callCount(2)
      expect(draw).to.have.callCount(1)
      expect(resize).to.have.callCount(1)
      done()

    })

    p.init()

  })

  it('the Parallax.remove event removes the right amount of items', () => {

    p = new Parallax('.parallax').init()
    p.remove('figure:first-of-type .parallax')
    expect(p.canvases).to.have.length(1)
    p.remove(document.querySelectorAll('.parallax'))
    expect(p.canvases).to.have.length(0)

  })


})