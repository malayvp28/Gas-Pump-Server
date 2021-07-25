import {
    Button,
    FormControl,
    Grid,
    InputAdornment,
    InputBase,
    InputLabel,
    Select,
    TextField,
} from "@material-ui/core";
import Navbar from "Components/Navbar";
import Sidebar from "Components/SideBar";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import CachedIcon from "@material-ui/icons/Cached";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";

const useStyles = makeStyles((theme) => ({
    root: {},
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    formControl: {
        marginTop: "auto",
        marginRight: "10pt",
        marginLeft: "10pt",
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "rgb(240, 240, 240)",
        "&:hover": {
            backgroundColor: "rgb(200, 200, 200)",
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    chart: {
        height: "20px",
        width: "20px",
    },

    inputInput: {
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "30ch",
            "&:focus": {
                width: "40ch",
            },
        },
    },
}));
function Dealer() {
    const classes = useStyles();
    const [addForm, setAddForm] = React.useState(false);
    const handleForm = () => {
        if (addForm) setAddForm(false);
        else setAddForm(true);
    };
    return (
        <div>
            {/* navbar */}
            <Navbar />
            <div className="dashboard-container">
                <div className="sidebar-container">
                    <Sidebar />
                </div>
                <div className="table table-container">
                    <div className="data-container">
                        {" "}
                        <div className="data-title">
                            <h3 style={{ marginTop: "0px" }}>Dealers</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dealer;
