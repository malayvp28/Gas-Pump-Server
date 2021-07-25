import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Button, Drawer } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ClearIcon from "@material-ui/icons/Clear";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AddBoxIcon from "@material-ui/icons/AddBox";
import {
    allCustomerPath,
    APP_NAME,
    newCustomerPath,
    statisticPath,
    UserInfo,
} from "Constant";
import "./style.css";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    list: {
        width: "100%",
        maxWidth: 360,
        marginTop: "30pt",
        backgroundColor: theme.palette.background.paper,
    },
}));

function Navbar() {
    const userInfo = new UserInfo();
    const classes = useStyles();
    const history = useHistory();
    const [sidebar, setSideBar] = useState(false);
    const handleSideBar = () => {
        if (sidebar) setSideBar(false);
        else setSideBar(true);
    };

    const newCustomer = () => {
        history.push(newCustomerPath);
    };
    const statistic = () => {
        history.push(statisticPath);
    };
    const dashboard = () => {
        history.push(allCustomerPath);
    };
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon
                            onClick={handleSideBar}
                            className="menu-icon"
                        />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {APP_NAME}
                    </Typography>

                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                            <span className="userName">
                                {" "}
                                {localStorage.getItem(userInfo.name)}{" "}
                            </span>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={sidebar}>
                <div className="sidebar">
                    <List>
                        <Button
                            onClick={handleSideBar}
                            style={{
                                float: "right",
                                marginRight: "5pt",
                                marginTop: "5pt",
                                cursor: "pointer",
                            }}
                        >
                            <ClearIcon />
                        </Button>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                    style={{ height: "28pt", width: "28pt" }}
                                />
                            </ListItemAvatar>

                            <Button size="small" onClick={newCustomer}>
                                <span className="menu-btn"> Profile</span>
                            </Button>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <DashboardIcon
                                        style={{
                                            height: "22pt",
                                            width: "22pt",
                                        }}
                                    />
                                </Avatar>
                            </ListItemAvatar>

                            <Button
                                size="small"
                                className="menu-btn"
                                onClick={dashboard}
                            >
                                <span className="menu-btn"> Dashboard</span>
                            </Button>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AddBoxIcon
                                        style={{
                                            height: "22pt",
                                            width: "22pt",
                                        }}
                                    />
                                </Avatar>
                            </ListItemAvatar>

                            <Button
                                size="small"
                                className="menu-btn"
                                onClick={newCustomer}
                            >
                                <span className="menu-btn"> Add customer</span>
                            </Button>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <EqualizerIcon
                                        style={{
                                            height: "22pt",
                                            width: "22pt",
                                        }}
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <Button
                                size="small"
                                className="menu-btn"
                                onClick={statistic}
                            >
                                <span className="menu-btn"> Statistic</span>
                            </Button>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ExitToAppIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <Button size="small" onClick={newCustomer}>
                                <span className="logout-btn"> Logout</span>
                            </Button>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}
export default Navbar;
