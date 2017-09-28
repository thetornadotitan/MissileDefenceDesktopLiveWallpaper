class Gun{

	constructor(x, y){
		this.pos = createVector(x, y);
		this.r = 128;
		this.fr = windowWidth/4;
		this.c = color(155);
		this.trg;
		this.hasFired = false;
	}
	
	Fire(){
		if(this.trg != null && this.hasFired === false){
			bullets.push(new Bullet(this.pos.x, this.pos.y, this.trg, this));
			this.hasFired = true;
		}
	}

	Update(){
		let d = 999999;
		let thisGun = this;
		missles.forEach(function(missle){
			let missleD = missle.pos.dist(thisGun.pos)
			if(missleD <= thisGun.fr){
				if(missleD < d){
					thisGun.trg = missle;
				}
			}
		});
	}
	
	Show(){
		push();
		stroke(this.c);
		fill(this.c);
		strokeWeight(this.r);
		point(this.pos.x, this.pos.y);
		pop();
	}
}