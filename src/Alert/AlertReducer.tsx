import {AlertModel} from "./AlertModel";
import {useContext} from "react";
import {AlertContext} from "./AlertStore";
import { v4 as uuid } from 'uuid';

// Provide type definition for the AlertReducer
export type OptionalAlertModelKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type OptionalAlertProps = OptionalAlertModelKeys<AlertModel, 'isViewed' | 'id' |'title' | 'timeout' | 'link'>;
export  const ALERT_TIMEOUT = 10000;

export interface AlertAction {
    type: 'ADD_ALERT' | 'REMOVE_ALERT' | 'SET_VIEWED' | 'GET_ALERTS';
    payload: OptionalAlertProps;
}

// AlertReducer is a reducer that handles the state of the Alert Data and Actions
export const AlertReducer = (state: AlertModel[], action: AlertAction): AlertModel[] => {
    switch (action.type) {
        case 'ADD_ALERT':
            const updated = {...action.payload};
            updated.isViewed = false;
            if (!action.payload.timeout) {
                updated.timeout = ALERT_TIMEOUT;
            }
            if (!action.payload.id) {
                updated.id = uuid();
            }
            return [...state, updated] as AlertModel[];

        case 'SET_VIEWED':
            return [...state.filter(alert => alert.id !== action.payload.id), {...action.payload, isViewed: true}] as AlertModel[];

        case 'REMOVE_ALERT':
            return state.filter(alert => alert.id !== action.payload.id);
        default:
            return state;
    }
}

// Provide a hook to get access to Alert Data, Dispatch the Actions and retrieve the State
export const useAlertReducer = () => useContext(AlertContext);
