import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useLocalStorage } from './lib/customhooks';

export default function AddressForm() {
    const [formdata, setFormdata] = useLocalStorage("formdata", {
        firstname: "local",
        lastname: "storage"
    })
    const handleChange = (field, value)=>{
        setFormdata({
            ...formdata,
            [field]: value
        })
    }
    return (
        <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Shipping address
                </Typography>
                <Grid container spacing={3} sm={12}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First name"
                            variant="outlined"
                            fullWidth
                            value = {formdata.firstname}
                            onChange = {(e)=>handleChange("firstname", e.target.value)}
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            variant="outlined"
                            fullWidth
                            value = {formdata.lastname}
                            onChange = {(e)=>handleChange("lastname", e.target.value)}
                            autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address1"
                            name="address1"
                            label="Address line 1"
                            variant="outlined"
                            fullWidth
                            value = {formdata.address1}
                            onChange = {(e)=>handleChange("address1", e.target.value)}
                            autoComplete="shipping address-line1"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="address2"
                            name="address2"
                            label="Address line 2"
                            variant="outlined"
                            fullWidth
                            value = {formdata.address2}
                            onChange = {(e)=>handleChange("address2", e.target.value)}
                            autoComplete="shipping address-line2"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            variant="outlined"
                            fullWidth
                            value = {formdata.city}
                            onChange = {(e)=>handleChange("city", e.target.value)}
                            autoComplete="shipping address-level2"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="state" variant="outlined" name="state" label="State/Province/Region" fullWidth
                        value = {formdata.state}
                            onChange = {(e)=>handleChange("state", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zip"
                            name="zip"
                            label="Zip / Postal code"
                            variant="outlined"
                            fullWidth
                            value = {formdata.zip}
                            onChange = {(e)=>handleChange("zip", e.target.value)}
                            autoComplete="shipping postal-code"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            label="Country"
                            variant="outlined"
                            fullWidth
                            value = {formdata.country}
                            onChange = {(e)=>handleChange("country", e.target.value)}
                            autoComplete="shipping country"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary">Submit</Button>
                    </Grid>
                </Grid>


        </React.Fragment>
    );
}