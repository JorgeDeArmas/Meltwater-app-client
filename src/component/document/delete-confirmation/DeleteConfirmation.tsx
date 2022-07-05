import React, {Fragment} from 'react';
import classes from './DeleteConfirmation.module.css';
import {DeleteConfirmationParams} from '../../../model/types';

const DeleteConfirmation: React.FC<DeleteConfirmationParams> = (props) => {
    return (
        <Fragment>
            <div className="modal-backdrop"></div>

            <div className={`modal ${classes.modal}`}>
                <div className="modal-dialog">
                    <div className={`modal-content ${classes['modal-content']}`}>
                        <div className={`modal-header ${classes['modal-header-container']}`}>
                            <h5 className="modal-title">{props.document?.name}</h5>

                            <button type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={props.onCancel}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <strong>Are you sure you want to delete this document?</strong>
                        </div>

                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-sm btn-secondary"
                                    onClick={props.onCancel}
                            >
                                Cancel
                            </button>

                            <button type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={props.onConfirm}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default DeleteConfirmation;
