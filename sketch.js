// create a variable to hold our world object
var world;

// create variables to hold our markers
var markerHiro, markerZb;

let fontRussian;

function preload()
{
  fontRussian = loadFont("fonts/russian.ttf");
}


function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to our two markers that we set up on the HTML side (connect to it using its 'id')
  markerHiro = world.getMarker('hiro');
  markerZb = world.getMarker('zb');
}


function draw() {
  // erase the background
  world.clearDrawingCanvas();

  // use the markers as positional controllers
  if (markerZb.isVisible() == true) {
    // get the position of this marker
    var zbPosition = markerZb.getScreenPosition();

    // draw an ellipse here
    fill(0,255,0);
    stroke(0);
    strokeWeight(5);
    ellipse( zbPosition.x, zbPosition.y, 50, 50 );
    strokeWeight(1);
    textFont(fontRussian);
    //RUSSIAN FAILS
    text("Евгения Самойловна Рябая родилась 6 марта 1919 года витута. После начала войны эвагом в госпитале" + zbPosition.x + ", " + zbPosition.y, zbPosition.x, zbPosition.y+50);
    //HEBREW FAILS
    //text("יטרי בחטיבת הרובים " + zbPosition.x + ", " + zbPosition.y, zbPosition.x, zbPosition.y+50);

  }

}
