import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

const App = () => {
    return (
        <div className="app-container">
            <div className="header-container">
                <Header></Header>
            </div>
            <div className="main-container">
                <div className="sidenav-container"></div>
                <div className="app-content">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
            {/* <div>
                test Link
                <div>
                    <button>
                        <Link to="/users">go to user page</Link>
                    </button>
                    <button>
                        <Link to="/admins">go to admin page</Link>
                    </button>
                </div>
            </div> */}
        </div>
    );
};

export default App;
