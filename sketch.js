// create a variable to hold our world object
var world;

// create variables to hold our markers
var markerHiro, markerZb;

let fontRussian;

let ryabImage01;
var posLeftX, posRightX, posTranslateX;
var posLeftY, posRightY, posTranslateY;
var left,right,translate;
function preload()
{
  fontRussian = loadFont("fonts/russian.ttf");
  ryabImage01 = loadImage("images/RYAB_001.jpg");
  left = loadImage("images/left_button.png");
  right = loadImage("images/right_button.png");

}


function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');
  imageMode(CENTER);
  // grab a reference to our two markers that we set up on the HTML side (connect to it using its 'id')
  markerHiro = world.getMarker('hiro');
  markerZb = world.getMarker('zb');

  posLeftX = width/2-100;
	posLeftY = windowHeight-280;
	posRightX = width/2+100;
	posRightY = windowHeight-280;
	posTranslateX = width/2;
	posTranslateY = posLeftY;

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
  // left and right button
	imageMode(CENTER);
	image(left,posLeftX,posLeftY, 50, 50);
	image(right,posRightX,posRightY, 50, 50);

	//if(txt) text("sdhjkfaljdska",width/2,height/2);
}

function mousePressed() {
	if(dist(mouseX,mouseY,posLeftX,posLeftY) < 25) {
		// add code
	}

	if(dist(mouseX,mouseY,posRightX,posRightY) < 25) {
		// add code
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
