import {Box, IconButton, MenuItem, Rating, TextField, Tooltip} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import api from "../../api";
import {useNotification} from "../../context/notificationContext";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DropDownMenu from "../DropDownMenu";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import ReviewsIcon from "@mui/icons-material/Reviews";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd';
import "../../CSS/FilmButton.css"
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import {useAuth} from "../../context/authContext"

export default function FilmButtons({ film }) {

    const {showNotification} = useNotification();
    const {user} = useAuth();
    //tutti i bottoni hanno stato 1 (in watchlist, ...) o stato 0 (non in watchlist, ...)

    const [buttons, setButtons] = useState({
        watchlist: film?.status?.isInWatchlist,
        liked: film?.status?.isLiked,
        review: film?.status?.isReviewed,
        favorite: film?.status?.isFavorite,
        watched: film?.status?.isWatched,
        lists: film?.status?.lists,
    });

    const [isReviewMenuOpen, setIsReviewMenuOpen] = useState(false);
    const [isListsMenuOpen, setIsListsMenuOpen] = useState(false);

    const [review, setReview] = useState("");
    //rating in quinti
    const [reviewRating, setReviewRating] = useState(0);

    const addToWatchlist = async (event) => {
        event.preventDefault();
        try{
            await api.post(`${process.env.REACT_APP_SERVER}/api/films/watchlist/add-to-watchlist`, { film });
            showNotification(<strong>"{film.title}" è stato aggiunto alla <a href={`/${user.username}/watchlist`} style={{ color: 'green' }}>watchlist</a></strong>, "success");
            setButtons({...buttons, watchlist: 1});
        }catch(error){
            showNotification(error.response.data, "error");
        }
    }


    const removeFromWatchlist = async (event) => {
        event.preventDefault();
        try{
            await api.delete(`${process.env.REACT_APP_SERVER}/api/films/watchlist/remove-from-watchlist/${film.id}`);
            showNotification(<strong>"{film.title}" è stato rimosso dalla <a href={`/${user.username}/watchlist`} style={{ color: 'green' }}>watchlist</a></strong>, "success")
            setButtons({...buttons, watchlist: 0});
        }catch(error){
            showNotification(error.response.data, "error");
        }
    }

    const addToLiked = async (event) => {
        event.preventDefault();
        try{
            await api.post(`${process.env.REACT_APP_SERVER}/api/films/liked/add-to-liked`, { film });
            showNotification(<strong>"{film.title}" è stato aggiunto ai film piaciuti</strong>, "success");
            setButtons({...buttons, liked: 1});
        }catch(error){
            showNotification(error.response.data, "error");
        }
    }

    const removeFromLiked = async (event) => {
        event.preventDefault();
        try{
            await api.delete(`${process.env.REACT_APP_SERVER}/api/films/liked/remove-from-liked/${film.id}`);
            showNotification(<strong>"{film.title}" è stato rimosso dai film piaciuti</strong>, "success");
            setButtons({...buttons, liked: 0});
        }catch(error){
            showNotification(error.response.data, "error");
        }

    }

    const addReview = async (film, review, reviewRating) => {
        try {
            setIsReviewMenuOpen(false);
            await api.post(`${process.env.REACT_APP_SERVER}/api/films/reviews/add-review`, {
                film, review, reviewRating
            });
            showNotification(<strong>Hai aggiunto "{film.title}" alle tue <a href={`/${user.username}/reviews`} style={{ color: 'green' }}>recensioni</a></strong>, "success");
            setButtons({...buttons, review: 1});
            setReviewRating(0);
            setReview("");
        }catch(error){
            showNotification(error.response.data, "error");
        }
    }

    const reviewMenuItems = (
        <Box>
            <TextField id="outlined-multiline-flexible" multiline rows={7} sx= {{ width: '350px' }} label="Scrivi la recensione" value={review} onChange={(e) => setReview(e.target.value)} />
            <Rating name="review-rating" value={reviewRating} onChange={(event, rating) => setReviewRating(rating)} precision={0.5} />
            <IconButton onClick={() => addReview(film, review, reviewRating)}>
                Salva
            </IconButton>
        </Box>
    )


    const deleteReview = async (event) => {
        event.preventDefault();
        try{
            await api.delete(`${process.env.REACT_APP_SERVER}/api/films/reviews/delete-review/${film.id}`);
            showNotification(<strong>Hai rimosso "{film.title}" dalle tue <a href={`/${user.username}/reviews`} style={{ color: 'green' }}>recensioni</a></strong>, "success");
            setButtons({...buttons, review: 0});
        }catch(error){
            showNotification(error.response.data, "error");
        }
    }

    const addToFavorites = async (event) => {
        event.preventDefault();
        try{
            await api.post(`${process.env.REACT_APP_SERVER}/api/films/favorites/add-to-favorites`, { film });
            showNotification(<strong>"{film.title}" è stato aggiunto ai tuoi <a href={`/${user.username}/favorites`} style={{ color: 'green' }}>preferiti</a></strong>, "success")
            setButtons({...buttons, favorite: 1});
        }catch(error){
            showNotification(error.response.data, "error");
        }
    }

    const removeFromFavorites = async (event) => {
        event.preventDefault();
        try{
            await api.delete(`${process.env.REACT_APP_SERVER}/api/films/favorites/remove-from-favorites/${film.id}`);
            showNotification(<strong>"{film.title}" è stato rimosso dai tuoi <a href={`/${user.username}/favorites`} style={{ color: 'green' }}>preferiti</a></strong>, "success")
            setButtons({...buttons, favorite: 0});
        }catch(error){
            showNotification(error.response.data, "error");
        }

    }

    const addToWatched = async (event) => {
        event.preventDefault();
        try{
            await api.post(`${process.env.REACT_APP_SERVER}/api/films/watched/add-to-watched`, { film });
            showNotification(<strong>"{film.title}" è stato aggiunto ai tuoi <a href={`/${user.username}/watched`} style={{ color: 'green' }}>film visti</a></strong>, "success")
            setButtons({...buttons, watched: 1, watchlist: 0});
            //se ho visto un film, ovviamente viene eliminato dalla watchlist automaticamente
        }catch(error){
            showNotification(error.response.data, "error");
        }
    }

    const removeFromWatched = async (event) => {
        event.preventDefault();
        try{
            await api.delete(`${process.env.REACT_APP_SERVER}/api/films/watched/remove-from-watched/${film.id}`);
            showNotification(<strong>"{film.title}" è stato rimosso dai tuoi <a href={`/${user.username}/watched`} style={{ color: 'green' }}>film visti</a></strong>, "success")
            setButtons({...buttons, watched: 0});
        }catch(error){
            showNotification(error.response.data, "error");
        }
    }


    const addToList = async (list) => {
        try{
            await api.post(`${process.env.REACT_APP_SERVER}/api/films/lists/add-to-list/${list.name}`, {film});
            showNotification(<strong>"{film.title}" aggiunto alla lista <a href={`/${user.username}/${list.name}/list`} style={{ color: 'green' }}>{list.name}</a></strong>, "success")
            setIsListsMenuOpen(false);
            setButtons({...buttons, lists: buttons.lists.map(l => l.name === list.name ? {...l, isInList: !l.isInList} : l)});
        }catch(error){
            showNotification(error.response.data, "error")
        }
    }

    const removeFromList = async (list) => {
        try{
            await api.delete(`${process.env.REACT_APP_SERVER}/api/films/lists/remove-from-list/${film._id}/${list.name}`);
            showNotification(<strong>"{film.title}" rimosso da <a href={`/${user.username}/${list.name}/list`} style={{ color: 'green' }}>"{list.name}"</a></strong>, "success")
            setIsListsMenuOpen(false);
            setButtons({...buttons, lists: buttons.lists.map(l => l.name === list.name ? {...l, isInList: !l.isInList} : l)});
        }catch(error){
            showNotification(error.response.data, "error")
        }
    }

    const listsMenu = [
        buttons.lists?.map( list =>
            <MenuItem key={list.name}>
                <IconButton onClick={ () => {
                    if (list.isInList) {
                        removeFromList(list);
                    } else {
                        addToList(list);
                    }
                } }>
                    {list.isInList ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
                {list.name}
            </MenuItem>
        )
    ]

    useEffect(() => {
        if (film) {
            setButtons({
                watchlist: film.status?.isInWatchlist || 0,
                liked: film.status?.isLiked || 0,
                review: film.status?.isReviewed || 0,
                favorite: film.status?.isFavorite || 0,
                watched: film.status?.isWatched || 0,
                lists: film.status?.lists || [],
            });
        }
    }, [film]);

    return(
        <Box className="box-button">
            {/* WATCHLIST */}
            <Tooltip title={!buttons.watchlist ? "Aggiungi alla watchlist" : "Rimuovi dalla watchlist"}>
                <IconButton onClick={!buttons.watchlist ? addToWatchlist : removeFromWatchlist}>
                    {!buttons.watchlist ? <AccessTimeIcon className="icon" />
                        : <AccessTimeFilledIcon className="icon time-icon" />
                    }
                </IconButton>
            </Tooltip>

            {/* LIKED */}
            <Tooltip title={!buttons.liked ? "Aggiungi ai film piaciuti" : "Rimuovi dai film piaciuti"}>
                <IconButton onClick={!buttons.liked ? addToLiked : removeFromLiked}>
                    {!buttons.liked ?
                        <ThumbUpOffAltIcon className="icon" /> :
                        <ThumbUpIcon className="icon" id="thumb-icon" />
                    }
                </IconButton>
            </Tooltip>

            {/* REVIEW */}
            {!buttons.review ?
                <DropDownMenu buttonContent={<Tooltip title="Aggiungi una recensione"><ReviewsOutlinedIcon className="icon" /></Tooltip>}
                              menuContent={reviewMenuItems} isMenuOpen={isReviewMenuOpen} setIsMenuOpen={setIsReviewMenuOpen} /> :
                <Tooltip title="Rimuovi la recensione">
                    <IconButton onClick={deleteReview}>
                        <ReviewsIcon className="icon"/>
                    </IconButton>
                </Tooltip>
            }

            {/* FAVORITE */}
            <Tooltip title={!buttons.favorite ? "Aggiungi ai film preferiti" : "Rimuovi dai film preferiti"}>
                <IconButton onClick={!buttons.favorite ? addToFavorites : removeFromFavorites}>
                    {!buttons.favorite ?
                        <FavoriteBorderIcon className="icon"/>:
                        <FavoriteIcon className="icon" id="favorite-icon" />
                    }
                </IconButton>
            </Tooltip>

            {/* WATCHED */}
            <Tooltip title={!buttons.watched ? "Aggiungi ai film visti" : "Rimuovi dai film visti"}>
                <IconButton onClick={!buttons.watched ? addToWatched : removeFromWatched}>
                    {!buttons.watched ?
                        <AddCircleOutlineIcon className="icon" />:
                        <RemoveCircleOutlineIcon className="icon remove-icon" />
                    }
                </IconButton>
            </Tooltip>

            {/* LISTS */}
            <Tooltip title="Aggiungi o rimuovi dalla lista">
                <DropDownMenu buttonContent={<FormatListBulletedAddIcon className="icon"/>}
                              menuContent={listsMenu} isMenuOpen={isListsMenuOpen} setIsMenuOpen={setIsListsMenuOpen} />
            </Tooltip>
        </Box>
    )
}