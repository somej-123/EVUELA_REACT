import {React, useContext, useEffect, useState} from 'react';
import Header from '../components/Header/Header';
import { LoginContext } from '../contexts/LoginContextProvider';
import { useNavigate } from 'react-router-dom';
import * as Swal from '../apis/alert';
import * as auth from '../apis/auth';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import BoardModal from '../components/modal/BoardModal';

const Board = () => {

    // 모달 컨트롤
    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContents, setModalContents] = useState("");
    const [modalType, setModalType] = useState("");
    const [updateBoardIdx, setUpdateBoardIdx] = useState("");

    const handleShow = (title, contents, modalType, boardIdx) => {
        setModalTitle(title);
        setModalContents(contents);
        setModalType(modalType);
        setUpdateBoardIdx(boardIdx);
        setModalShow(true);
    };
    const handleClose = () => setModalShow(false);
    //모달 컨트롤 끝

    // const { isLogin, roles } = useContext(LoginContext);

    const navigate = useNavigate();

    //boardList 관련
    const [boardListData, setBoardListData] = useState(null);

    const getBoardList = async() => {
        const response = await auth.boardList();
        const data = response.data;
        setBoardListData(data);
    }

    //삭제 버튼 클릭 시
    const removeContents = (idx) => {
        Swal.confirm("", "삭제하시겠습니까?", "error",
            (result) => {
                if (result.isConfirmed) {
                    removeConfirm(idx);
                }
            }
        )
    }
    //삭제 확인 버튼 클릭 시
    const removeConfirm = async(idx) => {
        const response = await auth.removeBoardContents({ boardIdx: idx }).then((res) => {
            Swal.alert("삭제되었습니다.", "success");
            getBoardList();
        });
    }

    useEffect(() => {
        //게시판 정보 불러오기
        getBoardList();
    }, [])

    return (
        <>
            <Header />
            <div className='container'>
                <div style={{float:'right'}}>
                    <Button onClick={() => { navigate('/boardWrite') }} size="lg" variant="primary">작성</Button>
                </div>
                <h1>게시판 연습장</h1>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{textAlign:"center"}}>번호</th>
                            <th style={{textAlign:"center"}}>제목</th>
                            <th style={{textAlign:"center"}}>내용</th>
                            <th style={{textAlign:"center"}}>조회수</th>
                            <th style={{textAlign:"center"}}>작성자</th>
                            <th style={{textAlign:"center"}}>수정</th>
                            <th style={{textAlign:"center"}}>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boardListData && boardListData.map((element, index) => {
                            return <tr key={index}>
                                <td style={{textAlign:"center"}}>{element.boardIdx}</td>
                                <td>{element.title}</td>
                                <td style={{cursor:"pointer", color:"blue"}} onClick={() => handleShow(element.title, element.contents, "read")}>{element.contents}</td>
                                <td style={{textAlign:"center"}}>{element.hitCnt}</td>
                                <td style={{textAlign:"center"}}>{element.creatorId}</td>
                                <td style={{textAlign:"center"}}><Button type='button' variant="warning" onClick={() => handleShow(element.title, element.contents, "edit", element.boardIdx)}>수정</Button></td>
                                <td style={{textAlign:"center"}}><Button type='button' variant="danger" onClick={() => removeContents(element.boardIdx)}>삭제</Button></td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <BoardModal show={modalShow} title={modalTitle} contents={modalContents} handleClose={handleClose} modalType={modalType} updateBoardIdx={updateBoardIdx} refreshBoardList={getBoardList} />
            </div>
        </>
    )
}

export default Board;