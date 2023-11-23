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
                        answers.push(item.answers);
                        // console.log('item :', item);
                    });
                    // console.log('value ', value, 'key ', key);

                    return { questionId: key, answers, questionDescription, image };
                })
                .value();
            // console.log(data);
            setDataQuiz(data);
        }
    };

    console.log('dq', dataQuiz);

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    };

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1);
        }
    };

    // console.log('index + 1', index + 1);

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
                    <Question index={index} data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary" onClick={() => handlePrev()}>
                        Prev
                    </button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>
                        Next
                    </button>
                </div>
            </div>
            <div className="right-content">Count Down</div>
        </div>
    );
};

export default DetailQuiz;
