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
import { loginPath, URLS, UserInfo } from "Constant";
import ICustomerData from "Interface";

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

function sortDatabyName(data: ICustomerData[]) {
    data.sort(function (a: ICustomerData, b: ICustomerData) {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        }

        return 0;
    });
    return data;
}
function sortDatabyArea(data: ICustomerData[]) {
    data.sort(function (a: ICustomerData, b: ICustomerData) {
        if (a.area < b.area) {
            return -1;
        } else if (a.area > b.area) {
            return 1;
        }

        return 0;
    });
    return data;
}
function sortDatabyExpiry(data: ICustomerData[]) {
    data.sort(function (a: ICustomerData, b: ICustomerData) {
        if (a.expiry_date < b.expiry_date) {
            return 1;
        } else if (a.expiry_date > b.expiry_date) {
            return -1;
        }

        return 0;
    });
    return data;
}
function Dashboard() {
    const history = useHistory();
    const classes = useStyles();
    const apiUrl = new URLS();
    const [customerData, setCustomerData] = React.useState<ICustomerData[]>([]);
    const [originalData, setOriginalData] = React.useState<ICustomerData[]>([]);
    const [state, setState] = React.useState({
        age: "",
        name: "hai",
    });
    const userInfo = new UserInfo();

    if (localStorage.getItem(userInfo.id) === null) history.push(loginPath);
    const handleChange = (event: any) => {
        const name1 = event.target.name;
        setState({
            ...state,
            [name1]: event.target.value,
        });
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { data } = useQuery<ICustomerData[]>("courseList", () =>
        fetch(apiUrl.customerData).then((res) => res.json())
    );

    React.useEffect(() => {
        setCustomerData(data || []);
        setOriginalData(data || []);
    }, data);

    const getData = () => {
        axios.get(apiUrl.customerData).then((res) => {
            setCustomerData(res.data);
            setOriginalData(res.data);
        });
    };

    const sortByName = (e: any) => {
        const a = originalData.slice();

        if (e.target.value === "name") {
            const sortd = sortDatabyName(a);

            setCustomerData(sortd);
        } else if (e.target.value === "area") {
            const sortd = sortDatabyArea(a);

            setCustomerData(sortd);
        } else if (e.target.value === "expiryDate") {
            const sortd = sortDatabyExpiry(a);

            setCustomerData(sortd);
        } else getData();
    };

    const search = (e: any) => {
        const searchData = [];
        for (let i = 0; i < originalData.length; i += 1) {
            if (
                originalData[i].name.indexOf(e.target.value) !== -1 ||
                originalData[i].car_number.indexOf(e.target.value) !== -1 ||
                originalData[i].phone_number.indexOf(e.target.value) !== -1
            ) {
                searchData.push(originalData[i]);
            }
        }

        setCustomerData(searchData);
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
                                        onChange={(e) => search(e)}
                                        onClick={(e) => search(e)}
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
                                        <Select native onChange={sortByName}>
                                            <option value="none">None</option>
                                            <option value="name">Name</option>
                                            <option value="expiryDate">
                                                Expiry Date
                                            </option>
                                            <option value="area">Area</option>
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
