import { useEffect, useState, createRef, useRef } from "react";
import cv from "@techstark/opencv-js"
interface Props {
    img: string
}
function UploadDetection({img}: Props) {
    console.log(img)
    const [original, setOriginal] = useState(img)

    const imgRef: any = useRef(createRef);

    useEffect(()=>{
        console.log("About to set imgRef's current")
        setOriginal(img)
    },[img])

    imgRef.current.src = original
    console.log("About to read imgRef.current")
    console.log(imgRef)
    let mat = cv.imread(imgRef.current);
    cv.imshow('myCanvas', mat);
    mat.delete();

    return(
        <canvas id = "myCanvas"></canvas>
    )
}
export default UploadDetection