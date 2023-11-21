import videoHomepage from '../../assets/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    // const account = useSelector((state) => state.user.account);

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title1">aaaaaaaaaaaaa</div>
                <div className="title2">aaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbb cbbbbbbbbbbbbbbbbbbbb</div>
                <div className="title3">
                    {isAuthenticated === false ? (
                        <button onClick={() => navigate('/login')}>Get's started. It's free.</button>
                    ) : (
                        <button onClick={() => navigate('/users')}>Doing Quiz Now</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
