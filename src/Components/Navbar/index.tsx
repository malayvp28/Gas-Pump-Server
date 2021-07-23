import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Drawer,
    ListItemText,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ForumIcon from "@material-ui/icons/Forum";
import ClearIcon from "@material-ui/icons/Clear";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AddBoxIcon from "@material-ui/icons/AddBox";
import {
    allCustomerPath,
    dealerPath,
    employeesPath,
    franchisePath,
    loginPath,
    newCustomerPath,
    queryPath,
    statisticPath,
    UserInfo,
} from "Constant";
import "./style.css";
import Dialog from "Components/Modal/Dialog";

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

    const allCustomer = () => {
        history.push(allCustomerPath);
    };
    const dealer = () => {
        history.push(dealerPath);
    };
    const franchise = () => {
        history.push(franchisePath);
    };
    const employee = () => {
        history.push(employeesPath);
    };
    const query = () => {
        history.push(queryPath);
    };
    const [dialogOpen, setDialogOpen] = React.useState(true);

    const handleClickOpen = () => {
        setSideBar(false);
        setDialogOpen(true);
    };

    const logout = () => {
        localStorage.removeItem(userInfo.name);
        localStorage.removeItem(userInfo.phoneNumber);
        localStorage.removeItem(userInfo.username);
        history.push(loginPath);
    };
    const handleClose = () => {
        setDialogOpen(false);
    };
    return (
        <div>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={logout} color="secondary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon
                            onClick={handleSideBar}
                            className="menu-icon"
                        />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Yolo Service
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
                        <ListItem button onClick={newCustomer} disabled>
                            <ListItemAvatar>
                                <Avatar
                                    style={{ height: "28pt", width: "28pt" }}
                                />
                            </ListItemAvatar>

                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button onClick={allCustomer}>
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
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button onClick={newCustomer}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PeopleAltIcon
                                        style={{
                                            height: "22pt",
                                            width: "22pt",
                                        }}
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="New Customer" />
                        </ListItem>

                        <ListItem button onClick={employee}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PeopleAltIcon
                                        style={{
                                            height: "22pt",
                                            width: "22pt",
                                        }}
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Employees" />
                        </ListItem>
                        <ListItem button onClick={query}>
                            <ListItemAvatar>
                                <Avatar>
                                    <ForumIcon
                                        style={{
                                            height: "22pt",
                                            width: "22pt",
                                        }}
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Queries" />
                        </ListItem>
                        <ListItem button onClick={franchise} disabled>
                            <ListItemAvatar>
                                <Avatar>
                                    <PeopleAltIcon
                                        style={{
                                            height: "22pt",
                                            width: "22pt",
                                        }}
                                    />
                                </Avatar>
                            </ListItemAvatar>

                            <ListItemText primary="Franchise" />
                        </ListItem>
                        <ListItem button onClick={dealer} disabled>
                            <ListItemAvatar>
                                <Avatar>
                                    <PeopleAltIcon
                                        style={{
                                            height: "22pt",
                                            width: "22pt",
                                        }}
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Dealer" />
                        </ListItem>

                        <ListItem button onClick={statistic} disabled>
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
                            <ListItemText primary="Statistic" />
                        </ListItem>
                        <ListItem button onClick={logout}>
                            <ListItemAvatar>
                                <Avatar>
                                    <ExitToAppIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Logout"
                                style={{ color: "red" }}
                            />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}
export default Navbar;
