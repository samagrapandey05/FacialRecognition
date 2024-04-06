import { useNavigate } from "react-router-dom";
import img from "./LandingImg.jpg";

function Landing(){
    let navigate = useNavigate();

    const routeUpload = () => {
        let path = `./Upload`; 
        navigate(path);
    }
    const routeWebcam = () =>{
        let path = './Webcam';
        navigate(path);
    }
    return(
        <div>
        <div id = "Title">
        <div id = "TitleText">
            <h1 className = "text">FindMe: Interactive facial recognition</h1>
        </div>
        <div id = "TitleImg">
            <img style={{maxWidth: "30%", maxHeight: "100%"}} src={img}/>
        </div>
        </div>
        <div id = "Buttons">
        <div id="ButtonContainer">
            <button className="landingButtons" onClick={routeUpload} >
                Upload an Image
            </button>
            <button className="landingButtons" onClick={routeWebcam} >
                Live Facial Recognition
            </button>
        </div>
        </div>
        </div>
    )
}

export default Landing