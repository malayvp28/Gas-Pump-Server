import {
    Button,
    Grid,
    Snackbar,
    TextareaAutosize,
    TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { URLS } from "Constant";

import React from "react";
import "./style.css";

function PublicQuery() {
    const apiUrl = new URLS();
    const [name, setName] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [query, setQuery] = React.useState("");
    const [response, setResponse] = React.useState("");
    const [responseStatus, setResponseStatus] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [formError, setFormError] = React.useState(false);
    const [formErrorMessage, setFormErrorMessage] = React.useState("");
    const handleSnackbarClose = () => {
        setResponseStatus(false);
    };
    const sendQuery = (e: any) => {
        e.preventDefault();
        setFormError(false);
        if (name === "") {
            setFormErrorMessage("Enter the name !!");
            setFormError(true);
        } else if (contact.length !== 10) {
            setFormErrorMessage(
                "Please provide valid 10 digits phone number !!"
            );
            setFormError(true);
        } else {
            const date = new Date();
            const currentDate = new Date();
            const cDay = currentDate.getDate();
            const cMonth = currentDate.getMonth() + 1;
            const cYear = currentDate.getFullYear();
            const time = `
                ${currentDate.getHours()} 
                :
                ${currentDate.getMinutes()}
                :
                ${currentDate.getSeconds()}`;

            const queryData = {
                name,
                phone_number: contact,
                query_status: "Unsolved",
                query,
                date: `${cDay} 
                    -
                    ${cMonth} 
                    -
                    ${cYear}  ${time}`,
            };
            axios.post(apiUrl.addQuery, queryData).then((res: any) => {
                setResponse(res.data.message);
                setResponseStatus(true);
                if (res.data.message === "Ok") {
                    setError(false);
                    setResponse(
                        "Thanks for asking the query we will call you back..."
                    );
                } else {
                    setError(true);
                    setResponse("Something went to wrong !!");
                }
                setName("");
                setContact("");
                setQuery("");
            });
        }
    };

    return (
        <div className="query-container">
            <Snackbar
                open={responseStatus}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity={error ? "error" : "success"}>{response}</Alert>
            </Snackbar>
            <Alert
                severity="error"
                style={{ display: formError ? "block" : "none" }}
            >
                {formErrorMessage}
            </Alert>
            <Grid container spacing={1}>
                <Grid item md={12}>
                    <h3>QUERY</h3>
                </Grid>
                <Grid item md={12}>
                    <TextField
                        required
                        value={name}
                        id="standard-required"
                        size="small"
                        label="Name"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item md={12}>
                    <TextField
                        required
                        id="standard-required"
                        size="small"
                        value={contact}
                        type="number"
                        label="Contact Number"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => {
                            setContact(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item md={12}>
                    <TextareaAutosize
                        rowsMin={10}
                        value={query}
                        aria-label="maximum height"
                        placeholder="Write the query..."
                        style={{ width: "100%" }}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item md={2}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={sendQuery}
                    >
                        {" "}
                        Send
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
export default PublicQuery;
