import { useState } from 'react';
import { useEffect } from 'react';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalUpdateQuiz.scss';
import { putUpdateQuiz } from '../../../../services/apiService';
import { getAllQuizForAdmin } from '../../../../services/apiService';
import { ToastContainer, toast } from 'react-toastify';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdateQuiz, fetchQuiz, resetDataModalUpdate } = props;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('EASY');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const handleClose = () => {
        setShow(false);
        setName('');
        setDescription('');
        setDifficulty('EASY');
        setImage('');
        setPreviewImage('');
        resetDataModalUpdate();
    };
    // const handleShow = () => setShow(true);

    const handleImageUpdateQuiz = (e) => {
        if (e && e.target && e.target.files[0]) {
            setImage(e.target.files[0]);
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    useEffect(() => {
        if (!_.isEmpty(dataUpdateQuiz)) {
            setName(dataUpdateQuiz.name);
            setDescription(dataUpdateQuiz.description);
            setDifficulty(dataUpdateQuiz.difficulty);
            setImage(dataUpdateQuiz.image);
            if (dataUpdateQuiz.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
            }
        }
    }, [dataUpdateQuiz]);

    const handleSubmitUpdateQuiz = async () => {
        let res = await putUpdateQuiz(dataUpdateQuiz.id, name, description, difficulty, image);
        console.log('updateQuiz:', res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            await fetchQuiz();
            // await fetchQuiz();
        } else if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size="xl" className="modal-update-quiz">
                <Modal.Header closeButton>
                    <Modal.Title>Modal Update Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Name</label>
                            <input
                                type="email"
                                class="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Description</label>
                            <input
                                type="text"
                                class="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Difficulty</label>
                            <select
                                class="form-select"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                <option selected>EASY</option>
                                <option>MEDIUM</option>
                                <option>HARD</option>
                            </select>
                        </div>

                        <div class="col-md-12">
                            <label for="inputPassword4" class="form-label">
                                Image Quiz
                            </label>
                            <input
                                type="file"
                                class="form-control"
                                id="inputPassword4"
                                // value={image} // value cua file ko co
                                onChange={handleImageUpdateQuiz}
                            />
                        </div>

                        <div className="img-update-quiz">
                            {previewImage ? <img src={previewImage} alt="anh" /> : <div>No Image</div>}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdateQuiz}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdateQuiz;
