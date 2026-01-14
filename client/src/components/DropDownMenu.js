import {Box, Button, Menu} from '@mui/material';
export default function DropDownMenu({ buttonContent, menuContent, anchorEl, setAnchorEl } ) {
    return (
        <Box>
            <Button onClick={(event) => setAnchorEl(event.currentTarget)}>
                {buttonContent}
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={ () => setAnchorEl(null) }>
                {menuContent}
            </Menu>
        </Box>
    )
}
//isMenuOpen al click del bottone diventa l'emento nel dom (come il bottone) che il menu usa come ancora
//quindi o è null o è un elemento DOM
