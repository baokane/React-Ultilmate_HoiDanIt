import axios from '../ultils/axiosCustomize';

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('usename', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
};

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
};

export { postCreateNewUser, getAllUsers };
