import {
    Avatar,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
} from "@material-ui/core";
import React from "react";
import "./style.css";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import ForumIcon from "@material-ui/icons/Forum";
import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
    allCustomerPath,
    dealerPath,
    employeesPath,
    franchisePath,
    newCustomerPath,
    statisticPath,
    UserInfo,
    loginPath,
    queryPath,
} from "Constant";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Sidebar() {
    const classes = useStyles();
    const history = useHistory();
    const userInfo = new UserInfo();
    const [open, setOpen] = React.useState(true);
    const newCustomer = () => {
        history.push(newCustomerPath);
    };
    const statistic = () => {
        history.push(statisticPath);
    };
    const Customer = () => {
        setOpen(!open);
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
    const logout = () => {
        localStorage.removeItem(userInfo.name);
        localStorage.removeItem(userInfo.phoneNumber);
        localStorage.removeItem(userInfo.username);
        localStorage.removeItem(userInfo.id);
        history.push(loginPath);
    };

    const [modalOpen, setModalOpen] = React.useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    return (
        <div className="sidebar-main">
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={modalOpen}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalOpen}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Transition modal</h2>
                        <p id="transition-modal-description">
                            react-transition-group animates me.
                        </p>
                    </div>
                </Fade>
            </Modal>

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

            <div>
                <List>
                    <ListItem button onClick={newCustomer} disabled>
                        <ListItemAvatar>
                            <Avatar style={{ height: "28pt", width: "28pt" }} />
                        </ListItemAvatar>

                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button onClick={allCustomer}>
                        <ListItemAvatar>
                            <Avatar>
                                <DashboardIcon
                                    style={{ height: "22pt", width: "22pt" }}
                                />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button onClick={newCustomer}>
                        <ListItemAvatar>
                            <Avatar>
                                <PeopleAltIcon
                                    style={{ height: "22pt", width: "22pt" }}
                                />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="New Customer" />
                    </ListItem>

                    <ListItem button onClick={employee}>
                        <ListItemAvatar>
                            <Avatar>
                                <PeopleAltIcon
                                    style={{ height: "22pt", width: "22pt" }}
                                />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Employees" />
                    </ListItem>
                    <ListItem button onClick={query}>
                        <ListItemAvatar>
                            <Avatar>
                                <ForumIcon
                                    style={{ height: "22pt", width: "22pt" }}
                                />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Queries" />
                    </ListItem>
                    <ListItem button onClick={franchise} disabled>
                        <ListItemAvatar>
                            <Avatar>
                                <PeopleAltIcon
                                    style={{ height: "22pt", width: "22pt" }}
                                />
                            </Avatar>
                        </ListItemAvatar>

                        <ListItemText primary="Franchise" />
                    </ListItem>
                    <ListItem button onClick={dealer} disabled>
                        <ListItemAvatar>
                            <Avatar>
                                <PeopleAltIcon
                                    style={{ height: "22pt", width: "22pt" }}
                                />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Dealer" />
                    </ListItem>

                    <ListItem button onClick={statistic} disabled>
                        <ListItemAvatar>
                            <Avatar>
                                <EqualizerIcon
                                    style={{ height: "22pt", width: "22pt" }}
                                />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Statistic" />
                    </ListItem>
                    <ListItem button onClick={handleClickOpen}>
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
        </div>
    );
}
export default Sidebar;
