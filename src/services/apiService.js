import axios from '../ultils/axiosCustomize';

const postCreateNewUser = (email, password, username, role, image) => {
    //1
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
};

const getAllUsers = () => {
    //2
    return axios.get('api/v1/participant/all');
};

const putUpdateUser = (id, username, role, image) => {
    //3
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
};

const deleteUser = (userId) => {
    //4
    return axios.delete('api/v1/participant', { data: { id: userId } });
};

const getUserWithPaginate = (page, limit) => {
    //5
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (userEmail, userPassword) => {
    //6
    return axios.post(`api/v1/login`, { email: userEmail, password: userPassword, delay: 5000 });
};

const postRegister = (userEmail, userPassword, userName) => {
    //7
    return axios.post(`api/v1/register`, { email: userEmail, password: userPassword, username: userName });
};

const getQuizByUser = () => {
    //8
    return axios.get('api/v1/quiz-by-participant');
};

const getDataQuiz = (id) => {
    //9
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
    //10
    return axios.post(`api/v1/quiz-submit`, { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, image) => {
    //11
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data);
};

const getAllQuizForAdmin = () => {
    //12
    return axios.get(`api/v1/quiz/all`);
};

const putUpdateQuiz = (id, name, description, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('description', description);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data);
};

const deleteDeleteQuiz = (userId) => {
    return axios.delete(`api/v1/quiz/${userId}`);
};

const postCreteNewQuestionForQuiz = (quiz_id, description, image) => {
    //12.1
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data);
};

const postCreteNewAnswerForQuestion = (description, correct_answer, question_id) => {
    //12.2
    return axios.post('api/v1/answer', { description, correct_answer, question_id });
};

const postAssignQuiz = (quizId, userId) => {
    //13
    return axios.post(`api/v1/quiz-assign-to-user`, { quizId, userId });
};

const getQuizWithQA = (quizId) => {
    //14
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpSertQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', { ...data });
};

const logout = (email, refresh_token) => {
    return axios.post('api/v1/logout', { email, refresh_token });
};

export {
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    getUserWithPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getDataQuiz,
    postSubmitQuiz,
    postCreateNewQuiz,
    getAllQuizForAdmin,
    putUpdateQuiz,
    deleteDeleteQuiz,
    postCreteNewQuestionForQuiz,
    postCreteNewAnswerForQuestion,
    postAssignQuiz,
    getQuizWithQA,
    postUpSertQA,
    logout,
};
