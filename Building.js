class Building {
	constructor(x, y, w, h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.d = false;
	}
	
	Show(){
		if(!this.d){
			image(buildingImage,this.x,this.y,this.w,this.h);
		}else{
			image(buildingDestroyedImage,this.x,this.y,this.w,this.h);
		}
	}
}