import {createModel} from "@rematch/core";
import {RootModel} from "../Models";
import { v4 as uuid } from 'uuid';
import {AlertModel} from "./AlertModel";
import {toast} from "react-toastify";

export type OptionalAlertModelKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type OptionalAlertProps = OptionalAlertModelKeys<AlertModel, 'isViewed' | 'id' |'title' | 'timeout' | 'link'>;
export  const ALERT_TIMEOUT = 10000;

export const alertSlice = createModel<RootModel>()({
    state: [] as AlertModel[],
    reducers: {
        addAlert(state: AlertModel[], payload: OptionalAlertProps) {
            return [...state, payload] as AlertModel[];
        },
        removeAlert(state: AlertModel[], payload: AlertModel['id']) {
            return state.filter(alert => alert.id !== payload);
        },
    },
    effects: (dispatch: any) => ({
        async removeAlertAsync(payload: AlertModel) {
            await delay(payload.timeout || ALERT_TIMEOUT);
            dispatch.alertSlice.removeAlert(payload.id);
        },
        async addAlertAsync(payload: OptionalAlertProps, state) {
            const updated = {...payload};
            updated.isViewed = false;
            if (!payload.timeout) {
                updated.timeout = ALERT_TIMEOUT;
            }
            if (!payload.id) {
                updated.id = uuid();
            }
            dispatch.alertSlice.addAlert(updated);
            toast[payload.type](payload.text, {
                position: "top-right",
                autoClose: updated.timeout || ALERT_TIMEOUT,
                closeOnClick: true,
                pauseOnFocusLoss: false,
            })
            await dispatch.alertSlice.removeAlertAsync(updated);

        }
    }),
})


// utility function to delay execution of a function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));