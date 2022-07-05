import React, {Fragment, useState} from 'react';

import './Pagination.css'
import {PaginationParams, PaginationState} from '../../model/types';

const Pagination: React.FC<PaginationParams> = (props) => {
    const initState: PaginationState = {page: 1};
    const [state, setState] = useState<PaginationState>(initState);

    const onPrev = () => {
        const page = Math.max(state.page - 1, 1);

        props.next(page);
        setState({page});
    }

    const onNext = () => {
        const page = state.page + 1;

        props.next(page);
        setState({page});
    }

    return <Fragment>
        <nav>
            <ul className="pagination pagination-sm justify-content-end">
                <li className="page-item">
                    <a className="page-link" onClick={onPrev}>Previous</a>
                </li>
                <li className="page-item">
                    <a className="page-link" onClick={onNext}>Next</a>
                </li>
            </ul>
        </nav>
    </Fragment>
}

export default Pagination;
