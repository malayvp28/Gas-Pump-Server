import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    NativeSelect,
    Radio,
    RadioGroup,
    Select,
    Snackbar,
    TextField,
} from "@material-ui/core";
import clsx from "clsx";
import SettingsIcon from "@material-ui/icons/Settings";
import Navbar from "Components/Navbar";
import "./style.css";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import React from "react";
import LooksIcon from "@material-ui/icons/Looks";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Sidebar from "Components/SideBar";
import { loginPath, Message, URLS, UserInfo } from "Constant";
import axios from "axios";
import Dialog from "Components/Modal/Dialog";
import Collapse from "@material-ui/core/Collapse";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: "25ch",
        },
    })
);

function Alert(props: any) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function NewCustomer() {
    const classes = useStyles();

    const message = new Message();

    const apiUrl = new URLS();
    const [area, setArea] = React.useState("Lunawada");
    const [customerName, setCustomerName] = React.useState("");
    const [contactNo, setContactNo] = React.useState("");
    const [carNo, setCarNo] = React.useState("");
    const [expiryDate, setExpiryDate] = React.useState("");
    const [pucStatus, setPucStatus] = React.useState(false);
    const [frontPhoto, setFrontPhoto] = React.useState(null);
    const [frontPhotoData, setfrontPhotoData] = React.useState<any>("");
    const [backPhotoData, setbackPhotoData] = React.useState<any>("");
    const [frontphotoStatus, setfrontPhotoStatus] = React.useState(true);
    const [backphotoStatus, setbackPhotoStatus] = React.useState(true);
    const [response, setResponse] = React.useState("");
    const [responseStatus, setResponseStatus] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [formError, setFormError] = React.useState(false);
    const [formErrorMessage, setFormErrorMessage] = React.useState("");

    const [url, seturl] = React.useState("");
    const userInfo = new UserInfo();
    const history = useHistory();

    if (localStorage.getItem(userInfo.id) === null) history.push(loginPath);
    const frontPhotoHandle = (e: any) => {
        setfrontPhotoStatus(false);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            setfrontPhotoData(reader.result);

            setfrontPhotoStatus(false);
        };
    };
    const backPhotoHandle = (e: any) => {
        setbackPhotoStatus(false);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            setbackPhotoData(reader.result);

            setbackPhotoStatus(false);
        };
    };

    const handleSubmit = () => {
        const date = new Date();
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const customerData: any = {
            employee: localStorage.getItem(userInfo.username),
            c: {
                name: customerName,
                car_number: carNo,
                area,
                expiry_date: expiryDate,
                last_update_dates: [
                    {
                        date:
                            expiryDate !== "" ? today.toLocaleDateString() : "",
                    },
                ],
                puc_status: pucStatus,
                phone_number: contactNo,
                dealer: 0,
                employee: localStorage.getItem(userInfo.id),
                franchise: 0,
                vehical_front_photo: frontPhotoData,
                vehical_back_photo: backPhotoData,
                status: "pending",
            },
        };

        axios.post(apiUrl.newCustomer, customerData).then((res: any) => {
            setResponse(res.data.message);
            setResponseStatus(true);

            if (res.data.message !== message.customerSaveSuccessful)
                setError(true);
        });
    };

    const [modalOpen, setModalOpen] = React.useState(false);

    const handleModalOpen = (e: any) => {
        e.preventDefault();
        setFormError(false);
        if (customerName === "") {
            setFormErrorMessage("Please enter customer name !!");
            setFormError(true);
        } else if (contactNo.length !== 10) {
            setFormErrorMessage(
                "Please provide valid 10 digits phone number !!"
            );
            setFormError(true);
        } else if (carNo.length !== 10) {
            setFormErrorMessage("Please provide valid 10 digits car number !!");
            setFormError(true);
        } else if (frontphotoStatus) {
            setFormErrorMessage("Please enter front photo !!");
            setFormError(true);
        } else {
            setModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };
    const action = () => {
        setModalOpen(false);
        handleSubmit();
    };
    const handleSnackbarClose = () => {
        setResponseStatus(false);
    };

    const handleContactNo = (e: any) => {
        setContactNo(e.target.value);
    };
    const handleArea = (event: any) => {
        setArea(event.target.value);
    };
    const handlePucStatus = (event: any) => {
        setPucStatus(event.target.value);
    };

    return (
        <div>
            <Dialog
                modalOpen={modalOpen}
                handleModalClose={handleModalClose}
                handleModalOpen={handleModalOpen}
                action={action}
                title="Save Data"
            />
            <Snackbar
                open={responseStatus}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity={error ? "error" : "success"}>{response}</Alert>
            </Snackbar>
            {/* navbar */}

            <Navbar />
            <div className="dashboard-container">
                <div className="sidebar-container">
                    <Sidebar />
                </div>
                <div className="formContainer">
                    <div className="data-container">
                        <div className="logo-customer">
                            {" "}
                            <div className="data-title">
                                <h3 style={{ marginTop: "0px" }}>
                                    New Customer
                                </h3>
                            </div>
                        </div>
                        <div className="grid-item-main data-content">
                            <form>
                                <Grid container spacing={1}>
                                    <Grid item xs={11} md={11}>
                                        <Collapse in={formError}>
                                            <Alert severity="error">
                                                {formErrorMessage}
                                            </Alert>
                                        </Collapse>
                                    </Grid>
                                    <Grid item xs={11} md={5}>
                                        {" "}
                                        <TextField
                                            required
                                            id="standard-required"
                                            size="small"
                                            label="Customer Name"
                                            fullWidth
                                            onChange={(e) => {
                                                setCustomerName(e.target.value);
                                            }}
                                            variant="filled"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start" />
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={11} md={5}>
                                        <TextField
                                            required
                                            type="number"
                                            id="standard-required"
                                            label="Contact Number"
                                            size="small"
                                            fullWidth
                                            onChange={handleContactNo}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        +91
                                                    </InputAdornment>
                                                ),
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={11} md={5}>
                                        <TextField
                                            required
                                            id="standard-required"
                                            label="Vehical Number"
                                            size="small"
                                            fullWidth
                                            onChange={(e) => {
                                                setCarNo(e.target.value);
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start" />
                                                ),
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={11} md={5}>
                                        <FormControl
                                            variant="filled"
                                            size="small"
                                        >
                                            <InputLabel htmlFor="outlined-age-native-simple">
                                                Area
                                            </InputLabel>
                                            <Select
                                                native
                                                value={area}
                                                onChange={handleArea}
                                                label="Area"
                                                inputProps={{
                                                    name: "age",
                                                    id:
                                                        "outlined-age-native-simple",
                                                }}
                                            >
                                                <option
                                                    aria-label="None"
                                                    value=""
                                                />
                                                <option value="Lunawada">
                                                    Lunawada
                                                </option>
                                                <option value="Other">
                                                    Other
                                                </option>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={11} md={5}>
                                        <TextField
                                            required
                                            type="file"
                                            id="file"
                                            label="Front Photo"
                                            size="small"
                                            onChange={frontPhotoHandle}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start" />
                                                ),
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid xs={11} md={5} item>
                                        <TextField
                                            required
                                            type="file"
                                            id="file"
                                            size="small"
                                            label="Back Photo"
                                            onChange={backPhotoHandle}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start" />
                                                ),
                                            }}
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid xs={11} md={5} item>
                                        <TextField
                                            required
                                            variant="filled"
                                            type="date"
                                            id="file"
                                            label="Expiry Date"
                                            size="small"
                                            className="input"
                                            onChange={(e) => {
                                                setExpiryDate(e.target.value);
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start" />
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid xs={11} md={5} item>
                                        <FormControl
                                            variant="filled"
                                            size="small"
                                        >
                                            <InputLabel htmlFor="outlined-status-native">
                                                Puc Status
                                            </InputLabel>
                                            <Select
                                                native
                                                value={pucStatus}
                                                onChange={handlePucStatus}
                                                label="Area"
                                                inputProps={{
                                                    name: "Puc Status",
                                                    id:
                                                        "outlined-status-native",
                                                }}
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>
                                                <option value="Completed">
                                                    Completed
                                                </option>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid
                                        xs={11}
                                        md={12}
                                        className="save-btn"
                                        item
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleModalOpen}
                                            size="large"
                                        >
                                            <span> Save</span>{" "}
                                            <DoneAllIcon
                                                fontSize="small"
                                                style={{ marginLeft: "5pt" }}
                                            />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NewCustomer;
