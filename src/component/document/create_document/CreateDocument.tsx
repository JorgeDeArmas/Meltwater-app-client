import React, { ReactNode, Fragment, useRef, useState } from "react";

import { FileDoc } from "../../../model/file-doc";
import classes from "./CreateDocument.module.css";
import { HttpResponse } from "../../../model/http-response";
import { FormControl } from "../../../services/form-control";
import DocumentService from "../../../services/document";
import { CreateDocumentParams, CreateDocumentState } from "../../../model/types";

const CreateDocument: React.FC<CreateDocumentParams> = (props) => {
   const initialState: CreateDocumentState = {
      document: new FileDoc(),
      form: {
         fileValid: true,
         phraseValid: true,
         submitted: false,
      },
      progressBar: {
         percent: 0,
         visible: false,
      },
   };
   const [createState, setCreateState] = useState<CreateDocumentState>(initialState);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleInputChange = (event: any): void => {
      const value = event.target.value;

      setCreateState((prevState: CreateDocumentState) => {
         return {
            ...prevState,
            document: {
               ...prevState.document,
               phrase: value,
            },
            form: {
               ...prevState.form,
               phraseValid: FormControl.isValidTextField(value),
            },
         };
      });
   };

   const handleFileChange = (event: any): void => {
      const value = event.target.files[0];

      setCreateState((prevState: CreateDocumentState) => {
         return {
            ...prevState,
            document: {
               ...prevState.document,
               file: value,
            },
            form: {
               ...prevState.form,
               fileValid: !!value,
            },
         };
      });
   };

   const resetForm = (state: CreateDocumentState) => {
      setCreateState(state);

      if (fileInputRef && fileInputRef.current) {
         fileInputRef.current.value = "";
      }
   };

   const setFormSubmittedState = (value: boolean): void => {
      setCreateState((previousState: CreateDocumentState) => {
         return {
            ...previousState,
            form: {
               ...previousState.form,
               submitted: value,
            },
         };
      });
   };

   const setFormFieldState = (key: string, value: boolean): void => {
      setCreateState((prevState: CreateDocumentState) => {
         return {
            ...prevState,
            form: {
               ...prevState.form,
               [key]: value,
            },
         };
      });
   };

   const isFormValid = (): boolean => {
      let formValid = true;

      if (!createState.form.fileValid || !createState.form.phraseValid) {
         formValid = false;
      }

      if (!createState.document.file) {
         formValid = false;
         setFormFieldState("fileValid", false);
      }

      if (!FormControl.isValidTextField(createState.document.phrase)) {
         formValid = false;
         setFormFieldState("phraseValid", false);
      }

      return formValid;
   };

   const onSubmitHandler = async () => {
      setFormSubmittedState(true);

      if (isFormValid()) {
         try {
            const response = await DocumentService.uploadFile(createState.document, (progress: ProgressEvent) => {
               setCreateState((prevState: CreateDocumentState) => {
                  return {
                     ...prevState,
                     progressBar: {
                        percent: (progress.loaded / progress.total) * 100,
                        visible: !!progress.loaded,
                     },
                  };
               });
            });

            if (response.status === 201) {
               setTimeout(() => {
                  resetForm(initialState);
               }, 1000);
            }

            props.onSubmit(response);
         } catch (e) {
            props.onFail(e);
         }
      }
   };

   return (
      <Fragment>
         <div className="modal-backdrop"></div>

         <div className={`modal modal-dialog-scrollable ${classes.modal}`}>
            <div className="modal-dialog">
               <div className={`modal-content ${classes["modal-content"]}`}>
                  <div className={`modal-header ${classes["modal-header-container"]}`}>
                     <h5 className="modal-title">{props.title}</h5>

                     <button type="button" className="btn-close" aria-label="Close" onClick={props.onCancel}></button>
                  </div>

                  <div className="modal-body">
                     <div className="row">
                        <div className="col-6">
                           <input
                              name="file"
                              type="file"
                              className={`form-control form-control-sm ${
                                 createState.form.submitted && !createState.form.fileValid
                                    ? classes["form-control-error"]
                                    : ""
                              }`}
                              ref={fileInputRef}
                              onChange={handleFileChange}
                           />

                           {createState.form.submitted && !createState.form.fileValid && (
                              <div className={`${classes["control-error-msg"]}`}>This field is required</div>
                           )}
                        </div>
                     </div>

                     <div className="row mt-2">
                        <div className="col-12">
                           {createState.progressBar.visible && (
                              <div className="progress">
                                 <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${createState.progressBar.percent}%` }}
                                 >
                                    {`${createState.progressBar.percent}%`}
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>

                     <div className="row">
                        <div className="col-12">
                           <label className="form-label" htmlFor="phrase">
                              Phrase
                           </label>

                           <input
                              name="phrase"
                              type="text"
                              className={`form-control form-control-sm ${
                                 createState.form.submitted && !createState.form.phraseValid
                                    ? classes["form-control-error"]
                                    : ""
                              }`}
                              value={createState.document.phrase}
                              onChange={handleInputChange}
                           />

                           {createState.form.submitted && !createState.form.phraseValid && (
                              <div className={`${classes["control-error-msg"]}`}>This field is required</div>
                           )}
                        </div>
                     </div>
                  </div>

                  <div className="modal-footer">
                     <button type="button" className="btn btn-sm btn-secondary" onClick={props.onCancel}>
                        {props.cancelLabel}
                     </button>

                     <button type="button" className={`btn btn-sm btn-success`} onClick={onSubmitHandler}>
                        {props.okLabel}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default CreateDocument;
