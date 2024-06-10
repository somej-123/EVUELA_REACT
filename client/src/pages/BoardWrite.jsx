import {React, useContext, useEffect, useState} from 'react';
import Header from '../components/Header/Header';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import * as auth from '../apis/auth';


const BoardWrite = () => {

    const navigate = useNavigate();

    const [boardContents, setBoardContents] = useState({
        title: '',
        contents: '',
    })

    const { title, contents } = boardContents;

    const onChange = (event)=>{
        const { value, name } = event.target;
        
        console.log("value: " + value);
        console.log("name: " + name);

        setBoardContents({
            ...boardContents,
            [name]:value,
        })
    }

    const creativeContents = async()=>{
        await auth.creativeBoardContents(boardContents).then((res)=>{
            console.log(res)
            alert('등록되었습니다.');
            navigate('/board');
        })
    }

    useEffect(()=>{
        
    },[])

    return(
        <>
            <Header/>
            <Container>
                <div>
                    <h2>게시글 작성</h2>
                </div>
                <br/>
                <Form action="/board/createContents" target="post">
                    <Form.Group className="mb-3" controlId="boardWrite.ControlInput1">
                        <Form.Label>제목</Form.Label>
                        <Form.Control onChange={onChange} name='title' type="text" value={title} placeholder="제목을 작성해주세요" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="boardWrite.ControlTextarea1">
                        <Form.Label>내용</Form.Label>
                        <Form.Control name='contents' onChange={onChange} as="textarea" rows={3} value={contents} />
                    </Form.Group>
                    <Button variant="primary" onClick={()=>{creativeContents()}} type="button" style={{float:"right"}}>
                        등록
                    </Button>
                </Form>

            </Container>
        </>
    )
}

export default BoardWrite;