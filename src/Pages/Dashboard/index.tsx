import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Table from "Components/Table";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import CachedIcon from "@material-ui/icons/Cached";
import { useHistory } from "react-router-dom";

import "./style.css";
import Navbar from "Components/Navbar";
import Sidebar from "Components/SideBar";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { URLS } from "Constant";

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

function Dashboard() {
    const history = useHistory();
    const classes = useStyles();
    const apiUrl = new URLS();
    const [customerData, setCustomerData] = React.useState();
    const [state, setState] = React.useState({
        age: "",
        name: "hai",
    });

    const handleChange = (event: any) => {
        const name1 = event.target.name;
        setState({
            ...state,
            [name1]: event.target.value,
        });
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { data } = useQuery<any>("courseList", () =>
        fetch(apiUrl.customerData).then((res) => res.json())
    );
    React.useEffect(() => {
        setCustomerData(data);
    }, data);

    const getData = () => {
        axios.get(apiUrl.customerData).then((res) => {
            setCustomerData(res.data);
        });
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
                            <h3 style={{ marginTop: "0px" }}>All Customer</h3>
                        </div>
                        <div className="table_option table_option_margin">
                            <div style={{ display: "flex" }}>
                                {" "}
                                <div className="refreshIcon">
                                    <Button
                                        variant="outlined"
                                        onClick={getData}
                                    >
                                        <CachedIcon />
                                    </Button>
                                </div>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ "aria-label": "search" }}
                                    />
                                </div>
                            </div>
                            <div className="table_option option_btn_container">
                                <div>
                                    {" "}
                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        <InputLabel htmlFor="age-native-simple">
                                            Sort
                                        </InputLabel>
                                        <Select native>
                                            <option value="None">None</option>
                                            <option value={10}>Name</option>
                                            <option value={20}>
                                                Expiry Date
                                            </option>
                                            <option value={30}>Area</option>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <Table row={customerData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
