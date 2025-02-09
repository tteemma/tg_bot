import {useState} from "react";
import axios from "axios";

export default function Register() {

    const [register, setRegister] = useState({
        username: "",
        email: "",
        password: ""
    })

    const registerUser = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value // Убираем квадратные скобки
        })
    }

    const submitRegister = async (e) => {
        e.preventDefault()
        console.log(register)

        try {
            const resp = await axios.post("http://localhost:8080/api/v1/users/addUser",register)
            console.log(resp.data)
            alert("User successfully register")
            setRegister({ username: "", email: "", password: "" });

        } catch (err){
            console.log(err)
        }
    }


    return (
        <div className="container">
            <form onSubmit={submitRegister}>
                <h2>Register</h2>
                <label htmlFor="email">UserEmail:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email"
                       value={register.email} onChange={registerUser}/>


                <label htmlFor="name">Username</label>
                <input type="text" id="username" name="username" value={register.username} placeholder="enter username"
                       onChange={registerUser}/>

                <label htmlFor="pass">Password:</label>
                <input type="password" id="pass" name="password" placeholder="Enter your password"
                       value={register.password} onChange={registerUser}/>

                {/*<a onClick={RedirectToLogin}>If you already t have an account</a>*/}
                <button type="submit">Register</button>
            </form>
        </div>
    )
}