import { useState } from 'react';
import { useEffect } from 'react';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalUpdateQuiz.scss';
import { deleteDeleteQuiz } from '../../../../services/apiService';
import { ToastContainer, toast } from 'react-toastify';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDeleteQuiz, fetchQuiz } = props;

    const handleClose = () => {
        setShow(false);
    };
    // const handleShow = () => setShow(true);
    console.log('dataDeleteQuizz:', dataDeleteQuiz.id);
    const handleSubmitDeleteQuiz = async () => {
        let res = await deleteDeleteQuiz(dataDeleteQuiz.id);
        console.log('deleteQuiz:', res);
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
                <Modal.Body>Are you sure you want to delete this {dataDeleteQuiz.name} email?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteQuiz}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteQuiz;
