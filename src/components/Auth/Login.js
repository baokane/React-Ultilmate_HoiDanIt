import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { ToastContainer, toast } from 'react-toastify';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const handleLogin = async () => {
        // Validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('invalid email');
            return;
        }

        if (!password) {
            toast.error('invalid password');
            return;
        }

        // Submit api
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            // await props.fetchListUser();
            navigate('/');
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <div className="login-container">
            <div className="Header">
                <span>Don't have an account yet?</span>
                <button onClick={() => navigate('register')}>Sign up</button>
            </div>
            <div className="title col-4 mx-auto">Typeform</div>
            <div className="welcome col-4 mx-auto">Hello, who's this?</div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type={'email'}
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type={'password'}
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <span className="forgot-password">Forgot password?</span>
                <div>
                    <button className="btn-submit" onClick={handleLogin}>
                        Log in to Typeform
                    </button>
                </div>
                <div className="text-center">
                    <span className="back" onClick={() => navigate('/')}>
                        &#60;&#60; Go to homepage
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
