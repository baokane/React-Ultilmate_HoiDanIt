import videoHomepage from '../../assets/video-homepage.mp4';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);

    console.log('account', account, 'auth ', isAuthenticated);

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title1">aaaaaaaaaaaaa</div>
                <div className="title2">aaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbb cbbbbbbbbbbbbbbbbbbbb</div>
                <div className="title3">
                    <button>Get's started. It's free.</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
