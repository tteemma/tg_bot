import {useState} from "react";
import axios from "axios";

export default function Login() {

    const [password, setPasswordValue] = useState("");
    const [email, setEmailValue] = useState("");

    const loginUser = async (e) => {
        e.preventDefault()
        console.log("Our data: " + email + ":" + password)

        const data = {
            "userId": email,
            "password": password
        }
        try {
            const resp = await axios.post("http://localhost:8080/api/v1/users/loginUser", data)

            if (!resp.data)
                alert("Invalid email or password")
            else
                alert("Login success")
        } catch (error) {
            console.log(error)
        }
    }
    const setPassword = (e) => {
        setPasswordValue(e.target.value)
    }
    const setEmail = (e) => {
        setEmailValue(e.target.value)
    }
    const RedirectToRegister = () => {
        window.location.href = "/register"
    }


    return (
        <>
            <div className="container">
                <form onSubmit={loginUser}>
                    <h2>Login</h2>
                    <label>UserEmail:</label>
                    <input type="email" placeholder="Enter your email" value={email} onChange={setEmail}/>

                    <label htmlFor="pass">Password:</label>
                    <input type="password" placeholder="Enter your password" value={password} onChange={setPassword}/>

                    <a onClick={RedirectToRegister}>If you do not have an account</a>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )

}