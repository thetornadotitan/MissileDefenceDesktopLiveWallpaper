class Bullet extends Missle{
	constructor(x, y, target, shooter){
		super(x, target);
		this.shooter = shooter;
		this.pos.set(x, y);
		this.trg = target;
		this.c = color(50, 150, 150);
		this.maxSpeed = missleSpeedBase + missleSpeedMod + 10;
		this.maxForce = 1;
		this.trail = [];
		this.trail.push(this.pos.copy());
	}
	
	Update(){
		this.CalcForce();
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
		
		this.trail.push(this.pos.copy());
		
		if(this.trg.alive == false){
			this.alive = false;
			this.shooter.hasFired = false;
		}
		
		if(this.pos.dist(this.trg.pos) < 15){
			this.trg.alive = false;
			this.alive = false;
			this.shooter.hasFired = false;
			misslesDestoryed++;
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
	
	Seek(){
		let desired = p5.Vector.sub(this.trg.pos, this.pos);
		let dis = desired.mag();
		let speed;
		if(dis <= 400){
			speed = map(dis, 0, 400, missleSpeedBase + missleSpeedMod + 3, this.maxSpeed);
		}else{
			speed = this.maxSpeed;
		}
		desired.setMag(speed);
		let steer = p5.Vector.sub(desired, this.vel);
		//steer.limit(this.maxForce);
		return steer;
	}
}