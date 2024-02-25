import "../styles/app.css";
import "./share.js";
import header from "./header.js";
import videojs from "video.js";
import "videojs-hotkeys";

// header(document);

var options = {
  plugins: {
    hotkeys: {
      volumeStep: 0.1,
      seekStep: 5,
      enableModifiersForNumbers: false,
      // fullscreenKey: "F",
    },
  },
};

var player = videojs(document.querySelector("#my_video_1"), options, function onPlayerReady() {
  videojs.log("Your player is ready!");

  // this.hotkeys({
  //   volumeStep: 0.1,
  //   seekStep: 5,
  //   enableModifiersForNumbers: false,
  //   fullscreenKey: "F",
  // });

  // In this context, `this` is the player that was created by Video.js.
  this.play();

  // How about an event listener?
  this.on("ended", function () {
    videojs.log("Awww...over so soon?!");
  });
});
