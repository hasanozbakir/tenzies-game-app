import React from "react"

export default function Navbar(props) {
    const [isListOpen, setIsListOpen] = React.useState(false)
    const ref = React.useRef(null)
    
    React.useEffect(() => {
        if(isListOpen) {
            const closeList = (event) => {
                if (ref && ref.current && !ref.current.contains(event.target)) {
                    setIsListOpen(false);
                }
            }
            document.body.addEventListener("mousedown", closeList)
            
            return () => document.body.removeEventListener("mousedown", closeList)
        }
    },[isListOpen])
    
    function toggle() {
        setIsListOpen(prevOpen => !prevOpen )
    }
    
    function reset() {
        props.resetGame()
        props.setIsReset(true)
        toggle()
    }
    
    function openRecords() {
        props.setIsRecordOpen(true)
        toggle()
    }
    
    function exit() {
        props.exitGame()
        toggle()
    }
    
    return (
        <nav>
            <h1 className="title">Tenzies</h1>
            <img 
                className="logo"
                src="../images/dice.png" 
                alt="" />
            <img 
                id="menu-btn" 
                className="menu"
                src="./images/hamburger.png" 
                onClick={toggle} 
                alt="" />
            {props.currentUser.online && 
            <div 
                ref={ref}
                className={`nav-container ${isListOpen ? "open-nav": ""}`} 
                id="nav" >
                <ul>
                    <li onClick={() => {
                        exit()
                        props.setCurrentUser(prevUser => ({
                            ...prevUser,
                            online: false,
                            remember: false
                        }))
                    }}>Logout</li>
                    {!(!props.isStarted || props.tenzies) &&
                    <li onClick={reset} >Reset Game</li>}
                    {props.isStarted &&
                    <li onClick={exit}>Exit Game</li>}
                    <li onClick={openRecords}>Records</li>
                </ul>
            </div>}
        </nav>
    )
}