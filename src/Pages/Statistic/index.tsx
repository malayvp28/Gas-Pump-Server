import { Grid } from "@material-ui/core";
import Navbar from "Components/Navbar";
import Sidebar from "Components/SideBar";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import "./style.css";

function Statistics() {
    const pucData = {
        labels: ["Pending", "Completed"],
        datasets: [
            {
                label: "PUC",
                backgroundColor: ["#8e6cef", "#ffaf00"],
                hoverBackgroundColor: ["#8e6cef", "#ffaf00"],
                data: [2, 3],
            },
        ],
    };
    const areaData = {
        labels: ["Lunawada", "Other"],
        datasets: [
            {
                label: "Area",
                backgroundColor: ["#8e6cef", "#ffaf00"],
                hoverBackgroundColor: ["#8e6cef", "#ffaf00"],
                data: [2, 3],
            },
        ],
    };
    const franchiseData = {
        labels: ["Main"],
        datasets: [
            {
                label: "Franchise",
                backgroundColor: ["#ffaf00"],
                hoverBackgroundColor: ["#ffaf00"],
                data: [2],
            },
        ],
    };
    const customerData = {
        labels: ["Main"],
        datasets: [
            {
                label: "Franchise",
                backgroundColor: ["#ffaf00"],
                hoverBackgroundColor: ["#ffaf00"],
                data: [2],
            },
        ],
    };
    return (
        <div>
            {/* navbar */}
            <Navbar />
            <div className="dashboard-container">
                <div className="sidebar-container">
                    <Sidebar />
                </div>
                <div className="statics-main">
                    <div className="data-container">
                        <div className="data-title">
                            <h3 style={{ marginTop: "0px" }}>Statistics</h3>
                        </div>
                        <div className="static-container">
                            <Grid
                                container
                                spacing={5}
                                style={{
                                    justifyContent: "center",
                                }}
                            >
                                <Grid item xs={12} md={4}>
                                    <div className="static">
                                        <p>CUSTOMER</p>
                                        <span>10</span>
                                        <Line
                                            type="line"
                                            data={customerData}
                                            options={{
                                                title: {
                                                    display: true,
                                                    text: "Customer",
                                                    fontSize: 20,
                                                },
                                                legend: {
                                                    display: true,
                                                    position: "right",
                                                    margin: 0,
                                                },
                                            }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="static">
                                        <p>AREA</p> <span>1</span>
                                        <Bar
                                            type="bar"
                                            data={areaData}
                                            options={{
                                                title: {
                                                    display: true,
                                                    text: "Total Area",
                                                    fontSize: 20,
                                                },
                                                legend: {
                                                    display: true,
                                                    position: "right",
                                                    margin: 0,
                                                },
                                            }}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <div className="static" style={{}}>
                                        <p> PUC COMPLETED</p>
                                        <span>0</span>
                                        <Bar
                                            type="bar"
                                            data={pucData}
                                            options={{
                                                title: {
                                                    display: true,
                                                    text: "PUC Status",
                                                    fontSize: 20,
                                                },
                                            }}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Statistics;
