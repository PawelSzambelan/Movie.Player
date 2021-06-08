import {Button, Grid, TextField} from "@material-ui/core";
import * as yup from "yup";
import {useFormik} from "formik";
import {AuthorizationRestApi} from "../../restapi/authorization/AuthorizationRestApi";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

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
                <Grid
                    container
                    direction={"column"}
                    justify="center"
                    alignItems="center"
                >
                    <TextField
                        id="emailAddress"
                        value={formik.values.email}
                        label="User"
                        name="email"
                        variant="outlined"
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField
                        id="password"
                        value={formik.values.password}
                        type="password"
                        label="Password"
                        name="password"
                        variant="outlined"
                        onChange={formik.handleChange}
                        error={
                            formik.touched.password && Boolean(formik.errors.password)
                        }
                        helperText={formik.touched.password && formik.errors.password}
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </Grid>
            </form>

            <Button onClick={loginAnonymously} variant="contained" color="primary">
                Login anonymously
            </Button>

        </>
    )
}