import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../reducers/UserContext';

const Navbar = () => {
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();

    const isLoggedIn = () => {
        if(!user) {
            return (
                <React.Fragment>
                    <li><Link to="/signin">Sign in</Link></li>
                    <li><Link to="/signup">Sign up</Link></li>
                </React.Fragment>
            );
        }else{
            return (
                <React.Fragment>
                    <li><Link to="/">Posts</Link></li>
                    <li><Link to="/create-post">Create post</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><button onClick={() => {
                        localStorage.clear();
                        setUser(null);
                        history.push('/signin');
                    }}><span className="ti ti-power-off text-danger"></span></button></li>
                </React.Fragment>
            );
        }
    }
    
    return (
        <nav>
            <div className="container">
                <h3 className="logo"><span className="ti ti-instagram"></span> instagram</h3>
                <ul>
                    {isLoggedIn()}
                </ul>
            </div>
            <hr/>
        </nav>
    );
}

export default Navbar;