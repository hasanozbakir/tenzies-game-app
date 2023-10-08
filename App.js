import React, { useEffect } from "react"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Die from "./components/Die"
import Timer from "./components/Timer"
import Popup from "./components/Popup"
import Record from "./components/Record"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
   
    const [userArray, setUserArray] = React.useState(
        () => JSON.parse(localStorage.getItem("tenzies-user-array")) || [])
    const [currentUser, setCurrentUser] = React.useState({online: true})
    const [isStarted, setIsStarted] = React.useState(false)
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [isReset, setIsReset] = React.useState(false)
    const [sec, setSec] = React.useState(0)
    const [count, setCount] = React.useState(-1)
    const [recordArray, setRecordArray] = React.useState(
        () => JSON.parse(localStorage.getItem("tenzies-record-array")) || []
    )
    const [isRecordOpen, setIsRecordOpen] = React.useState(false)
    const [isOpenSignUp, setIsOpenSignUp] = React.useState(false)

    console.log(currentUser.username)
    console.log("userarray", userArray)

    React.useEffect(() => {
        if(userArray.length > 0) {
            setCurrentUser({
                ...userArray[0],
                online: userArray[0].remember
            })
        }else{
            setCurrentUser({online: false})
        }
    },[])

    React.useEffect(() => {
        isStarted && rollDice()
    }, [isStarted])
    
    React.useEffect(() => {
        localStorage.setItem("tenzies-user-array", JSON.stringify(userArray))
    }, [JSON.stringify(userArray)])

    React.useEffect(() => {
        localStorage.setItem("tenzies-record-array", JSON.stringify(recordArray))
    }, [JSON.stringify(recordArray)])

    console.log("recarr", recordArray)
    React.useEffect(() => {
        const arr = [...userArray]
        const filtered = arr.filter(user => user.username !== currentUser.username)
        setUserArray([currentUser, ...filtered])
        console.log("effect array", arr, filtered, userArray)
    }, [JSON.stringify(currentUser)])

    React.useEffect(() => {
        if(currentUser.username && currentUser.record !== 1000) {
            let recordArr = [...recordArray]
            recordArr = [
                ...recordArr,
                {
                    name: currentUser.username,
                    score: currentUser.record
                }
            ]
            const sortedRecords = recordArr.sort((a, b) => a.score - b.score)
                                            .filter(rec => rec.name && rec.score)
            const uniqueNamedRecords = []
            const names = []
            for(let i=0; i<sortedRecords.length; i++){
                const rec = sortedRecords[i]
                if(!names.includes(rec.name)) {
                    names.push(rec.name)
                    uniqueNamedRecords.push(rec)
                }
            }
            console.log("uniq recs", uniqueNamedRecords)
            setRecordArray(uniqueNamedRecords.slice(0,3))
        }
    }, [currentUser.record])

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setCount(0)
        }
    }, [dice])
    
    function startGame() {
        setCount(-1)
        setIsStarted(true)
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!isStarted) {
            return
        }
        
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            !count
            setCount(prevCount => prevCount + 1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        currentUser.online && 
        isStarted && 
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    function resetGame() {
        setDice(allNewDice()) 
        setTenzies(false) 
        setCount(0)
    }
    
    function exitGame() {
        setIsStarted(false)
        resetGame()
    }

    function toggleSignUp() {
        setIsOpenSignUp(prevOpen => !prevOpen)
        if(isStarted) exitGame()
    }
        
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => !tenzies && holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <Navbar 
                isStarted={isStarted}
                tenzies={tenzies}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                resetGame={resetGame}
                setIsReset={setIsReset}  
                exitGame={exitGame}
                setIsRecordOpen={setIsRecordOpen} />
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
            {!isStarted && 
            <button 
                onClick={startGame} 
                className="btn-start" 
            >
                Start
                </button>
            }
            <Timer 
                isStarted={isStarted}
                sec={sec} 
                setSec={setSec} 
                tenzies={tenzies} 
                count={count} 
                user={currentUser}
                setUser={setCurrentUser}
                isReset={isReset}
                setIsReset={setIsReset} />
            {count === 0 && 
            tenzies && 
            <Popup user={currentUser} />}
            <div 
                className="dice-container"
            >
                {diceElements}
            </div>
            <div className="btn-container" >
                <button 
                    className="roll-dice" 
                    onClick={rollDice}
                >
                    {tenzies ? "New Game" : "Roll"}
                </button>
                    {count > 0 && 
                    <h4>{count} {count > 1 ? "rolls": "roll"}</h4>}
            </div>
            <Record 
                isRecordOpen={isRecordOpen}
                setIsRecordOpen={setIsRecordOpen}
                recordArray={recordArray} />
            {(!currentUser || !currentUser.online) &&
            <Login 
                toggleSignUp={toggleSignUp}
                setCurrentUser={setCurrentUser} 
                userArray={userArray} />}
            {isOpenSignUp && 
            <SignUp 
                toggleSignUp={toggleSignUp}
                setCurrentUser={setCurrentUser} 
                userArray={userArray} />}
        </main>
    )
}