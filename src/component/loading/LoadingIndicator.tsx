import React, {Fragment} from 'react';
import './LoadingIndicator.css'

const LoadingIndicator = () => {
    return (
        <Fragment>
            <div className="modal-backdrop">
                <div className="spinner-container d-flex align-items-center justify-content-center">
                    <div className="spinner-grow spinner-grow-sm text-success" role="status">
                        <span className="visually-hidden">Loading</span>
                    </div>

                    <div className="spinner-grow spinner-grow-sm text-success" role="status">
                        <span className="visually-hidden">Loading</span>
                    </div>

                    <div className="spinner-grow spinner-grow-sm text-success" role="status">
                        <span className="visually-hidden">Loading</span>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default LoadingIndicator;
