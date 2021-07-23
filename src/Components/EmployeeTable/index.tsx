import React from "react";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { Button, IconButton, makeStyles, Table } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import DeleteIcon from "@material-ui/icons/Delete";

import { useHistory } from "react-router-dom";
import ICustomerData from "Interface";
import { URLS, UserInfo } from "Constant";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    formControl: {
        marginTop: "auto",
        marginRight: "10px",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    row: {
        fontSize: "8pt",
        textAlign: "center",
        [theme.breakpoints.up("sm")]: {
            fontSize: "10pt",
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
    inputInput: {
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

interface IData {
    row: any;
    delete: () => void;
}

function EmployeeTable({ deleteData, row }: any) {
    const classes = useStyles();
    const history = useHistory();
    const apiUrl = new URLS();
    const userInfo = new UserInfo();

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleMore = (id: any) => {
        history.push({
            pathname: "/customer",

            state: id,
        });
    };
    const deleteEmployee = (id: number) => {
        const data = {
            admin_id: localStorage.getItem(userInfo.id),
            employee_id: id,
        };
       
    };
    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.row} size="small">
                                <b>Employee Id</b>
                            </TableCell>
                            <TableCell className={classes.row} size="small">
                                <b>Employee Name</b>
                            </TableCell>
                            <TableCell className={classes.row} size="small">
                                <b>Employee Phone Number</b>
                            </TableCell>

                            <TableCell className={classes.row} size="small">
                                <b> Record</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row
                            ?.slice(
                                (page - 1) * rowsPerPage,
                                (page - 1) * rowsPerPage + rowsPerPage
                            )
                            ?.map((data: any) => (
                                <TableRow>
                                    <TableCell
                                        size="small"
                                        component="th"
                                        scope="row"
                                        className={classes.row}
                                    >
                                        {data.employee_id}
                                    </TableCell>
                                    <TableCell
                                        className={classes.row}
                                        size="small"
                                    >
                                        {data.name}
                                    </TableCell>
                                    <TableCell
                                        className={classes.row}
                                        size="small"
                                    >
                                        +91 {data.phone_number}
                                    </TableCell>

                                    <TableCell
                                        className={classes.row}
                                        size="small"
                                    >
                                        <Button
                                            variant="contained"
                                            style={{
                                                fontSize: "8pt",
                                                marginRight: "5pt",
                                                backgroundColor:
                                                    "rgb(220,20,20)",
                                                color: "white",
                                            }}
                                            onClick={() => {
                                                deleteData(data.employee_id);
                                            }}
                                        >
                                            {"delete "}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                style={{ marginTop: "10pt" }}
                count={Math.ceil(row?.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                color="primary"
            />
        </div>
    );
}

export default EmployeeTable;
