import {createModel} from "@rematch/core";
import {RootModel} from "../Models";
// import {ALERT_TIMEOUT, OptionalAlertProps} from "../../Alert/AlertReducer";
import { v4 as uuid } from 'uuid';
import {AlertModel} from "./AlertModel";

export type OptionalAlertModelKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type OptionalAlertProps = OptionalAlertModelKeys<AlertModel, 'isViewed' | 'id' |'title' | 'timeout' | 'link'>;
export  const ALERT_TIMEOUT = 10000;

export const alertSlice = createModel<RootModel>()({
    state: [] as AlertModel[],
    reducers: {
        addAlert(state: AlertModel[], payload: OptionalAlertProps) {
            const updated = {...payload};
            updated.isViewed = false;
            if (!payload.timeout) {
                updated.timeout = ALERT_TIMEOUT;
            }
            if (!payload.id) {
                updated.id = uuid();
            }
            return [...state, updated] as AlertModel[];
        },
        removeAlert(state: AlertModel[], payload: AlertModel['id']) {
            return state.filter(alert => alert.id !== payload);
        },
        viewedAlert(state: AlertModel[], payload: AlertModel['id']) {
            return [...state.filter(alert => alert.id !== payload), ...state.filter(alert => alert.id === payload)
                .map(alert => {
                alert.isViewed = true;
                return alert;
            })];
        }

    }
})