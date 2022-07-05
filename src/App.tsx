import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

import './App.css';
import Footer from './component/layout/footer/Footer';
import Nav from './component/layout/nav/Nav';
import ListDocument from './component/document/list-document/ListDocument';

const App = () => {
    return (
        <div className="container-fluid p-0">
            <Nav/>
            <ListDocument/>
            <Footer/>

            <ToastContainer/>
        </div>
    );
}

export default App;
