import React, { useEffect} from "react";
import 'react-toastify/dist/ReactToastify.min.css';
import {useAlertReducer} from "./AlertReducer";
import {AlertComponent} from "./AlertComponent";
import {SnackbarProps, SnackbarProvider, useSnackbar } from "notistack";

const MAX_SNACKBAR_ITEMS = 10;

// ALertManager is a utility component that manages the snackbar messages making use of the Reducer.
// Uses the notistack library to display the snackbar messages that are stored in the reducer and have yet to be displayed.
// Provides a functionality to clean up any alerts in the store that have been expired or closed by the user.
const AlertManagerComp: React.FC<SnackbarProps> = (props) => {
    const {state, dispatch }= useAlertReducer();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    useEffect(() => {
        state.forEach(async (alert) => {
            if (alert.isViewed === false) {
                dispatch({type: 'SET_VIEWED', payload: alert});
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
                            dispatch({type: 'REMOVE_ALERT', payload: alert});
                        }
                    }
                });
                await new Promise<void>((resolve) => {
                            let timeoutid = setTimeout(() => {
                                dispatch({type: 'REMOVE_ALERT', payload: alert});
                                clearTimeout(timeoutid);
                                resolve();
                            } , +alert.timeout);
                        });
            }
        } );
    }, [state]);

    return null
}

export const AlertManager =  () => <SnackbarProvider maxSnack={MAX_SNACKBAR_ITEMS} ><AlertManagerComp /></SnackbarProvider>