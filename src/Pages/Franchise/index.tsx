import Navbar from "Components/Navbar";
import Sidebar from "Components/SideBar";
import React from "react";
import "./style.css";

function Franchise() {
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
                            <h3 style={{ marginTop: "0px" }}>Franchises</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Franchise;
