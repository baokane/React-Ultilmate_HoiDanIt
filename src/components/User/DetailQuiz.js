import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiService';
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from './Question';

const DetailQuiz = (props) => {
    const params = useParams();

    const quizId = params.id;
    // console.log('pr', params);
    const location = useLocation();
    // console.log('lc', location);

    const [dataQuiz, setDataQuiz] = useState([]);

    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        // console.log('qs', res);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy('id')
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription,
                        image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }

                        // tạo mới key:value -> isSelected:false vào mỗi answers
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                        // console.log('item :', item);
                    });
                    // console.log('value ', value, 'key ', key);

                    return { questionId: key, answers, questionDescription, image };
                })
                .value();
            // console.log('data quiz: ', data);
            setDataQuiz(data);
        }
    };

    // console.log('dataQuiz:', dataQuiz);

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    };

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1);
        }
    };

    const handleCheckbox = (answerId, questionId) => {
        // console.log('q ID', questionId);

        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find((item) => {
            // console.log('item :', item);
            return +item.questionId === +questionId;
        });
        console.log('item của qs:', question);
        if (question && question.answers) {
            // console.log('q', question);
            let b = question.answers.map((item) => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                    console.log('item: ', item.id, 'answer ID:', answerId, 'item.isSelected:', item.isSelected);
                }
                // console.log('item: ', item, 'answer ID:', answerId);
                return item;
            });
            console.log('b:', b, 'question.answerd:', question.answers);
            question.answers = b; // đang thử ko dùng
        }

        // setDataQuiz(dataQuizClone);

        let index = dataQuizClone.findIndex((item) => +item.questionId === +questionId);
        if (index > -1) {
            dataQuizClone[index] = question;
            console.log(
                'dataQuizClone[index]:',
                dataQuizClone[index],
                'question:',
                question,
                'dataQuizClone:',
                dataQuizClone,
                'index:',
                index,
            );
            setDataQuiz(dataQuizClone);
        }

        // console.log('data quiz...: ', dataQuizClone);
    };

    // console.log('index + 1', index + 1);
    // console.log('dataQuiz[index]', dataQuiz[index]);

    const handleFinishQuiz = () => {
        // {
        //     "quizId": 1,
        //     "answers": [
        //         {
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         {
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }
        console.log('data quiz: ', dataQuiz);
        let payLoad = {
            quizId: +quizId,
            answers: [],
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach((question) => {
                let questionId = question.questionId;
                let userAnswerId = [];

                console.log('question:', question);

                // todo : userAnswerId
                question.answers.forEach((a) => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id);
                    }
                    console.log('a:', a);
                });
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId,
                });
            });

            payLoad.answers = answers;
            console.log('final payload:', payLoad);
        }
    };

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTilte}
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        index={index}
                        handleCheckbox={handleCheckbox}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary" onClick={() => handlePrev()}>
                        Prev
                    </button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>
                        Next
                    </button>
                    <button className="btn btn-warning" onClick={() => handleFinishQuiz()}>
                        Finish
                    </button>
                </div>
            </div>
            <div className="right-content">Count Down</div>
        </div>
    );
};

export default DetailQuiz;
