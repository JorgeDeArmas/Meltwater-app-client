import React, {useState, useEffect, Fragment} from 'react';
import ReactDOM from 'react-dom';

import {HttpResponse} from '../../../model/http-response';
import Notification from '../../../services/notification';
import CreateDocument from '../create_document/CreateDocument';
import {Document} from '../../../model/document';
import DocumentService from '../../../services/document';
import PreviewDocument from '../preview-document/PreviewDocument';
import './ListDocument.css';
import LoadingIndicator from '../../loading/LoadingIndicator';
import {DocumentActions, ListDocumentState} from '../../../model/types';
import Pagination from '../../pagination/Pagination';
import FilterDocument from '../filter-document/FilterDocument';
import DeleteConfirmation from '../delete-confirmation/DeleteConfirmation';

const ListDocument = () => {
    const initState: ListDocumentState = {
        documents: [],
        selectedDocument: null,
        downloadedFile: null,
        actions: {
            upload: false,
            preview: false,
            delete: false,
            loading: false
        },
        search: {
            criteria: ''
        },
        pagination: {
            page: 1
        }
    };
    const [state, setState] = useState<ListDocumentState>(initState);
    const limitPerPage = 20;

    useEffect(() => {
        fetchDocuments(state.pagination.page, limitPerPage, state.search.criteria)
            .catch((error) => Notification.error(error));
    }, [])

    const onUploadHandler = async (response: HttpResponse) => {
        if (response.status == 201) {
            Notification.success('The document was uploaded successfully');
            fetchDocuments(state.pagination.page, limitPerPage, state.search.criteria)
                .catch((error) => Notification.error(error));
        }
    }

    const onUploadFailHandler = async (error: any) => {
        Notification.error('Error occurred trying to upload the file');
    }

    const deleteDocument = async () => {
        setActionState('loading', true);

        if (state?.selectedDocument?.id) {
            try {
                const response: HttpResponse = await DocumentService.deleteDocument(state.selectedDocument.id);

                if (response.status == 204) {
                    Notification.success('The document was deleted successfully');
                    fetchDocuments(state.pagination.page, limitPerPage, state.search.criteria)
                        .catch((error) => Notification.error(error));

                    setActionState('delete', false);
                    setSelectedDocumentState(null, null);
                }
            } catch (error) {
                Notification.error('Error occurred trying to delete the document');
            }
        }
    }

    const fetchDocuments = async (page: number, limit: number, criteria: string) => {
        setActionState('loading', true);

        const response: HttpResponse = await DocumentService.getAllDocuments(page, limit, criteria);

        if (response.status == 200) {
            setDocumentState(response.data);
            setActionState('loading', false);
        }
    }

    const downloadFile = async (id: string) => {
        const response: HttpResponse = await DocumentService.downloadFile(id);

        if (response.status == 200) {
            console.log(response.data);
            return response.data;
        }

        return null;
    }

    const setDocumentState = (documents: Document[]): void => {
        setState((prevState: ListDocumentState) => {
            return {
                ...prevState,
                documents
            }
        })
    }

    const setSelectedDocumentState = (document: Document | null, file: File | null): void => {
        setState((prevState: ListDocumentState) => {
            return {
                ...prevState,
                selectedDocument: document,
                downloadedFile: file
            }
        })
    }

    const setActionState = (key: DocumentActions, value: boolean): void => {
        setState((prevState: ListDocumentState) => {
            return {
                ...prevState,
                actions: {
                    ...prevState.actions,
                    [key]: value
                }
            }
        })
    }

    const onShowCreateModalHandler = (): void => {
        setActionState('upload', true);
        setActionState('preview', false);
        setActionState('delete', false);
    }

    const onCloseCreateModalHandler = (): void => {
        setActionState('upload', false);
    }

    const previewDocument = async (document: Document) => {
        setActionState('preview', true);
        setActionState('upload', false);
        setActionState('delete', false);

        setSelectedDocumentState(document, null);
        // setSelectedDocumentState(document, (await downloadFile(document.id)) as File);
    }

    const onClosePreviewModalHandler = (): void => {
        setActionState('preview', false);
        setSelectedDocumentState(null, null);
    }

    const showConfirmationDeleteModal = async (document: Document) => {
        setActionState('delete', true);
        setActionState('preview', false);
        setActionState('upload', false);

        setSelectedDocumentState(document, null);
    }

    const onCancelDeleteModalHandler = (): void => {
        setActionState('delete', false);
        setSelectedDocumentState(null, null);
    }

    const onPaginationHandler = (page: number) => {
        setState((prevState: ListDocumentState) => {
            return {
                ...prevState,
                pagination: {
                    page
                }
            }
        })

        fetchDocuments(page, limitPerPage, state.search.criteria);
    }

    const onFilterHandler = (criteria: string): void => {
        setState((prevState: ListDocumentState) => {
            return {
                ...prevState,
                search: {
                    criteria
                }
            }
        })

        fetchDocuments(state.pagination.page, limitPerPage, criteria);
    }

    return (
        <div className="doc-dashboard-container">
            <div className="d-flex align-items-center mx-2  mt-2">
                <h5 className="me-auto m-0 p-0">List of documents</h5>

                <button className="btn btn-sm btn-outline-success"
                        onClick={onShowCreateModalHandler}
                >
                    Upload Document
                </button>
            </div>

            <hr className="p-0 mt-1 mb-2 mx-2"/>

            {state.documents.length ?
                <Fragment>
                    <div className="mx-2 mb-1">
                        <FilterDocument onFilter={onFilterHandler}/>
                    </div>

                    <table className="table table-striped table-hover table-responsive table-sm">
                        <thead>
                        <tr>
                            <th style={{width: '90%'}}>Title</th>
                            <th style={{width: '10%'}}>&nbsp;</th>
                        </tr>
                        </thead>

                        <tbody>
                        {state.documents.map((document: Document) => {
                            return (
                                <tr key={document.id}>
                                    <td>{document.name}</td>
                                    <td className="d-flex justify-content-end">
                                        <button type="button"
                                                className="btn btn-sm btn-outline-secondary preview-btn"
                                                onClick={previewDocument.bind(null, document)}
                                        >
                                            Preview
                                        </button>

                                        <button type="button"
                                                className="btn btn-sm btn-danger preview-btn"
                                                onClick={showConfirmationDeleteModal.bind(null, document)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                    <Pagination limit={limitPerPage} prev={onPaginationHandler} next={onPaginationHandler}/>
                </Fragment> :
                <div className="alert alert-secondary d-flex justify-content-center m-2 p-1">
                    <strong>No records found</strong>
                </div>
            }

            {state.actions.upload && ReactDOM.createPortal(
                <Fragment>
                    <CreateDocument title="Upload document"
                                    okLabel="Upload"
                                    cancelLabel="Cancel"
                                    onSubmit={onUploadHandler}
                                    onFail={onUploadFailHandler}
                                    onCancel={onCloseCreateModalHandler}
                    />)
                </Fragment>, document.getElementById("overlay-root") as Element)
            }

            {state.actions.preview && state.selectedDocument && ReactDOM.createPortal(
                <Fragment>
                    <PreviewDocument document={state.selectedDocument}
                                     file={state.downloadedFile}
                                     onClose={onClosePreviewModalHandler}
                    />
                </Fragment>, document.getElementById("overlay-root") as Element)
            }

            {state.actions.delete && state.selectedDocument && ReactDOM.createPortal(
                <Fragment>
                    <DeleteConfirmation document={state.selectedDocument}
                                        onConfirm={deleteDocument}
                                        onCancel={onClosePreviewModalHandler}
                    />
                </Fragment>, document.getElementById("overlay-root") as Element)
            }

            {state.actions.loading && ReactDOM.createPortal(
                <Fragment>
                    <LoadingIndicator/>
                </Fragment>, document.getElementById("loading-root") as Element)
            }

        </div>
    );
}

export default ListDocument;
