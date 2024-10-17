import React from "react";
import { ToastContainer } from "react-toastify";

function ToastProvider({ children }) {
    return (
        <>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
        </>
    );
}

export default ToastProvider;
