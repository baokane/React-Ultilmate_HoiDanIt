import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss';

const ManageUser = (props) => {
    return (
        <div className="manage-user-container">
            <div className="title">Manage user</div>
            <div className="users-content">
                <button>Add new user</button>
                <div>table user</div>
                <ModalCreateUser />
            </div>
        </div>
    );
};

export default ManageUser;
