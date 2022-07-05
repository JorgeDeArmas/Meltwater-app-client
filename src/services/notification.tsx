import React from 'react';
import {toast, ToastOptions} from 'react-toastify';

const DefaultNotificationConfig: ToastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
};

const Notification = {
    info: (message: string, config: ToastOptions = DefaultNotificationConfig) => {
        config = {
            ...config,
            ...DefaultNotificationConfig
        };

        toast.info(message, config)
    },
    success: (message: string, config: ToastOptions = DefaultNotificationConfig) => {
        config = {
            ...config,
            ...DefaultNotificationConfig
        };

        toast.success(message, config)
    },
    warning: (message: string, config: ToastOptions = DefaultNotificationConfig) => {
        config = {
            ...config,
            ...DefaultNotificationConfig
        };

        toast.warn(message, config)
    },
    error: (message: string, config: ToastOptions = DefaultNotificationConfig) => {
        config = {
            ...config,
            ...DefaultNotificationConfig
        };

        toast.error(message, config)
    },
    notify: (message: string, config: ToastOptions = DefaultNotificationConfig) => {
        config = {
            ...config,
            ...DefaultNotificationConfig
        };

        toast(message, config)
    }
};

export default Notification;
