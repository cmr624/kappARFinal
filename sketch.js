var world;
var markerHiro, markerZb;

let ryabImage01;
var posLeftX, posRightX, posTranslateX;
var posLeftY, posRightY, posTranslateY;
var left,right,translate;

var language = 0; // 0: EN, 1: RU, 2: HEB
var languages = ["ENG","RUS","HEB"]

let s1, s2, s3, s4;
//3D plane object that contains the asset
let plane;

//global index for the slide array
let index;

//holds all the slides in the world
let slideArr = [];
let currentSlide;
//english strings (russian and hebrew get initialized in the index.html)
let s1English, s2English, s3English, s4English;

//preload assets
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

  //"responsive"
  posLeftX = width/2 - (.19 * width);
	posLeftY = height-(.05 * height);
	posRightX = width/2 + (.19 * width);
	posRightY = height - (.05 * height);
  posTextBoxX = width/2;
  posTextBoxY = height - (.1*height);
	posTranslateX = width/2;
	posTranslateY = posLeftY;

  //initialize
  s1English = "\t\tEvgeniya Samoilovna Ryabaya was born on March 6, 1919, in Ribnita, Moldova. Having completed two years of medical school in Dnipropetrovsk by the time the war erupted, she evacuated to Sverdlovsk [Yekaterinburg], continued her studies, and began working as a surgeon.";
  s2English = "\t\tRyabaya was drafted in 1942 and served in the medical-sanitary battalion in the 183rd Rifle Division of the 38th Army (Pictured here). She performed amputations and other surgeries in dugouts and in tents at the Battle of Kursk, near Kharkiv, in western Ukraine, and in Poland."
  s3English = "\t\tRyabaya participated in many battles throughout the duration of World War II. Here is a hand-drawn combat map of the battle dates and locations of Ryabaya's unit, the 183rd Rifle Division. Notice how the map traces a path from Riga to Kiev, and ends at Prague in June of 1945.";
  s4English = '\t\tUpon enduring a concussion at the close of the war, Ryabaya returned to Ukraine, and later emigrated to the United States. Pictured here is a newspaper article entitled \"Women and War\" published in the Russian-language American newspaper \"Forum.\"';

  //initialize the slides & push them into the global slide array
  s1 = new Slide(3.04, 4.84, "ryab01", s1English, s1Russian, s1Hebrew, "https://bafdigital.org/item/13654");
  slideArr.push(s1);
  s2 = new Slide(4.63, 3.01, "ryab02", s2English, s2Russian, s2Hebrew, "https://bafdigital.org/item/13656");
  slideArr.push(s2);
  s3 = new Slide(4.95, 3.37, "ryab03", s3English, s3Russian, s3Hebrew, "https://bafdigital.org/item/13659");
  slideArr.push(s3);
  s4 = new Slide(3.37, 5.17, "ryab04", s4English, s4Russian, s4Hebrew, "https://bafdigital.org/item/13658");
  slideArr.push(s4);

  //initialize the index and hte current slide
  index = 0;
  currentSlide = slideArr[index];
  //create a new plane with the current slide, and add it to the marker.
  //((3,0,4) was the specified location from our subject matter expert, Rachel)
  plane = new Plane({
    x:3,
    y:0,
    z:-4,
    rotationX:-90,
    width: currentSlide.width,
    height: currentSlide.height,
    asset:currentSlide.asset,
    //click function -> as specified by Rachel
    clickFunction: function() { open(currentSlide.url);}
  });
  markerHiro.addChild(plane);
}


function draw() {
  // erase the background
  world.clearDrawingCanvas();

  //only show UI when you can see the marker
  if (markerHiro.isVisible() == true)
  {
    //create UI, basic 2d processing stuff
    noStroke();
    rectMode(CENTER);
    textSize(15);
    fill(255, 150);
    rect(posTextBoxX, posTextBoxY, .55 * width, .5 * height, 15);

    fill(0);
    textAlign(LEFT);
    //textbox
    text(currentSlide.currentLang, width/2, .85 * height, 400, 200);
    imageMode(CENTER);
    fill(255);
    //UI buttons
    image(left,posLeftX,posLeftY, 50, 50);
    image(right,posRightX,posRightY, 50, 50);
    image(translate, posTranslateX, posTranslateY-5);
    fill(255);
  	textSize(22);
  	textAlign(CENTER);
  	text(languages[language], posTranslateX,posTranslateY);
    var hiroPosition = markerHiro.getScreenPosition();
  }
  // left and right button
  //change the language after a timer (gets around a mousePressed bug)
	if(changeLanguage == true) {
		changeLanguageTimer--;
		if(changeLanguageTimer < 0){
			changeLanguageTimer = 15;
			changeLanguage = false;
		}
	}

}
//make the above work...
var changeLanguage = false;
var changeLanguageTimer = 15;
var leftPressed = false;
var rightPressed = false;

//change function
//basically, if we change, we change the index in the array and create a new plane, delete the old one, etc.
function change()
{
  markerHiro.removeChild(plane);
  currentSlide = slideArr[index];
  plane = new Plane({
    x:3, y:0, z:-4, rotationX:-90, width: currentSlide.width, height: currentSlide.height, asset:currentSlide.asset, clickFunction: function() { open(currentSlide.url)}
  });
  markerHiro.addChild(plane);
}

//click buttons functions
function mousePressed()
{
  //left button, decrement the index and implement wrap around
	if(dist(mouseX,mouseY,posLeftX,posLeftY) < 25)
  {
    if(!leftPressed) {
  		index--;
      if (index < 0)
      {
        index = 3;
      }
      change();
      //figure out what language we're at
      currentSlide.determineLanguage();
    }

    if(!leftPressed) leftPressed = true;
    else leftPressed = false;
	}
  //same with right
	if(dist(mouseX,mouseY,posRightX,posRightY) < 25) {
      if(!rightPressed) {
    		index++;
        if (index > 3)
        {
          index = 0;
        }
        change();
        currentSlide.determineLanguage();
      }
      if(!rightPressed) rightPressed = true;
      else rightPressed = false;
	}
//translate button
	if(dist(mouseX,mouseY,posTranslateX,posTranslateY) < 80) {
		if(changeLanguage == false) {
			language += 1;
			if(language==3) language = 0;
			changeLanguage = true;
		}
    currentSlide.determineLanguage();
	}


}
//slide class, basic object to hold all our data
class Slide
{
  constructor(width, height, asset, English, Russian, Hebrew, url)
  {
    this.width = width;
    this.height = height;
    this.asset = asset;
    this.English = English;
    this.Russian = Russian;
    this.Hebrew = Hebrew;
    this.currentLang = English;
    this.url = url;
  }
  //basically just chang ethe current language to match the environment's current language within the object
  //this allows it to always display the language that is displaying on the button (using the lang array)
  determineLanguage(){
    var curr = languages[language];
    if(curr === "ENG"){
      this.currentLang = this.English;
    }else if (curr === "RUS"){
      this.currentLang = this.Russian;
    } else if (curr === "HEB"){
      this.currentLang = this.Hebrew;
    }
  }
}
