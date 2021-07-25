import Navbar from "Components/Navbar";
import Sidebar from "Components/SideBar";
import {
    Button,
    FormControl,
    Grid,
    InputAdornment,
    InputBase,
    InputLabel,
    Select,
    Snackbar,
    TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CachedIcon from "@material-ui/icons/Cached";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "Components/Modal/Dialog";
import React from "react";
import "./style.css";
import EmployeeTable from "Components/EmployeeTable";
import { useQuery } from "react-query";
import { loginPath, URLS, UserInfo } from "Constant";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Alert(props: any) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Employees() {
    const [addForm, setAddForm] = React.useState(false);
    const apiUrl = new URLS();
    const userInfo = new UserInfo();
    const [employeeData, setEmployeeData] = React.useState<any>();
    const [name, setName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [error, setError] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorStatus, setErrorStatus] = React.useState(false);
    const [responseStatus, setResponseStatus] = React.useState(false);
    const [responseType, setResponseType] = React.useState(true);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [id, setId] = React.useState(0);

    const history = useHistory();

    if (localStorage.getItem(userInfo.id) === null) history.push(loginPath);
    const { data } = useQuery<any>("courseList", () =>
        fetch(apiUrl.employeeData).then((res) => res.json())
    );
    React.useEffect(() => {
        setEmployeeData(data);
    }, data);

    const getData = () => {
        axios.get(apiUrl.employeeData).then((res) => {
            setEmployeeData(res.data);
        });
    };

    const callSaveDataApi = () => {
        const empData: any = {
            name,
            phone_number: phoneNumber,
            password,
        };

        axios.post(apiUrl.saveEmployee, empData).then((res: any) => {
            setResponseType(true);
            setResponseStatus(true);
            if (res.data.message === "Ok") {
                setResponseType(false);

                setError("Employee saved successfully...");
                getData();
            } else {
                setError("Something went to wroung !!");
            }
        });
    };

    const saveData = (e: any) => {
        e.preventDefault();
        setErrorStatus(false);

        if (name === "") {
            setError("Please enter customer name !!");
            setErrorStatus(true);
        } else if (phoneNumber.length !== 10) {
            setError("Please provide valid 10 digits phone number !!");
            setErrorStatus(true);
        } else if (password.length <= 4) {
            setError("Password too short!!");
            setErrorStatus(true);
        } else {
            callSaveDataApi();
        }
    };
    const handleSnackbarClose = () => {
        setResponseStatus(false);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };
    const handleModalOpen = (id2: number) => {
        setId(id2);
        setModalOpen(true);
    };

    const deleteEmployee = () => {
        const eData = {
            admin_id: localStorage.getItem(userInfo.id),
            employee_id: id,
        };
        axios.post(apiUrl.deleteEmployee, eData).then((res: any) => {
            setResponseType(true);
            setResponseStatus(true);
            if (res.data.message === "Ok") {
                setResponseType(false);

                setError("Employee delete successfully...");
                getData();
            } else {
                setError("Something went to wroung !!");
            }
        });
    };
    const action = () => {
        setModalOpen(false);
        deleteEmployee();
    };
    return (
        <div>
            {/* navbar */}
            <Navbar />
            <Snackbar
                open={responseStatus}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity={responseType ? "error" : "success"}>
                    {error}
                </Alert>
            </Snackbar>
            <Dialog
                modalOpen={modalOpen}
                handleModalClose={handleModalClose}
                handleModalOpen={handleModalOpen}
                action={action}
                title="Delete Data"
            />
            <div className="dashboard-container">
                <div className="sidebar-container">
                    <Sidebar />
                </div>
                <div className="table table-container">
                    <div className="data-container">
                        {" "}
                        <div className="data-title">
                            <h3 style={{ marginTop: "0px" }}>Employees</h3>
                        </div>
                        <div className="employee-container">
                            <Grid container spacing={2}>
                                <Grid item md={12}>
                                    <Grid container spacing={1}>
                                        <Grid item md={11} xs={11}>
                                            <Collapse in={errorStatus}>
                                                <Alert severity="error">
                                                    {error}
                                                </Alert>
                                            </Collapse>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                required
                                                id="standard-required"
                                                size="small"
                                                label="Employee Name"
                                                fullWidth
                                                variant="filled"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start" />
                                                    ),
                                                }}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                required
                                                id="standard-required"
                                                size="small"
                                                type="number"
                                                label="Employee Phone Number"
                                                fullWidth
                                                variant="filled"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start" />
                                                    ),
                                                }}
                                                onChange={(e) => {
                                                    setPhoneNumber(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <TextField
                                                required
                                                id="standard-required"
                                                size="small"
                                                type="password"
                                                label="Password"
                                                fullWidth
                                                variant="filled"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start" />
                                                    ),
                                                }}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item md={12}>
                                            {" "}
                                            <Button
                                                color="primary"
                                                onClick={saveData}
                                                variant="contained"
                                            >
                                                Save Employee
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={7}>
                                    <Button
                                        variant="outlined"
                                        style={{ marginBottom: "6px" }}
                                    >
                                        <CachedIcon onClick={getData} />
                                    </Button>
                                    <EmployeeTable
                                        row={employeeData}
                                        deleteData={handleModalOpen}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Employees;
function setCustomerData(data: any) {
    throw new Error("Function not implemented.");
}
