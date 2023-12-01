import './ManageQuiz.scss';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { Table } from 'react-bootstrap';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');

    const handleChangeFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        }
    };

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required');
            return;
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image);
        console.log('res:', res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName('');
            setDescription('');
            setImage(null);
            setPreviewImage('');
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add new quiz:</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Your quiz name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Description ..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <label>Description</label>
                                </div>
                                <div className="my-3">
                                    <Select
                                        // value={type}
                                        // onChange={this.handleChange}
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={'Quiz type...'}
                                    />
                                </div>
                                <div className="more-actions form-group">
                                    <label htmlFor="upload-image" className="mb-1">
                                        Upload Image
                                    </label>
                                    <input
                                        hidden
                                        id="upload-image"
                                        type="file"
                                        className="form-control"
                                        onChange={(e) => handleChangeFile(e)}
                                    ></input>
                                </div>
                                <div className="preview-image">
                                    {previewImage ? <img src={previewImage} alt="anh" /> : <div>No Image</div>}
                                </div>
                                <div className="mt-3">
                                    <button onClick={() => handleSubmitQuiz()} className="btn btn-warning">
                                        Save
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <div className="list-detail">
                <TableQuiz />
            </div>
            <div></div>
        </div>
    );
};

export default ManageQuiz;