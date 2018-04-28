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

let s1, s2, s3, s4;
let plane;
let index;
let slideArr = [];
let currentSlide;
let s1English, s1Russian, s1Hebrew, s2English, s2Russian, s2Hebrew, s3English, s3Russian, s3Hebrew, s4English, s4Russian, s4Hebrew;

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
	posLeftY = height-(.05 * height);
	posRightX = width/2 + (.19 * width);
	posRightY = height - (.05 * height);
  posTextBoxX = width/2;
  posTextBoxY = height - (.1*height);
	posTranslateX = width/2;
	posTranslateY = posLeftY;
  s1English = "\t\tEvgeniya Samoilovna Ryabaya was born on March 6, 1919, in Ribnita, Moldova. Having completed two years of medical school in Dnipropetrovsk by the time the war erupted, she evacuated to Sverdlovsk [Yekaterinburg], continued her studies, and began working as a surgeon.";
  s1Russian = "\t\t";
  s1Hebrew = "\t\t";

  s2English = "\t\tShe was drafted in 1942 and served in the medical-sanitary battalion in the 183rd Rifle Division of the 38th Army. Ryabaya performed amputations and other surgeries in dugouts and in tents at the Battle of Kursk, near Kharkiv, in western Ukraine, and in Poland. Here she is pictured with fellow field hospital medics of the 183rd Rifle Division. According to a later inscription on the back, the photograph was taken at the 4th Ukrainian Front.";
  s2Russian = "\t\t";
  s2Hebrew = "\t\t";

  s3English = "\t\tRyabaya participated in many battles throughout the duration of World War II. Here is a hand-drawn combat map of the battle dates and locations of Ryabaya's unit, the 183rd Rifle Division. Notice how the map traces a path from Riga to Kiev, and ends at Prague in June of 1945.";
  s3Russian = "\t\t";
  s3Hebrew = "\t\t";

  s4English = '\t\tRyabaya received medals "For Courage," “Order of the Red Star”, and “Order of the Patriotic War 2nd Class”. Upon enduring a concussion at the close of the war, she returned to Ukraine, where she managed internal medicine and cardiology wards before emigrating to the United States. Pictured here is a newspaper article entitled “Women and War” published in the Russian-language American newspaper "Forum.” Here, Ryabaya speaks personally about her experiences as a female soldier in World War II.';
  s4Russian = "\t\t";
  s4Hebrew = "\t\t";

  s1 = new Slide(3.04, 4.84, "ryab01", s1English, s1Russian, s1Hebrew, 0);
  slideArr.push(s1);

  s2 = new Slide(4.63, 3.01, "ryab02", s2English, s2Russian, s2Hebrew, 1);
  slideArr.push(s2);

  s3 = new Slide(4.95, 3.37, "ryab03", s3English, s3Russian, s3Hebrew, 2);
  slideArr.push(s3);

  s4 = new Slide(3.37, 5.17, "ryab04", s4English, s4Russian, s4Hebrew, 3);
  slideArr.push(s4);

  index = 0;
  currentSlide = slideArr[index];
  //DATA
  plane = new Plane({
    x:3, y:0, z:-4, rotationX:-90, width: currentSlide.width, height: currentSlide.height, asset:currentSlide.asset
  });
  markerHiro.addChild(plane);
}


function draw() {
  // erase the background
  world.clearDrawingCanvas();

  // use the markers as positional controllers
  if (markerHiro.isVisible() == true)
  {
    noStroke();
    rectMode(CENTER);
    textSize(15);

    rect(posTextBoxX, posTextBoxY, .55 * width, .4 * height, 15);

    fill(0);
    textAlign(LEFT);
    text(currentSlide.currentLang, width/2, .888 * height, 400, 200);
    imageMode(CENTER);
    //fuck this

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




	if(changeLanguage == true) {
		changeLanguageTimer--;
		if(changeLanguageTimer < 0){
			changeLanguageTimer = 15;
			changeLanguage = false;
		}
	}

}

var changeLanguage = false;
var changeLanguageTimer = 15;
var leftPressed = false;
var rightPressed = false;

function change()
{
  markerHiro.removeChild(plane);
  currentSlide = slideArr[index];
  plane = new Plane({
    x:3, y:0, z:-4, rotationX:-90, width: currentSlide.width, height: currentSlide.height, asset:currentSlide.asset
  });
  markerHiro.addChild(plane);

}
function mousePressed() {
	if(dist(mouseX,mouseY,posLeftX,posLeftY) < 25) {
    if(!leftPressed) {
  		index--;
      if (index < 0)
      {
        index = 3;
      }
      change();
      currentSlide.determineLanguage();
    }

    if(!leftPressed) leftPressed = true;
    else leftPressed = false;
	}

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

	if(dist(mouseX,mouseY,posTranslateX,posTranslateY) < 80) {
		if(changeLanguage == false) {
			language += 1;
			if(language==3) language = 0;
			changeLanguage = true;
		}
    currentSlide.determineLanguage();
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
    this.currentLang = English;
  }

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
