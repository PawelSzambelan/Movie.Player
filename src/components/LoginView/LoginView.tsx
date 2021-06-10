import * as yup from "yup";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import {AuthorizationRestApi} from "../../restapi/authorization/AuthorizationRestApi";
import Cookies from "universal-cookie";
import {Button, Grid, TextField, Typography} from "@material-ui/core";
import {VerticalSpace} from "../VerticalSpace";
import React from "react";

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Wrong email.")
        .required("Email is required."),
    password: yup
        .string()
        .min(8, "Password to short.")
        .required("Password is required."),
});

export function LoginView() {
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await AuthorizationRestApi().postAuthorizationSignIn({
                    Username: values.email,
                    Password: values.password,
                }).then(data => {
                    console.log('Response: ', data);
                    const cookies = new Cookies();
                    cookies.set('token', data.AuthorizationToken.Token);
                    history.push('/home');
                });
            } catch (error) {
                console.log('Error: ', error.response.data.Message);
            }
        },
    });

    const loginAnonymously = async () => {
        try {
            await AuthorizationRestApi().postAnonymousAuthorizationSignIn({}).then(data => {
                console.log('Response: ', data);
                const cookies = new Cookies();
                cookies.set('token', data.AuthorizationToken.Token);
                history.push('/home');
            });
        } catch (error) {
            console.log('Error: ', error.response.data.Message);
        }
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid xs={6}
                      container
                      direction={"column"}
                      justify="center"
                >
                    <VerticalSpace height="1rem"/>
                    <TextField
                        id="emailAddress"
                        value={formik.values.email}
                        label="User"
                        name="email"
                        variant="outlined"
                        placeholder="Type your email"
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <VerticalSpace height="1.5rem"/>
                    <TextField
                        id="password"
                        value={formik.values.password}
                        type="password"
                        label="Password"
                        name="password"
                        variant="outlined"
                        placeholder="Type your password"
                        onChange={formik.handleChange}
                        error={
                            formik.touched.password && Boolean(formik.errors.password)
                        }
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <VerticalSpace height="1.5rem"/>
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </Grid>
            </form>
            <VerticalSpace height="2rem"/>
            <Grid xs={6}
                  container
                  direction={"column"}
                  justify="center"
                  alignContent="center"
            >
                <div>
                    <Typography variant="body1">
                        Don't have account? Try and check trial version!
                    </Typography>
                    <Button onClick={loginAnonymously} style={{ width: "100%" }} variant="contained" color="primary">
                        Login anonymously
                    </Button>
                </div>
            </Grid>
        </>
    )
}