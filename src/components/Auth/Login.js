import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner10 } from 'react-icons/im';
import Language from '../Header/Language';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

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

        setIsLoading(true);

        // Submit api
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            // await props.fetchListUser();
            navigate('/');
            setIsLoading(false);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    };

    const hanldeKeyDown = (e) => {
        console.log('e.key:', e.key, e);
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="login-container">
            <div className="Header">
                <span>Don't have an account yet?</span>
                <button onClick={() => navigate('/register')}>Sign up</button>
                <Language />
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
                        onKeyDown={(e) => hanldeKeyDown(e)}
                    />
                </div>
                <span className="forgot-password">Forgot password?</span>
                <div>
                    <button className="btn-submit" onClick={handleLogin} disabled={isLoading}>
                        {isLoading === true && <ImSpinner10 className="loader-icon" />}
                        <span>Log in to Typeform</span>
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
