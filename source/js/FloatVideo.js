(function () {
	document.addEventListener("DOMContentLoaded", function () {

		//module Animate
		const Animate = {
			init(w) {
				this.duration = 1000;
				this.w = w;
			},

			run(options) {
				//options = {duration, timing(timeFraction), draw}
				options.duration = Animate.duration;;
				var start = performance.now();

				var animationFrame;

				this.animationFrame = requestAnimationFrame(function animate(time) {
					var timeFraction = (time - start) / options.duration;
					if (timeFraction > 1) timeFraction = 1;

					var progress = timeFraction;

					options.draw(progress);

					if (timeFraction < 1) {
						requestAnimationFrame(animate);
					}
				});
			},

			bottom(el) {
				var defW = el.clientWidth;

				el.style.position = "fixed";

				Animate.run({
					draw: function (progress) {
						el.style.bottom = (100 - (progress * 100)) + "%";
						el.style.transform = "scale(" + (1 - (progress * (1 - Animate.w / defW))) + ")";
					}
				});
			},

			top(el) {
				//if width=100%
				var defW = document.body.clientWidth;

				Animate.run({
					draw: function (progress) {
						el.style.top = 0;
						el.style.bottom = "auto";
						el.style.transform = "scale(" + ((Animate.w / defW) + (progress * (1 - Animate.w / defW))) + ")";
					}
				});
			},

			close(el) {
				var defW = el.clientWidth;

				Animate.run({
					draw: function (progress) {
						el.style.transform = "scale(" + (1 - (progress * (1 - Animate.w / defW))) + ")";
					}
				});
			},

			cancelAnimation() {
				cancelAnimationFrame(Animate.animationFrame);
			}
		};

		//module Video
		const VideoFloat = {
			init(containerID) {
				this.container = document.getElementById("video-container");  //block with the video
				this.video = this.container.getElementsByTagName("video")[0]; //block with video
				this.overlay = document.createElement("div");

				this.container.parentElement.style.height = this.container.clientHeight + "px";

				//overlay
				this.container.appendChild(this.overlay);
				this.overlay.classList.add("overlay");
				this.overlay.dataset.popup = 0;
				this.overlay.addEventListener("click", function() {
					if(this.dataset.popup == 0) VideoFloat.popup("open");
					else VideoFloat.popup("close");
				});
			},

			coordinates() {
				return VideoFloat.container.parentElement.getBoundingClientRect();
			},

			create(className) {
				if (!VideoFloat.container.classList.contains(className)) {
					VideoFloat.container.classList.add(className);
					VideoFloat.overlay.style.display = "block";
					Animate.bottom(VideoFloat.container);
				}
			},

			remove(className) {
				if (VideoFloat.container.classList.contains(className)) {
					VideoFloat.container.classList.remove(className);
					VideoFloat.overlay.style.display = "none";
					Animate.top(VideoFloat.container);
					
					if(VideoFloat.overlay.dataset.popup == 1) {
						VideoFloat.video.classList.remove("popup");
						VideoFloat.overlay.dataset.popup = 0;
						VideoFloat.overlay.style = "";
						//stop animate
						Animate.cancelAnimation();
					}	
				}
			},

			popup(flag) {
				switch(flag) {
					case "open": 
						toOverlay(1, "-1", 0.5, "100%");
						Animate.top(VideoFloat.container);
						VideoFloat.video.classList.add("popup");
						break;
					case "close": 
						toOverlay(0, 0, 0, "auto");
						Animate.close(VideoFloat.container);
						VideoFloat.video.classList.remove("popup");
						VideoFloat.container.style.bottom = 0;
						break;
				}

				function toOverlay(ds, z, op, ch) {
					VideoFloat.overlay.dataset.popup = ds;
					VideoFloat.overlay.style.zIndex = z;
					VideoFloat.overlay.style.opacity = op;
					VideoFloat.container.style.height = ch;
				}
			},

			static() {
				VideoFloat.container.style.position = "static";
			}
		};


		//---- run script ----//
		VideoFloat.init("video-container");

		//page scrolling
		document.addEventListener("scroll", function () {
			var bottom = VideoFloat.coordinates().bottom;
			var top    = VideoFloat.coordinates().top;
			var w      = 200; //min width fot container

			Animate.init(w);

			if (bottom <= 0) VideoFloat.create("fix", w);
			else VideoFloat.remove("fix");

			if(top >= 0) VideoFloat.static();
		});
	});
})();