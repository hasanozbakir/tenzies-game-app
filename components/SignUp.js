import React from "react"

export default function SignUp(props) {
    
    const [userData, setUserData] = React.useState({
        username: "",
        password: "",
        passwordConfirm: "",
        remember: false
    })
    
    const ref = React.useRef(null)
    
    React.useEffect(() => {
        const closeSignUp = (event) => {
            if (ref && ref.current && !ref.current.contains(event.target)) {
                props.toggleSignUp()
            }
        }
        document.body.addEventListener("mousedown", closeSignUp)
        
        return () => document.body.removeEventListener("mousedown", closeSignUp)
        
    },[])

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: type === "checkbox" ? checked : value
        }))
    }
    
    function handleSignUp(event) {
        event.preventDefault()
        if(userData.password === userData.passwordConfirm) {
            if(!props.userArray.some(user => user.username === userData.username)) {
                props.setCurrentUser({
                    username: userData.username,
                    password: userData.password,
                    record: 1000,
                    finishTime: 0,
                    remember: userData.remember,
                    online: true
                })
                props.toggleSignUp()
            } else {
                alert("Your username has been taken before")
            }
        } else {
            alert("Passwords do not match") 
        }
    }
    
    return (
        <form 
            ref={ref} 
            className="form form--signup" 
            onSubmit={handleSignUp}
        >
            <input 
                type="text"
                placeholder="Enter your username"
                className="form--input"
                pattern="^[a-zA-Z]+"
                name="username"
                onInvalid={e => e.target.setCustomValidity('Only letters allowed')}
                onInput={e => e.target.setCustomValidity('')}
                onChange={handleChange}
                value={userData.username}
                required
            />
            <input 
                type="password" 
                placeholder="Password"
                className="form--input"
                pattern="[^\s]+"
                name="password"
                onInvalid={e => e.target.setCustomValidity('Empty spaces not allowed')}
                onInput={e => e.target.setCustomValidity('')}
                onChange={handleChange}
                value={userData.password}
                required
            />
            <input 
                type="password" 
                placeholder="Confirm password"
                className="form--input"
                name="passwordConfirm"
                onChange={handleChange}
                value={userData.passwordConfirm}
                required
            />
            <div className="form--remember">
                <input
                    id="rememberMe"
                    type="checkbox"
                    name="remember"
                    onChange={handleChange}
                    checked={userData.remember}
                />
                <label 
                    htmlFor="rememberMe"
                >
                Remember me
                </label>
            </div>
            <button 
                className="form--submit signup--btn"
            >
                Sign Up
            </button>
        </form>
    )
}