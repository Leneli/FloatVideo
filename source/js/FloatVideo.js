(function () {
	document.addEventListener("DOMContentLoaded", function () {

		//module
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
				//point(Y), below which appears the fixed block = the lower boundary of main container with the video
				return VideoFloat.container.parentElement.getBoundingClientRect().bottom;
			},

			create(className, w, h) { //"w" and "h" are numbers, not strings!
				this.w = w;
				this.h = h;

				if (!VideoFloat.container.classList.contains(className)) {
					VideoFloat.container.classList.add(className);
					VideoFloat.container.style.width = this.w + "px";
					VideoFloat.container.style.height = this.h + "px";

					//overlay
					VideoFloat.overlay.style.display = "block";

					//VideoFloat.animate("bottom");
				}
			},

			remove(className) {
				if (VideoFloat.container.classList.contains(className)) {
					VideoFloat.container.classList.remove(className);
					VideoFloat.container.style = "";
					VideoFloat.video.classList.remove("popup");
					VideoFloat.overlay.dataset.popup = 0;
					VideoFloat.overlay.style = "";

					//overlay
					VideoFloat.overlay.style.display = "none";

					//VideoFloat.animate("top");
				}
			},

			animate(vector) {
				switch (vector) {
					case "top":
						break;
					case "bottom":
						break;
				}
			},

			popup(flag) {
				switch(flag) {
					case "open": 
						up(1, "-1", 0.5, 0, 0, "100%", "100%");
						VideoFloat.video.classList.add("popup");
						break;
					case "close": 
						up(0, 0, 0, "auto", "auto", this.w + "px", this.h + "px");
						VideoFloat.video.classList.remove("popup");
						break;
				}

				function up(ds, z, op, t, l, w, h) {
					VideoFloat.overlay.dataset.popup = ds;
					VideoFloat.overlay.style.zIndex = z;
					VideoFloat.overlay.style.opacity = op;
					VideoFloat.container.style.top = t;
					VideoFloat.container.style.left = l;
					VideoFloat.container.style.width = w;
					VideoFloat.container.style.height = h;
				}

			},

			close() { }
		};


		//---- run script ----//
		VideoFloat.init("video-container");

		//page scrolling
		document.addEventListener("scroll", function () {
			var coord = VideoFloat.coordinates();
			var w = 200;
			var h = 100;

			if (coord <= 0) {
				VideoFloat.create("fix", w, h);
			}
			else {
				VideoFloat.remove("fix");
			}
		});
	});
})();