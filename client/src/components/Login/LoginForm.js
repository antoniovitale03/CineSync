import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {useAuth} from "../../context/authContext";
import {useNotification} from "../../context/notificationContext";
import {Link} from "react-router-dom";
import api from "../../api";
import sleep from "../hooks/useSleep";
import "../../CSS/Form.css"


export default function LoginForm({  setStep, email, setEmail }) {

    const {setUser} = useAuth();
    const {showNotification} = useNotification();

    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
            const response = await api.post(`${process.env.REACT_APP_SERVER}/api/auth/login`, { email, password });
            const user = await response.data; //data contiene i dati dell'utente + accessToken (che verranno salvati nella
            // variabile di stato user e nella memoria locale del browser)
            setUser(user);
        } catch (error) {
            showNotification(error.response.data, "error")
            setEmail("");
            setPassword("");
        }
    };

    const handleForgotPassword = async (event) => {
        event.preventDefault();
        try {
            //invio la mail con il codice di verifica
            await api.post(`${process.env.REACT_APP_SERVER}/api/auth/forgot-password`, { email });
            showNotification("Abbiamo inviato un codice di verifica alla tua mail", "success");
            setStep(2);
            await sleep(1500);
        } catch (error) {
            showNotification(error.response.data, "error")
        }
    }

    return(
        <Box>
            <Box component="form" onSubmit={handleLogin}>

                <Typography component="h2" sx={{ textAlign: 'center', color:'#344e41' }}>Login</Typography>

                <TextField label="Email" type="email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
                <TextField label="Password" type="password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />

                <Button variant="contained" type="submit">Accedi</Button>
            </Box>

            <Box className="forgot-password-container">
                <Button className="link-style-button" onClick={handleForgotPassword} disabled={email === ""}>
                    Hai dimenticato la password?
                </Button>
            </Box>
            <Typography component="p" className="registration-login-link">Se non hai ancora un account, clicca <Link to="/registration" style={{ color: 'white' }}>qui</Link> per registrarti. </Typography>
        </Box>
    )
}