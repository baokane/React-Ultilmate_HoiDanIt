import videoHomepage from '../../assets/video-homepage.mp4';

const HomePage = () => {
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
