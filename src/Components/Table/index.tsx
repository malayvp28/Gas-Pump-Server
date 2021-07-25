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
import "./style.css";
import { useHistory } from "react-router-dom";
import ICustomerData from "Interface";
import { customerInfo } from "Constant";

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

function TableData({ row }: any) {
    const classes = useStyles();
    const history = useHistory();

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleMore = (id: any) => {
        history.push({
            pathname: customerInfo,

            state: id,
        });
    };
    return (
        <div>
            {" "}
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.row}>
                                <b>Customer Name</b>
                            </TableCell>
                            <TableCell className={classes.row}>
                                <b> Contact No.</b>
                            </TableCell>
                            <TableCell className={classes.row}>
                                <b> Car No.</b>
                            </TableCell>
                            <TableCell className={classes.row}>
                                <b> Last Service Date</b>
                            </TableCell>
                            <TableCell className={classes.row}>
                                <b> Expiry Date</b>
                            </TableCell>
                            <TableCell className={classes.row}>
                                <b>Area</b>
                            </TableCell>
                            <TableCell className={classes.row}>
                                <b>Franchise</b>
                            </TableCell>
                            <TableCell className={classes.row}>
                                <b> PUC Satus</b>
                            </TableCell>
                            <TableCell className={classes.row}>
                                <b> Update/Delete</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row
                            ?.slice(
                                (page - 1) * rowsPerPage,
                                (page - 1) * rowsPerPage + rowsPerPage
                            )
                            ?.map((data: ICustomerData) => (
                                <TableRow key={data.customer_id}>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        className={classes.row}
                                    >
                                        {data.name}
                                    </TableCell>
                                    <TableCell className={classes.row}>
                                        {data.phone_number}
                                    </TableCell>
                                    <TableCell className={classes.row}>
                                        {data.car_number}
                                    </TableCell>
                                    <TableCell className={classes.row}>
                                        {data.expiry_date}
                                    </TableCell>
                                    <TableCell className={classes.row}>
                                        {data.expiry_date}
                                    </TableCell>
                                    <TableCell className={classes.row}>
                                        {data.area}
                                    </TableCell>
                                    <TableCell className={classes.row}>
                                        {"Main "}
                                    </TableCell>
                                    <TableCell className={classes.row}>
                                        {data.puc_status}
                                    </TableCell>
                                    <TableCell className={classes.row}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{
                                                fontSize: "8pt",
                                                marginRight: "5pt",
                                            }}
                                            onClick={() => {
                                                handleMore(data.customer_id);
                                            }}
                                        >
                                            {"More "}
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
export default TableData;
