import React, { useEffect } from "react";
import { AlertComponent } from "./AlertComponent";
import { SnackbarProvider, useSnackbar } from "notistack";
import {useDispatch, useSelector} from "react-redux";
import {RootDispatch, RootState} from "../Store";

const MAX_SNACKBAR_ITEMS = 10;

// AlertManager is a utility component that manages the snackbar messages making use of the Reducer.
// Uses the notistack library to display the snackbar messages that are stored in the reducer and have yet to be displayed.
// Provides a functionality to clean up any alerts in the store that have been expired or closed by the user.
const AlertManagerComp: React.FC = () => {
    const alerts = useSelector((state: RootState) => state.alertSlice);
    const dispatch = useDispatch<RootDispatch>();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    useEffect(() => {
        alerts.forEach(async (alert) => {
            if (!alert.isViewed) {
                enqueueSnackbar(alert.text, {
                    variant: alert.type,
                    key: alert.id,
                    autoHideDuration: +alert.timeout,
                    preventDuplicate: true,
                    content: key => <div key={key}><AlertComponent alert={alert} onClose={() => closeSnackbar(key)} /> </div>,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    onClose: (event, reason) => {
                        if (reason === 'instructed' || reason === 'timeout') {
                            dispatch.alertSlice.removeAlert(alert.id);
                        }
                    }
                });
            }
        } );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alerts]);

    return null
}

export const AlertManager =  () => <SnackbarProvider maxSnack={MAX_SNACKBAR_ITEMS} ><AlertManagerComp /></SnackbarProvider>