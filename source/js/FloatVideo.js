(function () {
	document.addEventListener("DOMContentLoaded", function () {

		//module
		const VideoFloat = {
			init(videoID) {
				this.video = document.getElementById(videoID); //block with video
				this.container = this.video.parentElement; //block with the video
				this.shadow = document.createElement("div");

				this.video.insertBefore(this.shadow, this.video.firstElementChild);


				this.container.style.height = this.video.clientHeight + "px";
			},

			coordinates() {
				//point(Y), below which appears the fixed block = the lower boundary of main container with the video
				return VideoFloat.container.getBoundingClientRect().bottom;
			},

			create(className, w, h) { //"w" and "h" are numbers, not strings!
				if (!VideoFloat.video.classList.contains(className)) {
					VideoFloat.video.classList.add(className);
					VideoFloat.video.style.width = w + "px";
					VideoFloat.video.style.height = h + "px";

					//shadow
					VideoFloat.shadow.style.position = "absolute";
					VideoFloat.shadow.style.top = "0";
					VideoFloat.shadow.style.width = "100%";
					VideoFloat.shadow.style.height = "100%";
					VideoFloat.shadow.style.background = "red";

					VideoFloat.animate("bottom");
				}
			},

			remove(className) {
				if (VideoFloat.video.classList.contains(className)) {
					VideoFloat.video.classList.remove(className);
					VideoFloat.video.style.width = "100%";
					VideoFloat.video.style.height = "auto";

					VideoFloat.shadow.style.display = "none";

					VideoFloat.animate("top");
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

			popup() {
				//alert("OK!");
			},

			close() { }
		};


		//---- run script ----//
		VideoFloat.init("video");

		//page scrolling
		document.addEventListener("scroll", function () {
			var coord = VideoFloat.coordinates();
			var w = 200;
			var h = 100;

			if (coord <= 0) VideoFloat.create("video_fix", w, h);
			else VideoFloat.remove("video_fix");
		});
	});
})();