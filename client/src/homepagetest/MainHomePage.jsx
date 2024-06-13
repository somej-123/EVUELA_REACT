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
                <br/>
                <br/>
                <h3>2. zustand</h3>
                <Button type="button" onClick={()=>{moveToLink("zustand")}}>이동</Button>
                <br/>
                {/* <h3>2. ????</h3>
                <Button type="button" onClick={()=>{moveToLink("board")}}>이동</Button> */}
            </Container>
        </>
    )
}
export default MainHomePage;