import {React, useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import { Container, Form } from "react-bootstrap";
import * as auth from "../../apis/auth"

const MainBoard = () => {

    //boardList 관련
    const [boardListData, setBoardListData] = useState(null);

    const getBoardList = async() => {
        const response = await auth.boardList();
        const data = response.data;
        setBoardListData(data);
    }

    useEffect(() => {
        //게시판 정보 불러오기
        getBoardList();
    }, [])
    
    return(
        <>
            <Header/>
            <Container>
                <h3>게시판 관리</h3>
                <hr></hr>
            </Container>
            
        </>
    )
}

export default MainBoard;