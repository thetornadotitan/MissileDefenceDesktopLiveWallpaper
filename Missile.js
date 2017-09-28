class Missle {
	constructor(x, target){
		this.building = target;
		this.alive = true;
		this.pos = createVector(x, 0);
		this.vel = createVector(0,0);
		this.acc = createVector(0,0);
		this.trg = createVector(target.x + target.w * 0.5, target.y + target.h);
		this.c = color(200, 10, 10);
		this.maxSpeed = missleSpeedBase + missleSpeedMod;
		this.maxForce = 0.3;
		this.r = 4
		this.trail = [];
		this.trail.push(this.pos.copy());
	}
	
	CalcForce(){
		let seek = this.Seek();

		//Apply weighted forces
		this.ApplyForce(seek);
	}
	
	ApplyForce(f){
		this.acc.add(f);
	}
	
	Seek(){
		let desired = p5.Vector.sub(this.trg, this.pos);
		desired.setMag(this.maxSpeed);
		let steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxForce);
		return steer;
	}
	
	Update(){
		this.CalcForce();
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
		
		this.trail.push(this.pos.copy());
		
		if(this.pos.dist(this.trg) < 15){
			this.building.d = true;
			this.alive = false;
			buildingsDestroyed++;
		}
	}
	
	Show(){
		push();
		stroke(this.c);
		fill(this.c);
		strokeWeight(this.r);
		point(this.pos.x, this.pos.y);
		strokeWeight(this.r * 0.6);
		for(let i = 1; i < this.trail.length; i++){
			line(this.trail[i-1].x, this.trail[i-1].y, this.trail[i].x, this.trail[i].y);
		}
		pop();
	}
}