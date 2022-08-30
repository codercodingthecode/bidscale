import {Button, Grid, MenuItem, TextField } from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {RootDispatch} from "../Store";
import {ALERT_TIMEOUT, OptionalAlertProps} from "../Store/AlertV2/AlertSliceV2";
import {AlertType} from "../Store/AlertV2/AlertModel";

// Example of a component that uses the AlertReducer hook to dispatch an Alert to queue.
// Used Yup to validate the form.
// Used Formik to handle the form.
export const AlertExample: React.FC = () => {
    const dispatch = useDispatch<RootDispatch>();

    const formik = useFormik<OptionalAlertProps>({
        initialValues: {
            text: '',
            type: AlertType.Success,
            timeout: ALERT_TIMEOUT,
            id: '',
            isViewed: false,
            title: '',
            link: ''
        },
        validationSchema: Yup.object({
            text: Yup.string().required('Text is required'),
            type: Yup.string().required('Type is required'),
        }),
        onSubmit: values => {
            dispatch.alertSlice.addAlert(values)
            // Reset the form after submitting. Comment below if you rather not have the form reset after submitting.
            // formik.resetForm();
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3} justifyContent={'center'} pt={8}>
                <Grid item xs={12} >
                    <TextField label="Alert ID" name={"id"} fullWidth onChange={formik.handleChange} value={formik.values.id}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Alert Text" name={"text"} fullWidth  onChange={formik.handleChange} value={formik.values.text}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Alert Link" name={"link"} fullWidth onChange={formik.handleChange} value={formik.values.link} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Alert Tile" name={"title"} fullWidth onChange={formik.handleChange} value={formik.values.title}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Alert Type" name={"type"} fullWidth select value={formik.values.type} onChange={formik.handleChange}>
                        {
                            Object.keys(AlertType).map(key => {
                                return <MenuItem key={key} value={AlertType[key as keyof typeof AlertType]}>{key}</MenuItem>
                            })
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Alert Timeout" name={"timeout"} fullWidth onChange={formik.handleChange} value={formik.values.timeout}/>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type={'submit'}
                        disabled={!formik.isValid || !formik.dirty}
                    >Submit Alert</Button>
                </Grid>
            </Grid>
        </form>
    )
}