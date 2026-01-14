import {useAuth} from "../../context/authContext";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ListIcon from "@mui/icons-material/List";
import {Avatar, Box, Button, Divider, ListItemIcon, MenuItem, Tooltip} from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

import {Link} from "react-router-dom";
import {useState} from "react";
import DropDownMenu from "../DropDownMenu";
export default function UserMenu() {
    const {user, logout} = useAuth();
    const [anchorEl, setAnchorEl] = useState(null); //elemento di ancoraggio del menu (in questo caso il bottone)

    const links = ['/', `/${user?.username}/profile`, `/${user?.username}/watched`, `/${user?.username}/favorites`, `/${user?.username}/reviews`, `/${user?.username}/watchlist`, `/${user?.username}/lists`];
    const names = ["Home", "Il mio profilo", "Film visti", "I miei preferiti", "Le mie recensioni", "Film da guardare", "Le mie liste"];
    const icons = [<HomeIcon />, <PersonIcon />, <VisibilityIcon />, <FavoriteIcon />, <RateReviewIcon/>, <WatchLaterIcon />, <ListIcon />];

    const settingsMenuNames = ["Modifica il mio profilo", "Modifica la mia password", "Elimina il tuo account"];
    const settingsMenuLinks = ["/settings/modify-profile", "/settings/modify-password", "/settings/delete-account"];

    const menu =
        <Box>
            {
                links.map((link, index) =>
                    <MenuItem component={Link} to={link} onClick={() => setAnchorEl(null)}>
                        <ListItemIcon>{icons[index]}</ListItemIcon>{names[index]}
                    </MenuItem>)
            }
            <Divider><strong>Impostazioni</strong></Divider>
            {
                settingsMenuLinks.map((menuLink, index) =>
                    <MenuItem component={Link} to={menuLink} onClick={() => setAnchorEl(null)}>
                        <ListItemIcon><Settings /></ListItemIcon>{settingsMenuNames[index]}
                    </MenuItem>)
            }
            <Divider key="divider2" />
            <MenuItem component={Button} key={10102} onClick={logout}>
                Logout
            </MenuItem>
        </Box>


    return(
        <DropDownMenu buttonContent={<Tooltip title={user?.username}><Avatar/></Tooltip>}
                      menuContent={menu} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    )
}