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
    TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CachedIcon from "@material-ui/icons/Cached";
import { makeStyles } from "@material-ui/core/styles";

import React from "react";
import "./style.css";
import EmployeeTable from "Components/EmployeeTable";
import QueryTable from "Components/QueryTable";
import { useQuery } from "react-query";
import { loginPath, URLS, UserInfo } from "Constant";
import axios from "axios";
import { IQuery } from "Interface";
import { useHistory } from "react-router-dom";

function sortDatabystatus(data: IQuery[]) {
    data.sort(function (a: IQuery, b: IQuery) {
        if (a.query_status < b.query_status) {
            return 1;
        } else if (a.query_status > b.query_status) {
            return -1;
        }

        return 0;
    });
    return data;
}

function Queries() {
    const [addForm, setAddForm] = React.useState(false);
    const apiUrl = new URLS();
    const [queryData, setQueryData] = React.useState<any>();
    const userInfo = new UserInfo();
    const history = useHistory();

    if (localStorage.getItem(userInfo.id) === null) history.push(loginPath);
    const handleForm = () => {
        if (addForm) setAddForm(false);
        else setAddForm(true);
    };
    const { data } = useQuery<IQuery[]>("courseList", () =>
        fetch(apiUrl.getQuery).then((res) => res.json())
    );
    React.useEffect(() => {
        const sortData = sortDatabystatus(data || []);

        setQueryData(sortData);
    }, data);

    const getData = () => {
        axios.get(apiUrl.getQuery).then((res) => {
            const sortData = sortDatabystatus(res.data || []);
            setQueryData(sortData);
        });
    };
    const updateStatus = (id: number) => {
        axios.get(`${apiUrl.updateQuery}${id}`).then((res) => {
            getData();
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
                            <h3 style={{ marginTop: "0px" }}>Employees</h3>
                        </div>
                        <div className="employee-container">
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={11}>
                                    <Button
                                        variant="outlined"
                                        style={{ marginBottom: "6px" }}
                                    >
                                        <CachedIcon onClick={getData} />
                                    </Button>
                                    <QueryTable
                                        row={queryData}
                                        updateStatus={updateStatus}
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
export default Queries;
