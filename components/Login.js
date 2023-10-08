import React from "react"

export default function Login(props) {
    
    const [userData, setUserData] = React.useState({
        username: "",
        password: "",
        remember: false
    })
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: type === "checkbox" ? checked : value
        }))
    }
    
    function handleLogin(event) {
        event.preventDefault()
        const loggedUser = props.userArray.find(user => {
            return  user.username === userData.username &&
                    user.password === userData.password
        })
        if (loggedUser) {
            props.setCurrentUser({
                ...loggedUser,
                remember: userData.remember,
                online: true
            })
        } else {
            alert("username or password wrong")
        }   
    }
    
    return (
        <form className="form form--login" onSubmit={handleLogin}>
            <input 
                type="text"
                placeholder="Enter your username"
                className="form--input"
                name="username"
                onChange={handleChange}
                value={userData.username}
                required
            />
            <input 
                type="password" 
                placeholder="Password"
                className="form--input"
                name="password"
                onChange={handleChange}
                value={userData.password}
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
                <label htmlFor="rememberMe">Remember me</label>
            </div>
            <button 
                className="form--submit"
            >
                Login
            </button>
            <p className="signup-text">Don't have an account? 
                <span 
                    className="signup-link" 
                    onClick={props.toggleSignUp} 
                    >
                    Sign up
                </span>
            </p>
        </form>
    )
}