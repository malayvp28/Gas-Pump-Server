import { Grid, TextField } from "@material-ui/core";
import React from "react";

function PublicQuery() {
    return (
        <div>
            <Grid container>
                <Grid item md={6}>
                    <TextField
                        required
                        id="standard-required"
                        size="small"
                        label="Customer Name"
                        fullWidth
                        variant="filled"
                    />
                </Grid>
            </Grid>
        </div>
    );
}
export default PublicQuery;
