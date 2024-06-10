import { React, useState } from "react";
import Header from '../components/Header/Header';
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import RandomText from "./RandomText";

const MainPractice = ()=>{

    const [randomTextDisplay, setRandomTextDisplay] = useState("none");

    const randomBoardText = ()=>{
        if(randomTextDisplay == "none"){
            setRandomTextDisplay("block");
        }else{
            setRandomTextDisplay("none");
        }
    }

    return (
        <>
            <Header/>
            <Container>
                <Row>
                    <Col>
                        <h2>1.랜덤 게시글 등록</h2>
                        <Button type="button" onClick={()=>{randomBoardText()}}>랜덤 텍스트 게시글 만들기로 이동</Button>
                        <RandomText displayStatus={randomTextDisplay}></RandomText>
                    </Col>
                </Row>    
            </Container>
            
        </>
    )
}

export default MainPractice;