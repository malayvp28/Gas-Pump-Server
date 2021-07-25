import {
    Button,
    Grid,
    InputAdornment,
    Snackbar,
    TextField,
    Typography,
} from "@material-ui/core";
import Dialog from "Components/Modal/Dialog";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import Navbar from "Components/Navbar";
import Sidebar from "Components/SideBar";
import { customerPath, loginPath, Message, URLS, UserInfo } from "Constant";
import React from "react";
import { saveAs } from "file-saver";
import { useQuery } from "react-query";
import { useLocation, useHistory } from "react-router-dom";
import CachedIcon from "@material-ui/icons/Cached";
import "./style.css";
import img from "./th.jpg";

function Customer() {
    const userInfo = new UserInfo();
    const history = useHistory();

    if (localStorage.getItem(userInfo.id) === null) history.push(loginPath);
    const apiUrl = new URLS();
    const message = new Message();
    const [id, setId] = React.useState<any>();
    const [data, setData] = React.useState<any>();
    const location = useLocation();
    const [lastUpdate, setLastUpdate] = React.useState(<></>);
    const [expiryDate, setExpiryDate] = React.useState("");
    const [serviceDate, setServiceDate] = React.useState("");
    const [modalOpen, setModalOpen] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [error, setError] = React.useState(false);
    const [responseStatus, setResponseStatus] = React.useState(false);
    React.useEffect(() => {
        setId(location.state);
        axios
            .get(`http://localhost:8080/customerById/${location.state}`)
            .then((res: any) => {
                setData(res.data);
                const updateDate = res.data?.customer?.last_update_dates?.map(
                    (date: any) => <li>{date.date}</li>
                );

                setLastUpdate(updateDate);
            });
    }, [location]);

    const getData = () => {
        axios
            .get(`http://localhost:8080/customerById/${location.state}`)
            .then((res: any) => {
                setData(res.data);
                const updateDate = res.data?.customer?.last_update_dates?.map(
                    (date: any) => <li>{date.date}</li>
                );

                setLastUpdate(updateDate);
            });
    };

    const saveFront = () => {
        saveAs(
            data?.customer.vehical_front_photo,
            `${data?.customer.name}_front_image.jpeg`
        );
    };
    const saveback = () => {
        saveAs(
            data?.customer.vehical_front_photo,
            `${data?.customer.name}_back_image.jpeg`
        );
    };
    const addService = () => {
        const serviceData = {
            expiryDate,
            serviceDate,
            id,
        };
        axios.post(apiUrl.updateService, serviceData).then((res: any) => {
            setResponse(res.data.message);

            setResponseStatus(true);
            if (res.data.message !== message.serviceAdd) setError(true);
        });
    };
    const action = () => {
        setModalOpen(false);
        addService();
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };
    const handleModalOpen = () => {
        setModalOpen(true);
    };
    const handleSnackbarClose = () => {
        setResponseStatus(false);
    };
    return (
        <div>
            <Navbar />

            <Dialog
                modalOpen={modalOpen}
                handleModalClose={handleModalClose}
                handleModalOpen={handleModalOpen}
                action={action}
                title="Add service?"
            />
            <Snackbar
                open={responseStatus}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity={error ? "error" : "success"}>{response}</Alert>
            </Snackbar>
            <div className="dashboard-container">
                <div className="sidebar-container">
                    <Sidebar />
                </div>
                <div className="table table-container">
                    <div className="data-container">
                        {" "}
                        <div className="data-title">
                            <h3 style={{ marginTop: "0px" }}>
                                All Customer/{id}
                            </h3>
                        </div>
                        <div className="customer-profile-container">
                            <Grid spacing={0}>
                                <Grid xs={12} md={12} className="top-user">
                                    <div className="user-photo" />
                                    <div className="user-status">
                                        <h3>{data?.customer.name}</h3>
                                        <Button
                                            variant="outlined"
                                            onClick={getData}
                                        >
                                            Refresh <CachedIcon />
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="information-container">
                                <Grid container spacing={1}>
                                    <Grid item md={12} xs={12}>
                                        Add your service ?
                                    </Grid>
                                    <Grid item md={4} xs={5}>
                                        <TextField
                                            required
                                            id="standard-required"
                                            size="small"
                                            label="Service Date"
                                            type="date"
                                            fullWidth
                                            variant="filled"
                                            onChange={(e) =>
                                                setServiceDate(e.target.value)
                                            }
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start" />
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={5}>
                                        <TextField
                                            required
                                            id="standard-required"
                                            size="small"
                                            label="Expiry Date"
                                            type="date"
                                            fullWidth
                                            variant="filled"
                                            onChange={(e) =>
                                                setExpiryDate(e.target.value)
                                            }
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start" />
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={3} xs={3}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleModalOpen}
                                        >
                                            Add
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={0}
                                    style={{ marginTop: "20pt" }}
                                >
                                    <Grid
                                        item
                                        xs={11}
                                        md={3}
                                        className="text-user"
                                    >
                                        <table>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Typography color="textSecondary">
                                                        Car Number
                                                    </Typography>
                                                </td>
                                                <td>
                                                    {": "}
                                                    {data?.customer.car_number}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Typography color="textSecondary">
                                                        {" "}
                                                        Contact No
                                                    </Typography>
                                                </td>
                                                <td>
                                                    {": "}
                                                    {"+91 "}
                                                    {
                                                        data?.customer
                                                            .phone_number
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Typography color="textSecondary">
                                                        Area
                                                    </Typography>
                                                </td>
                                                <td>
                                                    {": "}
                                                    {data?.customer.area}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Typography color="textSecondary">
                                                        Puc Status
                                                    </Typography>
                                                </td>
                                                <td>
                                                    {": "}
                                                    {data?.customer.puc_status}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Typography color="textSecondary">
                                                        {" "}
                                                        Dealer Name
                                                    </Typography>
                                                </td>
                                                <td>
                                                    {": "}
                                                    {data?.dealer?.name ||
                                                        "None"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Typography color="textSecondary">
                                                        {" "}
                                                        Franchise Name
                                                    </Typography>
                                                </td>
                                                <td>
                                                    {": "}
                                                    {data?.franchise?.name ||
                                                        "None"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {" "}
                                                    <Typography color="textSecondary">
                                                        {" "}
                                                        Employee Name
                                                    </Typography>
                                                </td>
                                                <td>
                                                    {": "}
                                                    {data?.employee?.name ||
                                                        "None"}
                                                </td>
                                            </tr>
                                        </table>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={11}
                                        md={3}
                                        className="text-user"
                                    >
                                        <div style={{ display: "flex" }}>
                                            <Typography color="textSecondary">
                                                Expiry Date:
                                            </Typography>
                                            <Typography>
                                                {"  "}
                                                {data?.customer.expiry_date}
                                            </Typography>
                                        </div>
                                        <Typography color="textSecondary">
                                            Last Service Dates:
                                        </Typography>
                                        <div className="last-dates">
                                            {lastUpdate}
                                        </div>
                                    </Grid>
                                    <Grid item />
                                    <Grid
                                        item
                                        xs={4}
                                        md={1}
                                        className="text-user"
                                    >
                                        <div className="vehical-photo">
                                            <img
                                                src={
                                                    data?.customer
                                                        .vehical_front_photo
                                                }
                                                height="100%"
                                                width="100%"
                                                alt="vehical"
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                onClick={saveFront}
                                                disabled={
                                                    data?.customer
                                                        .vehical_front_photo ===
                                                    ""
                                                }
                                            >
                                                Download
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={4}
                                        md={2}
                                        className="text-user"
                                    >
                                        <div className="vehical-photo">
                                            {" "}
                                            <img
                                                src={
                                                    data?.customer
                                                        .vehical_back_photo
                                                }
                                                height="100%"
                                                width="100%"
                                                alt="vehical"
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                onClick={saveback}
                                                disabled={
                                                    data?.customer
                                                        .vehical_back_photo ===
                                                    ""
                                                }
                                            >
                                                Download
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Customer;
