
import React from "react";
class AppStreamCam extends React.Component {
    constructor(props : any) {
      super(props);
      this.streamCamVideo= this.streamCamVideo.bind(this)
    }
    streamCamVideo() {
      var constraints = { audio: false, video: true };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(mediaStream) {
          var video = document.querySelector("video");
          if(video){
            video.srcObject = mediaStream;
            video.onloadedmetadata = function() {
                if(video){
                    video.play();
                }
            };
          }
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        }); // always check for errors at the end.
    }
    handleClick() {
        return this.streamCamVideo;
    }
    render() {
      return (
        <div>
          <div id="container">
            <video autoPlay={true} id="videoElement" controls></video>
          </div>
          {/*<button onClick={this.handleClick()}>Start streaming</button>*/}
        </div>
      );
    }
  }

export default AppStreamCam