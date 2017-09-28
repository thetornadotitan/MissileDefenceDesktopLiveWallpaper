let BG = 0;
let groundHeight = 55;
let groundColor = 44;
let buildingImage;
let buildingDestroyedImage;
let BuildingsDestroyed;
let city;
let missles;
let numMissles;
let numMisslesFired;
let maxMissles;
let missleSpeedBase;
let missleSpeedMod;
let misslesDestoryed;
let DebugDiv;
let gun1;
let gun2;
let gun3;
let bullets;

function preload() {
  buildingImage = loadImage("building.png");
  buildingDestroyedImage = loadImage("buildingDestroyed.png");
}

function setup(){
	background(0);
	createCanvas(windowWidth, windowHeight);
	DebugDiv = createDiv('');
	//Create Random City
	city = [];
	for(let i = 5; i < windowWidth - 5; i+=5){
		let thisWidth = random(25, 35);
		let thisHeight = random(35,60);
		city.push(new Building(i, windowHeight - groundHeight - thisHeight, thisWidth, thisHeight));
		i+=thisWidth;
	}
	
	//Create Guns
	bullets = [];
	gun1 = new Gun(windowWidth / 2, windowHeight - groundHeight);
	gun2 = new Gun(windowWidth * .11, windowHeight - groundHeight);
	gun3 = new Gun(windowWidth * .88, windowHeight - groundHeight);
	
	//Create Missles
	buildingsDestroyed = 0;
	misslesDestoryed = 0;
	missles = [];
	numMisslesFired = 1;
	maxMissles = 500;
	numMissles = 1;
	missleSpeedBase = 8;
	missleSpeedMod = 0;
	for(let i = 0; i < numMissles; i++){
		missles.push(new Missle(random(windowWidth), random(city)));
	}
}

function draw(){
	background(BG);
	
	
	push();
	stroke(0,150, 255);
	fill(0,150, 255);
	textSize(32);
	textAlign(LEFT, BASELINE);
	text(numMissles + " / " + maxMissles, 15, 34);
	text(numMisslesFired + " / " + (10 * pow(numMissles, 2)), windowWidth / 2 - 64, 34);
	textAlign(RIGHT, BASELINE);
	text(numMisslesFired + " / " + misslesDestoryed + " / " + buildingsDestroyed, windowWidth - 15, 34);
	pop();
	
	//BULLETS
	bullets.forEach(function(bullet){
		if(bullet.alive === true){
			bullet.Update();
			bullet.Show();
		}
	});
	
	for(let i = bullets.length-1; i >= 0; i--){
		if(bullets[i].alive === false){
			bullets.splice(i, 1);
		}
	}
	
	gun1.Update();
	gun1.Fire();
	gun1.Show();
	gun2.Update();
	gun2.Fire();
	gun2.Show()
	gun3.Update();
	gun3.Fire();
	gun3.Show()
	
	//MISSLES
	missles.forEach(function(missle){
		if(missle.alive === true){
			missle.Update();
			missle.Show();
		}
	});
	
	for(let i = missles.length-1; i >= 0; i--){
		if(missles[i].alive === false){
			missles.splice(i, 1);
		}
	}
	
	if (missles.length < numMissles){
		for (let i = numMissles - missles.length; i <= numMissles; i++){
			if (missles.length >= numMissles){
				break;
			}
			missles.push(new Missle(random(windowWidth), random(city)));
			numMisslesFired++;
			if(numMisslesFired >= (10 * pow(numMissles, 2))){
				numMissles++;
				missleSpeedMod++;
			}
			if(numMissles >= maxMissles){
				numMissles = maxMissles;
			}
			if(missleSpeedMod >= numMissles){
				missleSpeedMod = numMissles;
			}
		}
	}
	
	let buildingsAlive = 0;
	city.forEach(function(building){
		
		building.Show();
		//GameOver?
		if(building.d == false){
			buildingsAlive++;
		}
	});
	
	if(buildingsAlive === 0){
		setup();
	}
	
	//Draw Ground
	noStroke();
	fill(groundColor);
	rect(0, height-groundHeight, windowWidth, groundHeight);

	/*
	DebugDiv.html(
	"<h1>Framerate: " + floor(frameRate()) +"</h1>" +
	"<h1># of Missles: " + numMissles +"</h1>" +
	"<h1>% to next Missle " + numMisslesFired + " / " + (10 * pow(numMissles, 2)) + "</h1>"
	);
	*/
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
