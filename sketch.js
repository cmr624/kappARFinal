// create a variable to hold our world object
var world;

// create variables to hold our markers
var markerHiro, markerZb;

let fontRussian;

let ryabImage01;
var posLeftX, posRightX, posTranslateX;
var posLeftY, posRightY, posTranslateY;
var left,right,translate;

var language = 0; // 0: EN, 1: RU, 2: HEB
var languages = ["ENG","RUS","HEB"]

let s1;
let plane;

function preload()
{
  fontRussian = loadFont("fonts/russian.ttf");
  ryabImage01 = loadImage("images/RYAB_001.jpg");
  left = loadImage("images/left_button.png");
  right = loadImage("images/right_button.png");
  translate = loadImage("images/translate_button.png");
}


function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');
  imageMode(CENTER);
  // grab a reference to our two markers that we set up on the HTML side (connect to it using its 'id')
  markerHiro = world.getMarker('hiro');
  markerZb = world.getMarker('zb');

  posLeftX = width/2 - (.19 * width);
	posLeftY = height-(.1 * height);
	posRightX = width/2 + (.19 * width);
	posRightY = height - (.1 * height);
	posTranslateX = width/2;
	posTranslateY = posLeftY;
  s1 = new Slide(0, 0, 294, 200, "ryab01", "ENGLISH", "RUSSIAN", "HEBREW", 0);

  //DATA
  english1 = "hey";
  plane = new Plane({
    x:3, y:0, z:-4, rotationX:-90, asset:"ryab01"
  });
  markerHiro.addChild(plane);
}


function draw() {
  // erase the background
  world.clearDrawingCanvas();

  // use the markers as positional controllers
  if (markerHiro.isVisible() == true)
  {
    var hiroPosition = markerHiro.getScreenPosition();
  }
  // left and right button
	imageMode(CENTER);
  //fuck this
	image(left,posLeftX,posLeftY, 50, 50);
	image(right,posRightX,posRightY, 50, 50);
	image(translate, posTranslateX, posTranslateY-5);

	fill(255);
	textSize(22);
	textAlign(CENTER);
	text(languages[language], posTranslateX,posTranslateY);

	if(changeLanguage == true) {
		changeLanguageTimer--;
		if(changeLanguageTimer < 0){
			changeLanguageTimer = 30;
			changeLanguage = false;
		}
	}

}

var changeLanguage = false;
var changeLanguageTimer = 30;

function mousePressed() {
	if(dist(mouseX,mouseY,posLeftX,posLeftY) < 25) {
		index--;

	}

	if(dist(mouseX,mouseY,posRightX,posRightY) < 25) {
		index++;

	}

	if(dist(mouseX,mouseY,posTranslateX,posTranslateY) < 80) {
		if(changeLanguage == false) {
			language += 1;
			if(language==3) language = 0;
			changeLanguage = true;
		}
	}


}
class Slide
{
  constructor(width, height, asset, English, Russian, Hebrew, index)
  {
    this.width = width;
    this.height = height;
    this.asset = asset;
    this.English = English;
    this.Russian = Russian;
    this.Hebrew = Hebrew;
  }
}
