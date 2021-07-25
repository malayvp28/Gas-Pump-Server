import React from "react";
import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { APP_NAME } from "Constant";
import PublicQuery from "../PublicQuery";
import SignIn from "../../Components/SignIn";
import StickyFooter from "../../Components/Footer";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
function HomePage() {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {APP_NAME}
                    </Typography>
                </Toolbar>
            </AppBar>
            <SignIn />
            <PublicQuery />
            <StickyFooter />
        </div>
    );
}
export default HomePage;
