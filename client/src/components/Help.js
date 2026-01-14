import React from "react";
import {useState} from "react";
import "../CSS/Form.css"
import {Box, Stack, Typography, TextField, Button} from "@mui/material";
import {useNotification} from "../context/notificationContext";
import useDocumentTitle from "./hooks/useDocumentTitle";
export default function Help(){
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const {showNotification} = useNotification();
    const [error, setError] = useState("");

    useDocumentTitle("Help");

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        try{
            setSuccessMessage("Avrai una risposta entro 48 ore.")
        } catch(error){
            showNotification(error.response.data, "error");
        }
    }

    return(
        <Box classname="page-container">
            <Box className="form-container">
                <Typography component="h5">Contattaci per avere supporto</Typography>
                <Stack component="form" spacing={5} onSubmit={handleSubmit}>
                    <TextField placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} variant="outlined"  />
                    <TextField placeholder="Titolo" value={title} onChange={(event) => setTitle(event.target.value)} variant="outlined" />
                    <TextField placeholder="Descrizione del problema" value={description} multiline rows={5} onChange={(event) => setDescription(event.target.value)} variant="outlined" />
                    <Button type="submit">Invia</Button>
                </Stack>
            </Box>
        </Box>
    )
}