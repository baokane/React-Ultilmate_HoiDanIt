import { useState } from 'react';
import Select from 'react-select';
import { BsPatchPlusFill } from 'react-icons/bs';
import { BsFillPatchMinusFill } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import './Questions.scss';

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({});

    return (
        <div className="question-container">
            <div className="title">Manage Question</div>
            <div className="add-new-question">
                <div className="col-6 form-group"></div>
                <label>
                    <b>Selec Quiz:</b>
                </label>
                <Select defaultValue={selectedQuiz} onChange={setSelectedQuiz} options={options} />
            </div>
            <div className="mt-3">
                <b>Add question:</b>
            </div>

            <div>
                <div className="question-content">
                    <div className="form-floating description">
                        <input type="text" className="form-control" placeholder="name@example.com" />
                        <label>Description</label>
                    </div>
                    <div className="group-upload">
                        <label className="label-up">Upload Image</label>
                        <input type="file" hidden />
                        <span>0 file is uploaded</span>
                    </div>
                    <div className="btn-add">
                        <span>
                            <BsPatchPlusFill className="icon-add" />
                        </span>
                        <span>
                            <BsFillPatchMinusFill className="icon-remove" />
                        </span>
                    </div>
                    {/* <div className="answer">
                    <input type="text" />
                </div> */}
                </div>
                <div className="answers-content">
                    <input className="form-check-input iscorrect" type="checkbox" />
                    <div className="form-floating answer-name">
                        <input type="text" className="form-control" placeholder="name@example.com" />
                        <label>Answers 1</label>
                    </div>
                    <div className="btn-group">
                        <span>
                            <FaPlus className="icon-add" />
                        </span>
                        <span>
                            <FaMinus className="icon-remove" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questions;
