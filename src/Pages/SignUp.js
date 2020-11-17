import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import React, { useState } from "react";
import {
  Avatar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  h5: {
    margin: 20,
  },
}));

export default function SignIn() {
  //   const [formData, setFormData] = useState({
  //     email: "",
  //     password: "",
  //   });

  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = React.useState("");

  const classes = useStyles();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleSubmit = () => {
    setSubmitted({ submitted: true }, () => {
      setTimeout(() => setSubmitted({ submitted: false }), 5000);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          className="classes.avatar"
          alt="Remy Sharp"
          src="https://w7.pngwing.com/pngs/797/100/png-transparent-course-training-class-professional-certification-education-courses-miscellaneous-angle-business.png"
        />
        <Typography component="h1" variant="h5" className={classes.h5}>
          Sign up
        </Typography>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                name="first name"
                value={firstName}
                validators={["required"]}
                errorMessages={["this field is required"]}
                variant="outlined"
                margin="normal"
                fullWidth
                id="firstName"
                autoComplete="fname"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                name="last name"
                value={lastName}
                validators={["required"]}
                errorMessages={["this field is required"]}
                variant="outlined"
                margin="normal"
                fullWidth
                id="lastname"
                autoComplete="lname"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                label="Password"
                onChange={handlePasswordChange}
                name="password"
                value={password}
                validators={["required"]}
                errorMessages={["this field is required"]}
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs="12" sm="7">
              <TextField
                id="date"
                label="Birthday"
                type="date"
                variant="outlined"
                className={classes.form}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs="12" sm="5">
              <FormControl variant="outlined" className={classes.form}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={gender}
                  onChange={handleChangeGender}
                  label="Gender"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={0}>Female</MenuItem>
                  <MenuItem value={3}>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I accept the Terms of Service."
                validators={["required"]}
                errorMessages={["You have to agree with the Terms of Service."]}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
}
