import {Alert, AlertProps, AlertTitle, Link, Typography} from "@mui/material";
import {AlertModel} from "../Store/AlertV2/AlertModel";

interface AlertComponentProps extends Partial<AlertProps> {
    alert: AlertModel;
}

// This is a minimal implementation of the Alert component itself that is shown on the top right of the UI.
// Conditionally renders the Alert with the Title or a link if the props are provided.
export const AlertComponent: React.FC<AlertComponentProps> = ({alert, ...props}) => {
    return  (
        <Alert {...props}  severity={alert.type} key={alert.id} id={alert.id}>
            {
                alert.title && <AlertTitle>{alert.title}</AlertTitle>
            }
            {
                alert.link ?
                    <Link href={alert.link} underline={'hover'} rel={'noreferrer'} target={'_blank'}>
                        <Typography variant={'body2'}>
                            {alert.text}
                        </Typography>
                    </Link> :
                    <Typography variant={'body2'}>
                        {alert.text}
                    </Typography>
            }
        </Alert>
    )
}

