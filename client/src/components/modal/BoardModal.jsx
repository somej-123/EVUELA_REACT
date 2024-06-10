import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as Swal from '../../apis/alert';
import * as auth from '../../apis/auth'
import { useNavigate } from 'react-router-dom';

function BoardModal({ show, title, contents, handleClose, modalType, updateBoardIdx, refreshBoardList }) {
    const [modalTitle, setModalTitle] = useState("");
    const [updateTitle, setUpdateTitle] = useState(title);
    const [updateContents, setUpdateContents] = useState(contents);
    const [updateContentsIdx, setUpdateBoardIdx] = useState(updateBoardIdx);

    const Navigate = useNavigate();

    useEffect(() => {
        if (modalType === "edit") {
            setModalTitle("수정");
        } else if (modalType === "create") {
            setModalTitle("작성");
        } else {
            setModalTitle("상세보기");
        }

        setUpdateTitle(title);
        setUpdateContents(contents);
        setUpdateBoardIdx(updateBoardIdx);
    }, [modalType, title, contents, updateBoardIdx]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "updateTitle") {
            setUpdateTitle(value);
        } else if (id === "updateContents") {
            setUpdateContents(value);
        }

    };

    const modifyContents = ()=>{
        const data = {
            title : updateTitle,
            contents : updateContents,
        }

        Swal.confirm("","수정하시겠습니까?","success",
            (result)=>{
                if(result.isConfirmed){
                    modifyContentsConfrim();
                }
            })
    }

    const modifyContentsConfrim = async()=>{
        console.log("updateContentsIdx : " + updateContentsIdx);
        const response = await auth.updateBoardContents({boardIdx:updateContentsIdx, title:updateTitle, contents:updateContents}).then((res)=>{
            console.log("res : " + res);
            Swal.alert("","수정을 완료하였습니다.","success")
            // window.location.replace("/board");
            handleClose();
            refreshBoardList();
        })
    }

    const renderModalContent = () => {
        if (modalType === "read") {
            return (
                <div style={{ whiteSpace: "pre-wrap" }}>
                    <h2>{title}</h2>
                    <br />
                    <p>{contents}</p>
                </div>
            );
        } else if (modalType === "edit") {
            return (
                <Form>
                    <Form.Group className="mb-3" controlId="updateTitle">
                        <Form.Label>제목</Form.Label>
                        <Form.Control type="text" value={updateTitle} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="updateContents">
                        <Form.Label>내용</Form.Label>
                        <Form.Control as="textarea" rows={3} value={updateContents} onChange={handleChange} />
                    </Form.Group>
                    <Button style={{float:"right"}} variant="primary" type="button" onClick={()=>{modifyContents()}}>
                        수정
                    </Button>
                </Form>
            );
        } else if (modalType === "create") {
            return (
                <Form>
                    <Form.Group className="mb-3" controlId="updateTitle">
                        <Form.Label>제목</Form.Label>
                        <Form.Control type="text" value={updateTitle} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="updateContents">
                        <Form.Label>내용</Form.Label>
                        <Form.Control as="textarea" rows={3} value={updateContents} onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="button">
                        작성
                    </Button>
                </Form>
            );
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{renderModalContent()}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BoardModal;
