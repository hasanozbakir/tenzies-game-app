import React from "react"

export default function Record(props) {
    const ref = React.useRef(null)
    
    React.useEffect(() => {
        if(props.isRecordOpen) {
            const closeRecord = (event) => {
                if (ref && ref.current && !ref.current.contains(event.target)) {
                    props.setIsRecordOpen(false);
                }
            }
            document.body.addEventListener("mousedown", closeRecord)
            
            return () => document.body.removeEventListener("mousedown", closeRecord)
        }
    },[props.isRecordOpen])

    const recordElements =  props.recordArray.length > 0 && 
                            props.recordArray.map((recItem, index) => {
                                return (
                                    <li key={index}>
                                        <p>
                                            <strong>Name: </strong><span>{recItem.name}</span>
                                        </p>
                                        <p>
                                            <strong>Score: </strong><span>{recItem.score}s</span>
                                        </p>
                                    </li>
                                )
                            })
    
    return (
        props.isRecordOpen && 
        <div className="record--container">
            <h3>
                {
                    props.recordArray.length > 0 ? 
                    "Best scores of all":
                    "No records yet"
                }
            </h3>
            <ul 
                ref={ref} 
                className="record" 
                id="record" >
                    {recordElements}
            </ul>
        </div>
    )
}