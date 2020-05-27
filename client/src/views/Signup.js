import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import iziToast from 'izitoast';

const Signup = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async(e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`http://localhost:5000/auth/signup`, {name, email, password});
            console.log(result.data.message);
            iziToast.show({
                color: 'blue',
                position: 'topRight',
                message: "Account successfully created",
            });
            history.push('/signin');
        }catch(error) {
            console.log(error.response.data);
            iziToast.show({
                color: 'red',
                position: 'topRight',
                message: error.response.data.error,
            });
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-between py-5">
                <div className="col-md-6">
                    <div className="landing-desc">
                        <h1>The Best Social network there is. Awesome Design</h1>
                        <p>From fashion, art, music, travel, and everything in between. Enjoy the best of social media platforms</p>
                        
                        <div>
                            <Link to="/signup" className="btn btn-gradient">Signin account</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-5">
                    <h2>Sign in</h2>

                    <form onSubmit={handleSignup}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Your name" />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="form-control" placeholder="Email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="form-control" placeholder="*****" />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-block btn-danger rounded" >Create account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;