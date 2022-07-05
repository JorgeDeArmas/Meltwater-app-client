import React, {Fragment, useState} from 'react';

import './FilterDocument.css'
import {FilterDocumentParams, FilterDocumentState} from '../../../model/types';

const FilterDocument: React.FC<FilterDocumentParams> = (props) => {
    const initialState: FilterDocumentState = {
        criteria: ''
    };
    const [state, setState] = useState<FilterDocumentState>(initialState);

    const onInputChangeHandler = (event: any): void => {
        const criteria = event.target.value;

        setState({criteria})
    }

    const onKeyPressHandler = (event: any): void => {
        if (event.charCode === 13) {
            filter();
        }
    }

    const filter = (): void => {
        props.onFilter(state.criteria);
    }

    const reset = (event: any): void => {
        const criteria = '';

        setState({criteria});
        props.onFilter(criteria);
    }

    return <Fragment>
        <div className="row d-flex m-0">
            <div className="col-4">
                <input type="text"
                       className="form-control form-control-sm"
                       placeholder="Search Documents..."
                       value={state.criteria}
                       onChange={onInputChangeHandler}
                       onKeyPress={onKeyPressHandler.bind(this)}
                />
            </div>

            <div className="col ps-0">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                            className="btn btn-success btn-sm"
                            onClick={filter}
                    >
                        Search
                    </button>
                    <button type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={reset}
                    >
                        X
                    </button>
                </div>


            </div>
        </div>
    </Fragment>;
}

export default FilterDocument;
