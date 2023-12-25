import videoHomepage from '../../assets/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const HomePage = () => {
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    // const account = useSelector((state) => state.user.account);

    const { t } = useTranslation();

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title1">{t('homepage.title1')}</div>
                <div className="title2">{t('homepage.title2')}</div>
                <div className="title3">
                    {isAuthenticated === false ? (
                        <button onClick={() => navigate('/login')}>
                            {/* Get's started. It's free. */}
                            <Trans i18nKey="homepage.title3">{/* Get's started. It's free. */}</Trans>
                        </button>
                    ) : (
                        <button onClick={() => navigate('/users')}>
                            {/* Doing Quiz now! */}
                            <Trans i18nKey="homepage.title4"></Trans>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
