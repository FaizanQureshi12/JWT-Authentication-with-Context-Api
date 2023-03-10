import './login.css'
import axios from "axios";
import { useState, useContext } from "react";
import { GlobalContext } from '../context/Context';
import { Button, TextField } from '@mui/material';

function Login() {

    let { state, dispatch } = useContext(GlobalContext);

    const [result, setResult] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/login`, {
                email: email,
                password: password
            }, {
                withCredentials: true
            })
            dispatch({
                type: 'USER_LOGIN',
                payload: null
            })
            console.log("login successful");
            setResult("login successful")
        } catch (error) {
            console.log(error.name);
            console.log(error.message);
            console.log(error.response.data);
        }
    }

    return (
        <div className='box'>
            <h4>This is Login page</h4>
            {state.text}
            <form onSubmit={loginHandler} className="loginForm">

                <TextField
                    className="TextField"
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="username"
                    placeholder="email"
                    autoComplete="username"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <br />
                <br />

                <TextField
                    className="TextField"
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="current-password"
                    autoComplete="current-password"
                    placeholder="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <br /> <br />
                <Button className='btn' variant="outlined" type="submit">Login</Button>
            </form>
            <p>{result}</p>
        </div>
    )
}

export default Login;