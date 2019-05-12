//create main function
function init() {
	//define some variables and canvas
	var canvas = document.querySelector('canvas'); // reach html tag canvas
		//console.log(canvas);
	var ctx = canvas.getContext('2d'); // for drawing
	var canvasWidth = canvas.width; // reach width of canvas tag
	var canvasHeight = canvas.height; // reach height of canvas tag
	var background = "#c0ecfa";
	var centerX = canvasWidth/2 , centerY=canvasHeight/2;
	var sunColor = "#f5ca2a";
	var seaColor = "#02858b";
    var bubbleColor = "#1baeb2";
	var bubbles = [];
	var waves = [];
    var fishes =[];
	var rays =[];
    var X0,Y0;
    var color = 0; // for changing fish color
	var counter = 0; // for fish animation
	var count = 0; // for wave animation
//==============================================================================
	  ctx.fillStyle = background;
		ctx.fillRect(0,0,canvasWidth,canvasHeight);
		ctx.fill();

		animation(); //start the animation

//function to draw fish
function fish(X0,Y0)
{
	this.x0=X0;
	this.y0=Y0;

	this.drawRect = function() //draw all of fish body
	{
		ctx.beginPath();
		ctx.moveTo(this.x0,this.y0);
		ctx.lineTo(this.x0-8,this.y0+6);
		ctx.lineTo(this.x0,this.y0+12);
		ctx.lineTo(this.x0+8,this.y0+6);
		ctx.closePath();
		ctx.fill();
		this.drawTri();
	}

	this.drawTri = function() //draw fishtail
	{
		ctx.beginPath();
		ctx.moveTo(this.x0-8,this.y0+6);
		ctx.lineTo(this.x0-16,this.y0);
		ctx.lineTo(this.x0-16,this.y0+12);
		ctx.closePath();
		ctx.fill();
	}

	this.display = function() //changing color of fish
	{
		//hsl(hue,saturation,lightness)
		ctx.fillStyle = 'hsl('+ color++ +',100%,40%)';
		this.drawRect();
	}

	this.setReferencePoint = function(x0,y0) //centre of fish
	{
		this.X0 = x0-4;
		this.Y0 = y0+6;
	}
}

//==============================================================================
//function for draw sun
	function sun(x,y,radius)
	{
		this.x = x;
		this.y= y;
		this.radius = radius;
		this.radians = Math.random() * Math.PI*2;
				// this is getRandomInt(min,max) function
		this.distanceFromCenter = Math.floor(Math.random() * (50 - 10 + 1)) + 10;

		this.draw = function()
		{
			ctx.beginPath();
			ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false);
			ctx.fillStyle = sunColor;
			ctx.fill();
			//for circular motion
			this.radians +=0.05;
		    this.x = x + Math.cos(this.radians)*this.distanceFromCenter;
			this.y = y + Math.sin(this.radians)*this.distanceFromCenter;
		}

		this.setReferencePoint = function()
		{
			this.x0 = centerX;
			this.y0 = centerY;
		}
	}

//==============================================================================
	function sea() //drawing sea
	{
			ctx.beginPath();
			ctx.fillStyle=seaColor;
			ctx.fillRect(0,centerY,canvasWidth,centerY);
			ctx.fill();
	}

//==============================================================================
function bubble()
{
		this.x = Math.random()*750;
		this.y = 350 + Math.random()*230;
		this.radius = Math.random()*8;
		this.radians = 0;
		this.update = function()
		{
			this.radians += 0.05;
			this.y += Math.sin(this.radians);
			this.draw();
		}
		this.draw = function()
		{
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
			ctx.fillStyle = bubbleColor;
			ctx.fill();
		}
}

//==============================================================================
function wave(x,color)
{
		this.x = x;
		this.y = centerY;
		this.radius = 10;
		this.color = color;
		this.radians = Math.random() * Math.PI*1;
		this.distanceFromCenter = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
		this.update = function()
		{
			//for circular motion
			this.draw();
			this.radians +=0.05;
		    this.x = this.x0 + Math.cos(this.radians)*this.distanceFromCenter;
			this.y = this.y0 + Math.sin(this.radians)*this.distanceFromCenter;
			this.setReferencePoint();
		}
		
		this.draw = function()
		{
			ctx.beginPath();
			ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 1, true);
			ctx.fillStyle = this.color;
			ctx.fill();
		}

		this.setReferencePoint = function()
		{
			this.x0 = x;
			this.y0 = centerY;
		}

}

//==============================================================================
function animation()
{
	requestAnimationFrame(animation);
    ctx.fillStyle = 'rgba(192,236,250,0.05)';
	ctx.fillRect(0,0,canvasWidth,canvasHeight);

  //create sun particuls
	for (let i = 0; i<100; i++)
	{
		rays.push(new sun(centerX,150,4));
		rays[i].draw();
	}

	//create sea, bubbles in sea,sea's waves
	var Sea = new sea(); // create sea

	for (let i=0; i<20; i++) //create bubles
	{
		bubbles.push(new bubble());
		bubbles[i].update();
	}

	for(let i=0;i<30;i++) // create waves
	{
		waves.push(new wave(count,seaColor));
		waves[i].update();
		count +=Math.random()*60;
	}

	//create fishes
	var fish0 = new fish(150+counter,450);
	fish0.display();
	fish0.setReferencePoint(150+counter,450);
	fishes.push(fish0);

	var fish1 = new fish(fish0.X0-30-12,fish0.Y0-30-12);
	fish1.display();
	fish1.setReferencePoint(fish0.X0-30-12,fish0.Y0-30-6);
	fishes.push(fish1);

	var fish2 = new fish(fish0.X0-30-12,fish0.Y0+30+6);
	fish2.display();
	fish2.setReferencePoint(fish0.X0-30-12,fish0.Y0+30+12);
	fishes.push(fish2);

	var fish3 = new fish(fish1.X0-30-12,fish1.Y0-30-12);
	fish3.display();
	fishes.push(fish3);

	var fish4 = new fish(fish1.X0-30-12,fish1.Y0+30);
	fish4.display();
	fishes.push(fish4);

	var fish5 = new fish(fish2.X0-30-12,fish2.Y0+30+6);
	fish5.display();
	fishes.push(fish5);

	150+counter<950?counter+=2.3:counter=-10; //fish move
}
}
