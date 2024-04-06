import { useNavigate } from "react-router-dom";
import { useState } from "react";
import cv from "@techstark/opencv-js"

function Webcam() {
    const [streaming, setStreaming] = useState(false);
    //const [stream, setStream] = useState<MediaStream>();
    const [firstImg, setFirstImg] = useState(true);
    const [error, setError] = useState(false)
    //const [size, setSize] = useState([0, 0]);
    //const videoRef = useRef<HTMLVideoElement>(null)

    /*function updateSize() {
        let videoWidth = window.innerWidth * 0.5 * 0.5;
        let videoHeight = window.innerHeight * 0.7 * 0.7;
        try{
            const videoElem = document.getElementById("videoElement") as HTMLVideoElement;
            const widthRatio = videoWidth / videoElem.videoWidth;
            const heightRatio = videoHeight / videoElem.videoHeight;
            if(widthRatio < 1.0 || heightRatio < 1.0){
                if(widthRatio < heightRatio){
                    videoHeight = widthRatio * videoElem.videoHeight;                    
                }
                else if(heightRatio < widthRatio){
                    videoWidth = heightRatio * videoElem.videoWidth; 
                }
            }
            else{
                videoWidth = videoElem.videoWidth;
                videoHeight = videoElem.videoHeight;
            }
        }
        catch{updateSize()}
        finally{
            console.log(videoWidth)
            console.log(videoHeight)
            setSize([videoWidth, videoHeight]);
            //return [videoWidth, videoHeight];
        }
    }*/
    
    /*useLayoutEffect(() => {
        
        if(streaming === true){
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }
    }, [streaming]);*/
    
    //const myvideo = useRef<any>(createRef);

    let navigate = useNavigate();
    const routeHome = () => {
        let path = `/`; 
        navigate(path);
    }



    async function getMedia() {
        /*let webcam = null;
        
        webcam = await navigator.mediaDevices.getUserMedia({audio: false,
            video: true,} );
          /* use the stream */
        /*myvideo.current.srcObject = webcam;
        myvideo.current.autoplay = true;
        myvideo.current.control = true;
        myvideo.current.loop = true;
        console.log(webcam)
        console.log(myvideo)*/
        var constraints = { audio: false, video: true };
        navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(mediaStream) {
          var video = document.querySelector("video");
          if(video){   
            video.srcObject = mediaStream;
            video.onloadedmetadata = function() {
                if(video){
                    //updateSize();
                    video.play();
                    //console.log(videoRef)
                    console.log("Video width: ", video.width)
                    console.log("Video height: ", video.height)
                    console.log("Video: ", video)
                    let firstFrame = true;
                    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
                    //let dst = new cv.Mat(277, 306, cv.CV_8UC1);
                    let cap = new cv.VideoCapture(video);

                    const FPS = 30;
                    async function processVideo() {
                        console.log("Into Process Video")
                        try {
                            setError(false)
                            let begin = Date.now();
                            // start processing.
                            cap.read(src);
                            let gray = new cv.Mat();
                            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
                            let faces = new cv.RectVector();
                            let faceCascade: any = null;

                            const xml_model_url = 'https://raw.githubusercontent.com/opencv/opencv/master/data/haarcascades/haarcascade_frontalface_default.xml';
                            const xml_path = "haarcascade_frontalface_default.xml";

                            function createFileFromUrl (path: string, url: string) {
                                // path: string to access loaded file trough cv
                                // url: path of the actual file on your FS
                                // callback: what to do when file is loaded
                                console.log("Inside request function");
                                let request = new XMLHttpRequest();
                                request.open('GET', url, true);
                                request.responseType = 'arraybuffer';
                                request.onload = function() {
                                    console.log("Inside onload");
                                    request = this;
                                    console.log(request)
                                    if (request.readyState === 4) {
                                        if (request.status === 200) {
                                            let data = new Uint8Array(request.response);
                                            if(firstImg === true && firstFrame === true){
                                                console.log(firstImg)
                                                try{
                                                    cv.FS_createDataFile('/', path, data, true, false, false);
                                                }
                                                catch{

                                                }
                                                finally{
                                                    setFirstImg(false);
                                                    firstFrame = false;
                                                }
                                            }
                                            faceCascade = new cv.CascadeClassifier(xml_path);
                                            //console.log("face cascade: ", faceCascade);
                                            let mSize = new cv.Size(0, 0);
                                            console.log(faces);
                                            faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, mSize, mSize);
                                            for (let i = 0; i < faces.size(); ++i) {
                                                let roiGray = gray.roi(faces.get(i));
                                                let roiSrc = src.roi(faces.get(i));
                                                let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
                                                let point2 = new cv.Point(faces.get(i).x + faces.get(i).width, faces.get(i).y + faces.get(i).height);
                                                cv.rectangle(src, point1, point2, [255, 0, 0, 255], 3);
                                                roiGray.delete();
                                                roiSrc.delete();
                                            }
                                            cv.imshow("canvasOutput", src);
                                            gray.delete();
                                            faces.delete();
                                            faceCascade.delete();

                                            // schedule the next one.
                                            let delay = 1000/FPS - (Date.now() - begin);
                                            setTimeout(processVideo, delay);
                                        } else {
                                            console.error('Failed to load ' + url + ' status: ' + request.status);
                                        }
                                    }
                                };
                                request.send();
                            }
            
                            /*function createCascade() {
                                faceCascade = new cv.CascadeClassifier(xml_path);
                            }*/
                            console.log("About to call request function")
                            createFileFromUrl(xml_path, xml_model_url);
                            //cv.imshow("canvasOutput", dst);
                            
                        } catch (err) {
                            setError(true)
                            console.log(err);
                        }
                    };
                    // schedule the first one.
                    setTimeout(processVideo, 0);
                }
            };
          }
        })
        .catch(function(err) {
          setError(true)
          console.log(err.name + ": " + err.message);
        }); // always check for errors at the end.

        setStreaming(true)
        //setStream(webcam)
      }


    return(
        <div>
            <div className = "navbar">
                <button onClick={routeHome} >
                    Return Home
                </button>
            </div>
            <div className = "body">
                <h1>Live Facial Recognition</h1>
                <div className="imgDisplay">
                    {(streaming === true) ?
                        <div className = "input">
                            <h1 className="Headers">Webcam Feed:</h1>
                            <div style={{width: "70%", height: "50%", overflow: "scroll", display: "flex", justifyContent: "center"}}>
                            <video autoPlay={true} id="videoElement" controls width={306} height={277} webkit-playsinline playsInline/*width={"70%"} height={"50%"}*/></video>
                            </div>
                            {error ? <h1 className="subHeader">Webcam Access Denied. Please Allow Webcam Access.</h1> : null}
                            <button onClick={()=>{setStreaming(false)}}>Stop Webcam</button>
                        </div> : 
                        <div className = "input">
                            <h1 className="Headers">Turn on Webcam Below</h1>
                            <button onClick={getMedia}>Turn on webcam</button>
                        </div>
                    }
                    {(streaming === true) ? 
                        <div className = "input">
                            <h1 className="Headers">Facial Recognition:</h1>
                            <div style={{width: "70%", height: "50%", overflow: "scroll", display: "flex", justifyContent: "center"}}>
                            <canvas id = "canvasOutput" /*width="328" height="240" */></canvas>
                            </div>
                        </div> : 
                        <div className = "input">
                            <p>No Recording in Progress</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Webcam