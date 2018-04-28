// create a variable to hold our world object
var world;

// create variables to hold our markers
var markerHiro, markerZb;

let fontRussian;

let ryabImage01;

function preload()
{
  fontRussian = loadFont("fonts/russian.ttf");
  ryabImage01 = loadImage("images/RYAB_006.jpg");
}


function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');
  imageMode(CENTER);
  // grab a reference to our two markers that we set up on the HTML side (connect to it using its 'id')
  markerHiro = world.getMarker('hiro');
  markerZb = world.getMarker('zb');
}


function draw() {
  // erase the background
  world.clearDrawingCanvas();

  // use the markers as positional controllers
  if (markerHiro.isVisible() == true)
  {
    // get the position of this marker
    var hiroPosition = markerHiro.getScreenPosition();

    //HEBREW FAILS
    //text("יטרי בחטיבת הרובים " + zbPosition.x + ", " + zbPosition.y, zbPosition.x, zbPosition.y+50);
    text("hey!!!", hiroPosition.x, hiroPosition.y, hiroPosition.y+50);
    let s1 = new Slide(hiroPosition.x, hiroPosition.y, 294, 200, ryabImage01, "ENGLISH", "RUSSIAN", "HEBREW", 0);
    s1.display();
  }
}
class Slide
{
  constructor(x, y, width, height, img, English, Russian, Hebrew, index)
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.English = English;
    this.Russian = Russian;
    this.Hebrew = Hebrew;
  }
  display()
  {
    image(this.img, this.x, this.y, this.width, this.height);
  }
}
