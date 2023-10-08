import React from "react"

export default function Die(props) {
    const faces = [
        "first-face", 
        "second-face", 
        "third-face", 
        "fourth-face", 
        "fifth-face", 
        "sixth-face"
    ]
    const dieFace = faces[props.value - 1]
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    const dotElements = new Array(props.value)
                                .fill(0)
                                .map((item, index) => {
        return <span 
                    key={index} 
                    className="dot">
                </span>
    })
        return (
            <div 
                className={`die-face ${dieFace}`} 
                style={styles}
                onClick={props.holdDice}
            >
                {dotElements}
            </div>
    )
}