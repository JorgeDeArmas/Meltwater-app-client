import React, { Fragment, useEffect, useRef, useState } from "react";

import classes from "./PreviewDocument.module.css";
import { PreviewDocumentParams, PreviewDocumentState } from "../../../model/types";

const PreviewDocument: React.FC<PreviewDocumentParams> = (props) => {
   const originalDocInputRef = useRef<HTMLInputElement>(null);
   const classifiedDocInputRef = useRef<HTMLInputElement>(null);
   const initialState: PreviewDocumentState = {
      documentUrl: props.document?.urlClassified || "",
   };
   const [state, setState] = useState<PreviewDocumentState>(initialState);

   const onOriginalDocChecked = (): void => {
      setState({ documentUrl: props.document?.urlOriginal as string });
   };

   const onClassifiedDocChecked = (): void => {
      setState({ documentUrl: props.document?.urlClassified as string });
   };

   useEffect(() => {
      if (classifiedDocInputRef && classifiedDocInputRef.current) {
         classifiedDocInputRef.current.checked = true;
      }
   }, []);

   return (
      <Fragment>
         <div className="modal-backdrop"></div>

         <div className={`modal ${classes.modal}`}>
            <div className="modal-dialog modal-xl">
               <div className={`modal-content ${classes["modal-content"]}`}>
                  <div className={`modal-header ${classes["modal-header-container"]}`}>
                     <h5 className="modal-title">{props.document?.name}</h5>

                     <button type="button" className="btn-close" aria-label="Close" onClick={props.onClose}></button>
                  </div>

                  <div className="row">
                     <div className="btn-group" role="group">
                        <input
                           id="originalDoc"
                           name="documentPreview"
                           type="radio"
                           className="btn-check"
                           autoComplete="off"
                           ref={originalDocInputRef}
                           onChange={onOriginalDocChecked}
                        />
                        <label
                           className={`btn btn-outline-success ${classes["border-radius-0"]}`}
                           htmlFor="originalDoc"
                        >
                           Original Document
                        </label>

                        <input
                           id="classifiedDoc"
                           name="documentPreview"
                           type="radio"
                           className="btn-check"
                           autoComplete="off"
                           ref={classifiedDocInputRef}
                           onChange={onClassifiedDocChecked}
                        />
                        <label
                           className={`btn btn-outline-success ${classes["border-radius-0"]}`}
                           htmlFor="classifiedDoc"
                        >
                           Classified Document
                        </label>
                     </div>
                  </div>

                  <div className="modal-body p-0">
                     {state.documentUrl ? (
                        <iframe
                           src={`${state.documentUrl}#view=fitH`}
                           title={props.document?.name}
                           height="100%"
                           width="100%"
                        />
                     ) : (
                        <div className="alert alert-secondary d-flex justify-content-center m-2 p-1">
                           <strong>No preview available for this document</strong>
                        </div>
                     )}
                  </div>

                  <div className="modal-footer">
                     <button type="button" className="btn btn-sm btn-secondary" onClick={props.onClose}>
                        Close
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default PreviewDocument;
