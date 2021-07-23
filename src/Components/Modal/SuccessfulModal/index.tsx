import { makeStyles, Modal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React from "react";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "1pt solid #999",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
function SuccessfulModal(props: any) {
    const { modalOpen, handleModalClose, text, mode } = props;

    const classes = useStyles();
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={modalOpen}
                onClose={() => {
                    handleModalClose();
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalOpen}>
                    <div className={classes.paper} style={{ display: "flex" }}>
                        <div>
                            <CheckCircleIcon />
                        </div>
                        <span>{text}</span>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default SuccessfulModal;
