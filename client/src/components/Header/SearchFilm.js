import {Box, Button, IconButton, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useNotification} from "../../context/notificationContext";
import {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchFilm(){
    const navigate = useNavigate();
    const showNotification = useNotification();

    const [title, setTitle] = useState("");

    const handleSearch = async () => {
        try{
            navigate(`/search/${title.replaceAll(" ", "-")}`);
            setTitle("");
        }catch(error){
            showNotification(error.response.data, "error");
            setTitle("");
        }
    }
    return(
        <Box component="form" onSubmit={handleSearch}>
            <TextField type="search" id="outlined-basic" placeholder="Cerca un film..." variant="outlined" value={title} onChange={ (e) => setTitle(e.target.value) } />
            <IconButton onClick={handleSearch}>
                <SearchIcon/>
            </IconButton>
        </Box>
    )
}