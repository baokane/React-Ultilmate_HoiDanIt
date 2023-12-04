import { useState } from 'react';
import Select from 'react-select';
import { BsPatchPlusFill } from 'react-icons/bs';
import { BsFillPatchMinusFill } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import './Questions.scss';

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: 'question 1',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: 'answer 1',
                    isCorrect: false,
                    test: 1,
                },
            ],
        },
    ]);

    // console.log('>>> question:', questions);

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ],
            };
            setQuestions([...questions, newQuestion]);
        }
        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter((item) => item.id !== id);
            setQuestions(questionClone);
        }
        // console.log('>>> check:', type, id);
    };

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        console.log('>>> answer:', type, questionId, answerId);

        let questionsClone = _.cloneDeep(questions);

        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            };

            let index = questions.findIndex((item) => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }

        if (type === 'REMOVE') {
            let index = questions.findIndex((item) => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter((item) => item.id !== answerId);
            setQuestions(questionsClone);
            console.log('question-clone:', questionsClone);
        }
    };

    console.log('>>> questions:', questions);

    return (
        <div className="question-container">
            <div className="title">Manage Question</div>
            <hr />
            <div className="add-new-question">
                <div className="col-6 form-group"></div>
                <label className="mb-2">
                    <b>Selec Quiz:</b>
                </label>
                <Select defaultValue={selectedQuiz} onChange={setSelectedQuiz} options={options} />
            </div>
            <div className="mt-3 mb-2">
                <b>Add question:</b>
            </div>
            {questions &&
                questions.length > 0 &&
                questions.map((question, index) => {
                    return (
                        <div key={question.id} className="q-main mb-4">
                            <div className="question-content">
                                <div className="form-floating description">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="name@example.com"
                                        value={question.description}
                                    />
                                    <label>Question {index + 1}'s description</label>
                                </div>
                                <div className="group-upload">
                                    <label>
                                        <RiImageAddFill className="label-up" />
                                    </label>
                                    <input type="file" hidden />
                                    <span>0 file is uploaded</span>
                                </div>
                                <div className="btn-add">
                                    <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                        <BsPatchPlusFill className="icon-add" />
                                    </span>
                                    {questions && questions.length > 1 && (
                                        <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                            <BsFillPatchMinusFill className="icon-remove" />
                                        </span>
                                    )}
                                </div>
                                {/* <div className="answer">
                    <input type="text" />
                </div> */}
                            </div>
                            {question &&
                                question.answers &&
                                question.answers.length > 0 &&
                                question.answers.map((answer, index) => {
                                    return (
                                        <div key={answer.id} className="answers-content">
                                            <input className="form-check-input iscorrect" type="checkbox" />
                                            <div className="form-floating answer-name">
                                                <input
                                                    value={answer.description}
                                                    type="type"
                                                    className="form-control"
                                                    placeholder="name@example.com"
                                                />
                                                <label>Answers {index + 1}</label>
                                            </div>
                                            <div className="btn-group">
                                                <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                    <FaPlus className="icon-add" />
                                                </span>
                                                {question.answers.length > 1 && (
                                                    <span
                                                        onClick={() =>
                                                            handleAddRemoveAnswer('REMOVE', question.id, answer.id)
                                                        }
                                                    >
                                                        <FaMinus className="icon-remove" />
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    );
                })}
        </div>
    );
};

export default Questions;
