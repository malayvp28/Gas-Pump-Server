import { Button, Grid, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import Navbar from "Components/Navbar";
import Sidebar from "Components/SideBar";
import { customerPath } from "Constant";
import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import "./style.css";
import img from "./th.jpg";

function Customer() {
    const [id, setId] = React.useState<any>();
    const [data, setData] = React.useState<any>();
    const location = useLocation();
    const [lastUpdate, setLastUpdate] = React.useState(<></>);
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

    return (
        <div>
            <Navbar />
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
                                        <Alert
                                            severity="success"
                                            variant="filled"
                                        >
                                            Completed
                                        </Alert>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="information-container">
                                <Grid container spacing={0}>
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
                                    <Grid md={6} />
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
