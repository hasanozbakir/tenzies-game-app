import React from "react"

export default function Timer(props) {   
    
    React.useEffect(() => {
        
        if(!props.tenzies && 
            props.isStarted && 
            !props.isReset) 
            {
                props.setSec(0)
                const timerInterval = setInterval(() => {
                    props.setSec(prevSec => prevSec + 1)
                }, 1000);
                return () => {
                    clearInterval(timerInterval)
                    props.setIsReset(false)
                }
            }
        if(!props.isReset && props.tenzies && props.user.username) {
            console.log("after clear")
            props.setUser(prevUser =>{
                return {
                    ...prevUser, 
                    finishTime: props.sec,
                    record: props.sec < props.user.record ? props.sec: props.user.record
                }
            })
        }
    }, [props.tenzies, props.isStarted, props.isReset])
    
    return (
        props.isStarted &&
        !(props.count === 0 && props.tenzies) && 
        (<div className="timer" >{props.sec}s</div>)
    )
}