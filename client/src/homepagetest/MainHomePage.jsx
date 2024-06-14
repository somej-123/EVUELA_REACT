import { React, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MainHomePage = () => {

    const navigate = useNavigate();

    const moveToLink = (type)=>{
        if(type == "board"){
            navigate("/mainboard");
        }else if(type == "zustand"){
            navigate("/testzustand");
        }else if(type == "libtest"){
            navigate("/libtest");
        }else if(type == "zustandInterface"){
            navigate("/zustandInterface");
        }
    }
    return (
        <>
            <Header/>
            <Container style={{whiteSpace:"pre-wrap"}}>
                <h3>1. 게시판 관리</h3>
                <Button type="button" onClick={()=>{moveToLink("board")}}>이동</Button>
                <br/>
                <br/>
                <br/>
                <h3>2. zustand</h3>
                <Button type="button" onClick={()=>{moveToLink("zustand")}}>이동</Button>
                <br/>
                <br/>
                <br/>
                <h3>3. 라이브러리 테스트</h3>
                <Button type="button" onClick={()=>{moveToLink("libtest")}}>이동</Button>
                <br/>
                <br/>
                <br/>
                <h3>4. zustandInterface</h3>
                <Button type="button" onClick={()=>{moveToLink("zustandInterface")}}>이동</Button>
                <br/>
                <br/>
                <br/>
                {/* <h3>2. ????</h3>
                <Button type="button" onClick={()=>{moveToLink("board")}}>이동</Button> */}
            </Container>
        </>
    )
}
export default MainHomePage;