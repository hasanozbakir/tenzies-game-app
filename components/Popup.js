import React from "react"

export default function Popup(props) {  
       
    return (
        <div className="popup" >
        {
            props.user.finishTime === props.user.record ? 
            `Congratulations! ${props.user.username} your new record is ${props.user.record} seconds`: 
            `Congratulations! ${props.user.username} you won in ${props.user.finishTime} seconds`
        }
        </div>
    )
}