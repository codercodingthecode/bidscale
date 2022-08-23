import {createContext, useReducer} from "react";
import {AlertModel} from "./AlertModel";
import {AlertAction, AlertReducer} from "./AlertReducer";

export const AlertContext = createContext<{state: AlertModel[], dispatch: React.Dispatch<AlertAction>}>({state: [], dispatch: () => {}});

// AlertProvider is a component that provides access to the Alert Data and Actions and the State globally in the App.
export const AlertProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const [state , dispatch] = useReducer(AlertReducer, []);
    return (
        <AlertContext.Provider value={{state, dispatch}}>{children}</AlertContext.Provider>
    )
}