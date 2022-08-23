// Provide TypeScript definitions for the Alert Data Model

export interface AlertModel {
    id: string;
    type: AlertType;
    text: string;
    timeout: number;
    link: string;
    title: string;
    isViewed: boolean;
}

export enum AlertType {
    Success = 'success',
    Error = 'error',
    Info = 'info',
    Warning = 'warning',
}