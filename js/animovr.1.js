// 	animovr: objects for 2D sprite animation
// 	Ralph Gonzalez 2011
// 	
// 	Usage:
// 		Place these elements in your web page:
// 		
// 		  	<script type="text/javascript">
//   			window.onload = function() {
// 	  				anomovr.init('json/mySprites.json');
//     			}
//   		</script>
// 			...
// 			<div id="film" style="position:absolute;overflow:hidden;left:20;top:100;width:600px;height:300px">
// 			</div>
//
// 		Create mySprites.json cfg file, specifying id of the tag which will serve as the container, in this case 'film'.
// 		This document will define the sprites: image files and motion profiles.

var animovr = (function() { // create a closure for namespacing and private members

	var sprites = [];
	var maxActive = 1;
	var animationInterval = 1;
	var frameRate = 1;
	var nActive = 0;
	var nImagesLoaded = 0;
	var film;
	var t = 0; // global number of animation intervals

	// reduce overhead of sin() calls
	var sinData = [0.0000,0.0175,0.0349,0.0523,0.0698,0.0872,0.1045,0.1219,0.1392,0.1564,0.1736,0.1908,0.2079,0.2250,0.2419,0.2588,0.2756,0.2924,0.3090,0.3256,0.3420,0.3584,0.3746,0.3907,0.4067,0.4226,0.4384,0.4540,0.4695,0.4848,0.5000,0.5150,0.5299,0.5446,0.5592,0.5736,0.5878,0.6018,0.6157,0.6293,0.6428,0.6561,0.6691,0.6820,0.6947,0.7071,0.7193,0.7314,0.7431,0.7547,0.7660,0.7771,0.7880,0.7986,0.8090,0.8192,0.8290,0.8387,0.8480,0.8572,0.8660,0.8746,0.8829,0.8910,0.8988,0.9063,0.9135,0.9205,0.9272,0.9336,0.9397,0.9455,0.9511,0.9563,0.9613,0.9659,0.9703,0.9744,0.9781,0.9816,0.9848,0.9877,0.9903,0.9925,0.9945,0.9962,0.9976,0.9986,0.9994,0.9998,1.0000,0.9998,0.9994,0.9986,0.9976,0.9962,0.9945,0.9925,0.9903,0.9877,0.9848,0.9816,0.9781,0.9744,0.9703,0.9659,0.9613,0.9563,0.9511,0.9455,0.9397,0.9336,0.9272,0.9205,0.9135,0.9063,0.8988,0.8910,0.8829,0.8746,0.8660,0.8572,0.8480,0.8387,0.8290,0.8192,0.8090,0.7986,0.7880,0.7771,0.7660,0.7547,0.7431,0.7314,0.7193,0.7071,0.6947,0.6820,0.6691,0.6561,0.6428,0.6293,0.6157,0.6018,0.5878,0.5736,0.5592,0.5446,0.5299,0.5150,0.5000,0.4848,0.4695,0.4540,0.4384,0.4226,0.4067,0.3907,0.3746,0.3584,0.3420,0.3256,0.3090,0.2924,0.2756,0.2588,0.2419,0.2250,0.2079,0.1908,0.1736,0.1564,0.1392,0.1219,0.1045,0.0872,0.0698,0.0523,0.0349,0.0175,0.0000,-0.0175,-0.0349,-0.0523,-0.0698,-0.0872,-0.1045,-0.1219,-0.1392,-0.1564,-0.1736,-0.1908,-0.2079,-0.2250,-0.2419,-0.2588,-0.2756,-0.2924,-0.3090,-0.3256,-0.3420,-0.3584,-0.3746,-0.3907,-0.4067,-0.4226,-0.4384,-0.4540,-0.4695,-0.4848,-0.5000,-0.5150,-0.5299,-0.5446,-0.5592,-0.5736,-0.5878,-0.6018,-0.6157,-0.6293,-0.6428,-0.6561,-0.6691,-0.6820,-0.6947,-0.7071,-0.7193,-0.7314,-0.7431,-0.7547,-0.7660,-0.7771,-0.7880,-0.7986,-0.8090,-0.8192,-0.8290,-0.8387,-0.8480,-0.8572,-0.8660,-0.8746,-0.8829,-0.8910,-0.8988,-0.9063,-0.9135,-0.9205,-0.9272,-0.9336,-0.9397,-0.9455,-0.9511,-0.9563,-0.9613,-0.9659,-0.9703,-0.9744,-0.9781,-0.9816,-0.9848,-0.9877,-0.9903,-0.9925,-0.9945,-0.9962,-0.9976,-0.9986,-0.9994,-0.9998,-1.0000,-0.9998,-0.9994,-0.9986,-0.9976,-0.9962,-0.9945,-0.9925,-0.9903,-0.9877,-0.9848,-0.9816,-0.9781,-0.9744,-0.9703,-0.9659,-0.9613,-0.9563,-0.9511,-0.9455,-0.9397,-0.9336,-0.9272,-0.9205,-0.9135,-0.9063,-0.8988,-0.8910,-0.8829,-0.8746,-0.8660,-0.8572,-0.8480,-0.8387,-0.8290,-0.8192,-0.8090,-0.7986,-0.7880,-0.7771,-0.7660,-0.7547,-0.7431,-0.7314,-0.7193,-0.7071,-0.6947,-0.6820,-0.6691,-0.6561,-0.6428,-0.6293,-0.6157,-0.6018,-0.5878,-0.5736,-0.5592,-0.5446,-0.5299,-0.5150,-0.5000,-0.4848,-0.4695,-0.4540,-0.4384,-0.4226,-0.4067,-0.3907,-0.3746,-0.3584,-0.3420,-0.3256,-0.3090,-0.2924,-0.2756,-0.2588,-0.2419,-0.2250,-0.2079,-0.1908,-0.1736,-0.1564,-0.1392,-0.1219,-0.1045,-0.0872,-0.0698,-0.0523,-0.0349,-0.0175];
    function sin2(x) {
        //return Math.sin(x * Math.PI / 180.0);
        if (x < 0) x = 180.0 - x;
        return sinData[Math.round(x) % 360];
    }
    function cos2(x) {
        return sin2(x + 90.0);
    }
    
    ////////////////// Class: RNG - seedable, one-shot pseudo random number //////////////////////
	// Adapted from http://stackoverflow.com/questions/424292/how-to-create-my-own-javascript-random-number-generator-that-i-can-also-set-the
	function RNG(seed) {
  		// LCG using GCC's constants
  		var m = 0x100000000; // 2**32;
  		var a = 1103515245;
  		var c = 12345;
  		var r = (a * seed + c) % m;
  		return r / (m - 1);
	}

	////////////////// Class: Motion -- recursive animation functions //////////////////////
	function Motion (animationData) {
		this.prevT = 0;
		this.cumRandomBearing = 0;
		
		if (animationData == null) {
			this.f = null;
		} else if (typeof(animationData) != 'object') {
			this.k = parseFloat(animationData);
			this.f = Motion.prototype.constFunc;
		} else if (animationData.type == "sin") { // sin(angle)
			this.angleFunc = new Motion(animationData.angle);
			this.f = Motion.prototype.sinFunc;
		} else if (animationData.type == "cos") { // cos(angle)
			this.angleFunc = new Motion(animationData.angle);
			this.f = Motion.prototype.cosFunc;
		} else if (animationData.type == "time") { // t
			this.f = Motion.prototype.timeFunc;
		} else if (animationData.type == "random") { // random number
			this.f = Motion.prototype.randomFunc;
		} else if (animationData.type == "random_bearing") { // a, width, period (sec); EG a=-1, width=2, period=0.5
			// cumulative pseudo random number. Take sin(randomBearing) for central motion, sin(randomBearing+180) for tangential, randomBearing for rotational
			this.aFunc = new Motion(animationData.a == null ? -1 : animationData.a);
			this.widthFunc = new Motion(animationData.width == null ? 2 : animationData.width);
			this.periodFunc = new Motion(animationData.period);
			this.f = Motion.prototype.randomBearingFunc;
		} else if (animationData.type == "+") { // a + b
			this.aFunc = new Motion(animationData.a);
			this.bFunc = new Motion(animationData.b);
			this.f = Motion.prototype.addFunc;
		} else if (animationData.type == "*") { // a * b
			this.aFunc = new Motion(animationData.a);
			this.bFunc = new Motion(animationData.b);
			this.f = Motion.prototype.multiplyFunc;
		}
	}
	Motion.prototype.constFunc = function(tt) {
		return this.k;
	};
	Motion.prototype.addFunc = function(tt) {
		return this.aFunc.f(tt) + this.bFunc.f(tt);
	};
	Motion.prototype.multiplyFunc = function(tt) {
		return this.aFunc.f(tt) * this.bFunc.f(tt);
	};
	Motion.prototype.sinFunc = function(tt) {
		return sin2(this.angleFunc.f(tt));
	};
	Motion.prototype.cosFunc = function(tt) {
		return cos2(this.angleFunc.f(tt));
	};
	Motion.prototype.timeFunc = function(tt) {
		return tt;
	};
	Motion.prototype.randomFunc = function(tt) {
		return Math.random();
	};
	Motion.prototype.randomBearingFunc = function(tt) {
		// ignore tt (sec), re-seed when t (animation interval) changes:
		if (t - this.prevT >= Math.ceil(this.periodFunc.f(tt) / animationInterval)) {
			this.cumRandomBearing += this.aFunc.f(tt) + this.widthFunc.f(tt) * RNG(t);
			this.prevT = t;
		}
		return this.cumRandomBearing;
	};
	
	////////////////// Class: Film -- the animation surface //////////////////////
	function Film (filmData) {
		this.id = "#" + filmData.name;
	}
	Film.prototype.left = function() {
		return 0; //parseInt($(this.id).css("left"));
	};
	Film.prototype.top = function() {
		return 0; //parseInt($(this.id).css("top"));
	};
	Film.prototype.width = function() {
		return $(this.id).width();
	};
	Film.prototype.height = function() {
		return $(this.id).height();
	};

	////////////////// Class: Sprite -- the animated image //////////////////////
	function Sprite (i, spriteData) {
		this.id = "#sprite_" + i;
		this.url = spriteData.url;
		this.bearing = spriteData.bearing;
		this.timeout = spriteData.timeout;
		this.scale = (spriteData.scale == null ? 1.0 : spriteData.scale);
		this.distance = (spriteData.distance == null ? 1.0 : spriteData.distance);
		this.central = new Motion(spriteData.central);
		this.tangential = new Motion(spriteData.tangential);
		this.rotational = new Motion(spriteData.rotational);
		this.timeOffset = new Motion(spriteData.time_offset);
		this.distance = new Motion(spriteData.distance);
		this.initialTangential = new Motion(spriteData.initial_central == null ? { "type" : "random" } : spriteData.initial_central);
		this.initialCentral = new Motion(spriteData.initial_tangential == null ? 0 : spriteData.initial_tangential);

		this.t0 = t; // animation intervals at activation of sprite
		this.tOffset = 0; // offset for sprite activation time, in number of intervals
		this.x = 0; // real number
		this.y = 0; // real number
		this.dist = 1;
		this.origWidth = 1;
		this.origHeight = 1;
		this.wentOutOfBounds = -1;
		this.outOfBoundsTimeout = (spriteData.out_of_bounds_timeout == null ? 2.0 : spriteData.out_of_bounds_timeout); // deactivate after this number of seconds out of bounds
		this.outOfBoundsTimeout = this.outOfBoundsTimeout / animationInterval; // convert to intervals
	}
	Sprite.prototype.isActive = function() {
		return $(this.id).css("visibility") != "hidden";
	};
	Sprite.prototype.setX = function(x) {
		this.x = x;
		$(this.id).css("left", Math.round(x));
	};
	Sprite.prototype.setY = function(y) {
		this.y = y;
		$(this.id).css("top", Math.round(y));
	};
	Sprite.prototype.activate = function() {
		// Activation functions:
		if (this.timeOffset.f != null) {
			this.tOffset = 1.0 / animationInterval * this.timeOffset.f(t * animationInterval);
		}
		if (this.distance.f != null) {
			this.dist = this.distance.f((t + this.tOffset) * animationInterval);
		}
		$(this.id).css("width", this.width());
		$(this.id).css("z-index", Math.round(-this.dist));
		switch (this.bearing) {
			case 'S':
				this.setX(film.left() + (film.width() - this.width()) * this.initialTangential.f((t + this.tOffset) * animationInterval));
				this.setY(film.top() - this.height() + film.height() * this.initialCentral.f((t + this.tOffset) * animationInterval));
				break;
			case 'N':
				this.setX(film.left() + (film.width() - this.width()) * this.initialTangential.f((t + this.tOffset) * animationInterval));
				this.setY(film.top() + film.height() - film.height() * this.initialCentral.f((t + this.tOffset) * animationInterval));
				break;
			case 'E':
				this.setY(film.top() + (film.height() - this.height()) * this.initialTangential.f((t + this.tOffset) * animationInterval));
				this.setX(film.left() - this.width() + film.width() * this.initialCentral.f((t + this.tOffset) * animationInterval));
				break;
			case 'W':
				this.setY(film.top() + (film.height() - this.height()) * this.initialTangential.f((t + this.tOffset) * animationInterval));
				this.setX(film.left() + film.width() - film.width() * this.initialCentral.f((t + this.tOffset) * animationInterval));
				break;
		}
		$(this.id).css("visibility", "visible");
		this.t0 = t;
		this.wentOutOfBounds = -1;
		++nActive;
	};
	Sprite.prototype.deactivate = function() {
		$(this.id).css("visibility", "hidden");
		--nActive;
	};
	Sprite.prototype.left = function() {
		return parseInt($(this.id).css("left"));
	};
	Sprite.prototype.top = function() {
		return parseInt($(this.id).css("top"));
	};
	Sprite.prototype.width = function() {
		return Math.round(this.origWidth * this.scale / this.dist);
	};
	Sprite.prototype.height = function() {
		return Math.round(this.origHeight * this.scale / this.dist);
	};
	Sprite.prototype.isOutOfBounds = function() {
		var oob = false;
		if (this.top() > film.top() + film.height()) {
			oob = true;
		} else if (this.top() + this.height() < film.top()) {
			oob = true;
		} else if (this.left() > film.left() + film.width()) {
			oob = true;
		} else if (this.left() + this.width() < film.left()) {
			oob = true;
		}
		if (!oob) {
			this.wentOutOfBounds = -1;
			return false;
		} else if (this.wentOutOfBounds < 0) {
			this.wentOutOfBounds = t;
			return false;
		} else {
			return (t - this.wentOutOfBounds > this.outOfBoundsTimeout);
		}
	};

	function animate() {
		// activate sprites:
		var nInactive = sprites.length - nActive;
		var n = 0; // safety net
		while (nActive < maxActive && nActive < sprites.length && n++ < sprites.length) {
			var i = Math.floor(Math.random() * (sprites.length - .0001));
			if (!sprites[i].isActive()) {
				sprites[i].activate();
			}
		}
	
		draw();
		
		// deactivate sprites:
		for (var i=0 ; i<sprites.length ; ++i) {
			if (!sprites[i].isActive()) {
				continue;
			}
			if (sprites[i].isOutOfBounds() ||
				(sprites[i].timeout != null && (t - sprites[i].t0) * animationInterval > sprites[i].timeout)) {
				sprites[i].deactivate();
			}
		}
			
	}
	
	function draw() {
	
		for (var i=0 ; i<sprites.length ; ++i) {
			if (!sprites[i].isActive()) {
				continue;
			}

			if (sprites[i].rotational.f != null) {
				$(sprites[i].id).rotate(sprites[i].rotational.f((t - sprites[i].t0 + sprites[i].tOffset) * animationInterval));
				// Workaround for jQueryRotate.2.1 which sets relative positioning in IE
				if ($(sprites[i].id).css("position") != "absolute") $(sprites[i].id).css("position", "absolute");
			}
			if (sprites[i].tangential.f != null) {
				var p = animationInterval / sprites[i].dist * sprites[i].tangential.f((t - sprites[i].t0 + sprites[i].tOffset) * animationInterval);
				switch (sprites[i].bearing) {
					case 'S':
					case 'N':
						sprites[i].setX(sprites[i].x + p);
						break;
					case 'E':
					case 'W':
						sprites[i].setY(sprites[i].y + p);
						break;
				}
			}
			if (sprites[i].central.f != null) {
				var p = animationInterval / sprites[i].dist * sprites[i].central.f((t - sprites[i].t0 + sprites[i].tOffset) * animationInterval);
				switch (sprites[i].bearing) {
					case 'S':
						sprites[i].setY(sprites[i].y + p);
						break;
					case 'N':
						sprites[i].setY(sprites[i].y - p);
						break;
					case 'E':
						sprites[i].setX(sprites[i].x + p);
						break;
					case 'W':
						sprites[i].setX(sprites[i].x - p);
						break;
				}
			}
		}
	
		++t;
	}
	
	var imageLoaded = function() {
		++nImagesLoaded;
		if (allImagesLoaded()) {
			initializeImages();
			pub.start();
		}
	};
	
	var initializeImages = function() {
		for (var i=0 ; i<sprites.length ; ++i) {
			// add tag to dom:
			var imgTag = '<img id="sprite_' + i + '"' +
				' src="' + sprites[i].url + '"' +
				' style="position:absolute !important;visibility:hidden"' +
				' />';
			$(film.id).append(imgTag);
				
			sprites[i].origWidth = $(sprites[i].id).width(); // naturalWidth with modern browsers
			sprites[i].origHeight = $(sprites[i].id).height(); // naturalHeight with modern browsers
		}
	};
	
	var allImagesLoaded = function() {
		return nImagesLoaded == sprites.length;
	};
	
	///////////////////////////////// public methods /////////////////////////////////////
	var pub = {};
	
	pub.init = function(spriteCfg) { // put this in a document.ready() handler
		// Schedule test for succesful JSON document
		setTimeout( 'if (film == undefined) { alert("Failed to read json document");	}', 2000 );
		// Read JSON document via ajax
		$.getJSON(spriteCfg, function(data) {
			film = new Film(data.film);
			maxActive = parseInt(data.maxActive);
			frameRate = data.frame_rate;
			animationInterval = 1.0 / frameRate;
			if (data.speed != null) { animationInterval *= data.speed; }
			for (var i=0 ; i<data.sprites.length ; ++i) {
				var sprite = new Sprite(i, data.sprites[i]);
				sprites.push(sprite);
				
				// preload images:
				var imgObj = new Image;
				imgObj.onload = imageLoaded;//Image.prototype.imageLoaded;
				imgObj.onerror = imageLoaded;//Image.prototype.imageLoaded;
				imgObj.src = data.sprites[i].url;
			}
		});
	};
	var intervalId = null;
	pub.start = function() {
		if (intervalId == null && allImagesLoaded()) {
			intervalId = setInterval(animate, parseInt(1000.0 / frameRate));
		}
	};
	pub.stop = function() {
		if (intervalId != null) {
			clearInterval(intervalId);
			intervalId = null;
		}
	};
	pub.clear = function() {
		for (var i=0 ; i<sprites.length ; ++i) {
			if (!sprites[i].isActive()) {
				continue;
			}
			sprites[i].deactivate();
		}
	};
	
	return pub;
}());

