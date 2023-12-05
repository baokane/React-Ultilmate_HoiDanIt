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
import Lightbox from 'react-awesome-lightbox';

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
        },
    ]);

    const [isPreviewImage, setIsPreviewImage] = useState(false);

    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: '',
    });

    const handleAddRemoveQuestion = (type, id) => {
        console.log('type:', type, 'id:', id);
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
            //
            let index = questionsClone.findIndex((item) => {
                // console.log('item.id:', item.id);
                return item.id === questionId;
            });
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }

        if (type === 'REMOVE') {
            //
            let index = questionsClone.findIndex((item) => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter((item) => item.id !== answerId);
            setQuestions(questionsClone);
            console.log('question-clone:', questionsClone);
        }
    };

    const handleOnChange = (type, questionId, value) => {
        console.log(type, questionId, value);
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            //
            let index = questionsClone.findIndex((item) => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    };

    const handleOnChangeFileQuestion = (questionId, e) => {
        let questionsClone = _.cloneDeep(questions);
        //
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1 && e.target && e.target.files && e.target.files[0]) {
            questionsClone[index].imageFile = e.target.files[0];
            questionsClone[index].imageName = e.target.files[0].name;
            setQuestions(questionsClone);
        }
    };

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        //
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers.map((answer) => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }
                }
                return answer;
            });

            setQuestions(questionsClone);
        }
    };

    const handleSubmitQuestionForQuiz = () => {
        console.log('>>> questions:', questions);
    };

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName,
            });

            setIsPreviewImage(true);
        }
    };

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
                {/* </div> */}
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
                                            onChange={(e) => handleOnChange('QUESTION', question.id, e.target.value)}
                                        />
                                        <label>Question {index + 1}'s description</label>
                                    </div>
                                    <div className="group-upload">
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className="label-up" />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            type="file"
                                            hidden
                                            onChange={(e) => handleOnChangeFileQuestion(question.id, e)}
                                        />
                                        <span>
                                            {question.imageName ? (
                                                <span
                                                    onClick={() => handlePreviewImage(question.id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {question.imageName}
                                                </span>
                                            ) : (
                                                '0 file is uploaded'
                                            )}
                                        </span>
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
                                </div>
                                {question &&
                                    question.answers &&
                                    question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className="answers-content">
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(e) =>
                                                        handleAnswerQuestion(
                                                            'CHECKBOX',
                                                            answer.id,
                                                            question.id,
                                                            e.target.checked,
                                                        )
                                                    }
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        value={answer.description}
                                                        type="type"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        onChange={(e) =>
                                                            handleAnswerQuestion(
                                                                'INPUT',
                                                                answer.id,
                                                                question.id,
                                                                e.target.value,
                                                            )
                                                        }
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
                {questions && questions.length > 0 && (
                    <div>
                        <button className="btn btn-warning" onClick={() => handleSubmitQuestionForQuiz()}>
                            Save Question
                        </button>
                    </div>
                )}

                {isPreviewImage === true && (
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    >
                        {/* {console.log(URL.createObjectURL(question.imageFile))} */}
                    </Lightbox>
                )}
            </div>
            {/* {isPreviewImage === true && <Lightbox image="image_url" title="Image Title"></Lightbox>} */}
        </div>
    );
};

export default Questions;
