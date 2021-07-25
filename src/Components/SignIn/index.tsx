import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import {
    Message,
    UserInfo,
    URLS,
    allCustomerPath,
    newCustomerPath,
} from "../../Constant/index";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        marginTop: "10pt",
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",

        boxShadow:
            "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
    },
    paper: {
        margin: "auto",
        height: "82vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "unset",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "60%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    bottomText: {
        textAlign: "center",
        marginTop: "20pt",
    },
}));
function Alert(props: any) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignIn() {
    const url = new URLS();
    const message = new Message();
    const userInfo = new UserInfo();
    const classes = useStyles();
    const history = useHistory();
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [successToast, setSuccessToast] = React.useState(false);
    const [errorToast, setsErrorToast] = React.useState(false);
    const [response, setResponse] = React.useState("");

    const handleErrorToast = (event: any, reason: any) => {
        if (reason === "clickaway") {
            return;
        }
        setsErrorToast(false);
    };
    const handleSuccessToast = (event: any, reason: any) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccessToast(false);
    };

    const goToDashboard = (event: any) => {
        event.preventDefault();

        axios
            .post(url.Adminlogin, {
                phone_number: phoneNumber,
                password,
            })
            .then((res: any) => {
                setResponse(res.data.message);
                if (res.data.message === message.loginSuccessful) {
                    setSuccessToast(true);
                    localStorage.setItem(userInfo.name, res.data.name);

                    localStorage.setItem(userInfo.id, res.data.employee_id);
                    localStorage.setItem(userInfo.username, res.data.userName);
                    localStorage.setItem(
                        userInfo.phoneNumber,
                        res.data.phone_number
                    );
                    setTimeout(() => {
                        history.push(newCustomerPath);
                    }, 1000);
                } else setsErrorToast(true);
            });
    };

    return (
        <Grid container component="main" className={classes.root}>
            <Snackbar
                open={successToast}
                autoHideDuration={3000}
                onClose={handleSuccessToast}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="success">{response}</Alert>
            </Snackbar>
            <Snackbar
                open={errorToast}
                autoHideDuration={6000}
                onClose={handleErrorToast}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="error">{response}</Alert>
            </Snackbar>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={8} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={4}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Phone Number"
                            name="phoneNumber"
                            autoComplete="phoneNumber"
                            size="small"
                            autoFocus
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            required
                            margin="dense"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            size="small"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={goToDashboard}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
