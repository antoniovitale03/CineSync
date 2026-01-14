import api from "../../api";
import {useNotification} from "../../context/notificationContext";
import React, {useState} from "react";
import {Box, Button, FormControl, Input, InputLabel, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import sleep from "../hooks/useSleep";

export default function RegistrationForm({ email, setEmail, setStep }) {

    const {showNotification} = useNotification();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [button, setButton] = useState("Registrati");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setButton("Verifica in corso...");
        try{
            await api.post(`${process.env.REACT_APP_SERVER}/api/auth/registration`, { username, email, password });
            // Se la chiamata ha successo, mostra il messaggio di successo e passa al secondo step
            showNotification("Abbiamo inviato un codice di verifica alla tua mail (scade tra 1 minuto)", "success");
            await sleep(2000);
            setEmail(email);
            setStep(2);
        }catch(error){
            showNotification(error.response.data, "error")
            //in caso di errore (email o username già esistenti), mostro l'errore e resetto i dati di input
            setUsername("");
            setEmail("");
            setPassword("");
            setButton("Registrati");
        }
    }

    return (
        <Box>
            <Box component="form" onSubmit={handleSubmit}>

                <Typography component="h2" sx={{ textAlign: 'center', color:'#344e41' }}>Registrazione</Typography>
                <TextField label="Username" type="text" variant="outlined" value={username} onChange={e => setUsername(e.target.value)} />
                <TextField label="Email" type="email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
                <TextField label="Password" type="password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
                {
                    button === "Registrati" ? <Button type="submit" variant="contained">{button}</Button> :
                        <Button loading variant="contained" loadingPosition="end">Verifica in corso</Button>
                }

            </Box>
            <Typography component="p" className="registration-login-link">Hai già un account? Clicca <Link to="/login" style={{ color: 'white' }}>qui</Link> per loggarti. </Typography>
        </Box>

    )
}