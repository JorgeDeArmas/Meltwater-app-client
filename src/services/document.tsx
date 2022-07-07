import axios from "axios";

import { FileDoc } from "../model/file-doc";

const host = process.env.REACT_APP_HOST_URI;
const endpoint = process.env.REACT_APP_END_POINT;

const DocumentService = {
   getDocument: async (id: string) => {
      return await axios.get(`${host}${endpoint}/${id}`);
   },
   getAllDocuments: async (page: number, limit: number, criteria: string) => {
      return await axios.get(`${host}${endpoint}?page=${page}&limit=${limit}&criteria=${criteria}`);
   },
   uploadFile: async (doc: FileDoc, onUploadProgress: (progress: ProgressEvent) => void) => {
      const formData = new FormData();

      formData.append("file", doc.file as File);
      formData.append("phrase", doc.phrase as string);

      return await axios.post(`${host}${endpoint}`, formData, {
         withCredentials: false,
         headers: { "Access-Control-Allow-Origin": "*" },
         onUploadProgress: onUploadProgress,
      });
   },
   downloadFile: async (id: string) => {
      return await axios.get(`${host}${endpoint}/${id}/downloads`);
   },
   deleteDocument: async (id: string) => {
      return await axios.delete(`${host}${endpoint}/${id}`);
   },
};

export default DocumentService;
