import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import UploadDetection from "./UploadDetection";
import cv from "@techstark/opencv-js"
function Upload(){
    const [imgPresent, setImgPresent] = useState(false);
    const [img, setImg] = useState("");
    const [firstImg, setFirstImg] = useState(true);
    /*const [size, setSize] = useState([0, 0]);
    const [imgLoaded, setImgLoaded] = useState(false);
    function updateSize() {
        let videoWidth = window.innerWidth * 0.5 * 0.5;
        let videoHeight = window.innerHeight * 0.7 * 0.7;
        try{
            const videoElem = document.getElementById("imageSrc") as HTMLImageElement;
            const widthRatio = videoWidth / videoElem.naturalWidth;
            const heightRatio = videoHeight / videoElem.naturalHeight;
            if(widthRatio < 1.0 || heightRatio < 1.0){
                if(widthRatio < heightRatio){
                    videoHeight = widthRatio * videoElem.naturalHeight;                    
                }
                else if(heightRatio < widthRatio){
                    videoWidth = heightRatio * videoElem.naturalWidth; 
                }
            }
            else{
                videoWidth = videoElem.naturalWidth;
                videoHeight = videoElem.naturalHeight;
            }
        }
        catch{updateSize()}
        finally{
            console.log(videoWidth)
            console.log(videoHeight)
            setSize([videoWidth, videoHeight]);
            //return [videoWidth, videoHeight];
        }
    }
    useLayoutEffect(() => {
        if(imgLoaded === true){
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }    
    }, [imgLoaded]);*/

    let navigate = useNavigate();
    const routeHome = () => {
        let path = `/`; 
        navigate(path);
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("changed");
        const sellectFile = e.target.files ? e.target.files[0] : null;
        if(sellectFile) {
            setImgPresent(true);
            setImg(URL.createObjectURL(sellectFile));
            
            //console.log(height)
        }
    }
    
    const loadCanvas = async function() {
            //setImgLoaded(true);
            console.log("Inside onload")
            let mat = cv.imread("imageSrc");
            
            let gray = new cv.Mat();
            cv.cvtColor(mat, gray, cv.COLOR_RGBA2GRAY, 0);
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
                            if(firstImg == true){
                                console.log(firstImg)
                                try{
                                    cv.FS_createDataFile('/', path, data, true, false, false);
                                }
                                catch{}
                                finally{
                                    setFirstImg(false);
                                }
                            }
                            faceCascade = new cv.CascadeClassifier(xml_path);
                            console.log("face cascade: ", faceCascade);
                            let mSize = new cv.Size(0, 0);
                            faceCascade.detectMultiScale(gray, faces, 1.1, 5, 0, mSize, mSize);
                            for (let i = 0; i < faces.size(); ++i) {
                                let roiGray = gray.roi(faces.get(i));
                                let roiSrc = mat.roi(faces.get(i));
                                let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
                                let point2 = new cv.Point(faces.get(i).x + faces.get(i).width, faces.get(i).y + faces.get(i).height);
                                cv.rectangle(mat, point1, point2, [255, 0, 0, 255], 3);
                                roiGray.delete();
                                roiSrc.delete();
                            }
                            /*let inputImg = document.getElementById("imageSrc") as HTMLImageElement;
                            let outputCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;
                            console.log("Natural Height: ", inputImg.naturalHeight);
                            console.log("Natural Width: ", inputImg.naturalWidth);
                            if(inputImg.naturalWidth <= inputImg.width && inputImg.naturalHeight <= inputImg.height){
                                outputCanvas.width = inputImg.naturalWidth;
                                outputCanvas.height = inputImg.naturalHeight;
                            }
                            else {
                                if(inputImg.width/inputImg.naturalWidth > inputImg.height/inputImg.naturalHeight){
                                    outputCanvas.width = (inputImg.height/inputImg.naturalHeight) * inputImg.naturalWidth;
                                    outputCanvas.height = inputImg.height;
                                }
                                else if (inputImg.width/inputImg.naturalWidth < inputImg.height/inputImg.naturalHeight){
                                    console.log("Canvas Width: ", inputImg.width);
                                    console.log("Canvas Height: ", (inputImg.width/inputImg.naturalWidth) * inputImg.naturalHeight)
                                    outputCanvas.width = inputImg.width;
                                    outputCanvas.height = (inputImg.width/inputImg.naturalWidth) * inputImg.naturalHeight;
                                }
                                else{
                                    outputCanvas.width = inputImg.width;
                                    outputCanvas.height = inputImg.height;
                                }
                            }*/
                            cv.imshow("myCanvas", mat);

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
            await createFileFromUrl(xml_path, xml_model_url);

            /*
            //faceCascade.load('./haarcascade_frontalface_default.xml');
            let mSize = new cv.Size(0, 0);
            if(faceCascade !== null){
                faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, mSize, mSize);
                for (let i = 0; i < faces.size(); ++i) {
                    let roiGray = gray.roi(faces.get(i));
                    let roiSrc = mat.roi(faces.get(i));
                    let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
                    let point2 = new cv.Point(faces.get(i).x + faces.get(i).width, faces.get(i).y + faces.get(i).height);
                    cv.rectangle(mat, point1, point2, [255, 0, 0, 255]);
                    roiGray.delete();
                    roiSrc.delete();
                }
                cv.imshow("myCanvas", mat);
            }
            else{
                console.log("Face Cascade: ", faceCascade)
            }*/
            
            //mat.delete();
            //if(imgElement){
            //    width = imgElement.naturalWidth
            //    height = imgElement.naturalHeight
            //    console.log(width)
             //   console.log(height)
            //}
            
            //if (imgRef.current && imgRef.current.clientHeight){
            //    setHeight(imgRef.current.clientHeight)
            //}
            //if (imgRef.current && imgRef.current.clientWidth){
            //    setWidth(imgRef.current.clientWidth)
            //}
        }; 
    return(
        <div>
            <div className = "navbar">
                <button onClick={routeHome} >
                    Return Home
                </button>
            </div>
            <div className = "body">
                <h1 className="Headers"> Upload an Image Below</h1>
                <div className="imgDisplay">
                    {(imgPresent === true) ?
                        <div className = "input">
                            <h1 className="Headers">Uploaded Image:</h1>
                            <img src={img} className="display" /*style={{width: size[0], height: size[1]}}*/ id="imageSrc" onLoad={loadCanvas}/>
                            <button onClick={()=>{setImgPresent(false)}}>Upload New Image</button>
                        </div> : 
                        <div className = "input">
                            <input  type = "file" accept = "image/*" multiple = {false} onChange = {handleChange}/>
                        </div>
                    }
                    {(imgPresent === true) ? 
                        <div className = "input">
                            <h1 className="Headers">Facial Recognition:</h1>
                            <div style={{width: "50%", height: "70%"}}>
                                <canvas id = "myCanvas" style={{maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}}></canvas>
                            </div>
                        </div> : 
                        <div className = "input">
                            <p>No Image Uploaded</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Upload