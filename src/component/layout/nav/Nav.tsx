import './Nav.css';
import logo from '../../../resources/images/meltwater-logo.svg';

const Nav = () => {
    return (
        <nav className="navbar navbar-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={logo}
                         alt="Meltwater"
                         width="120"
                         height="40"
                         className="d-inline-block align-text-top"/>
                </a>
            </div>
        </nav>
    );
}

export default Nav;
