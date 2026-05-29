import {useEffect, useState} from "react";
import api from "../../api";

function useAllGenres() {

    const [genres, setGenres] = useState(null);
    useEffect(() => {
            const fetchGenres = async () => {
                    const response = await api.get(`${process.env.REACT_APP_SERVER}/api/films/get-all-genres`);
                    const genres = await response.data;
                    setGenres(genres);
            }
            fetchGenres();
            }, [])
    return genres;
}

export default useAllGenres;