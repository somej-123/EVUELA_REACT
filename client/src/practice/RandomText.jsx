import { React, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import * as auth from "../apis/auth"

const RandomText = ({displayStatus})=>{

    console.log("화면 : " + displayStatus);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const data = await auth.randomTextContents();
    //         console.log(data);
    //       } catch (error) {
    //         console.error('Error fetching data:', error.message);
    //       }
    //     };
    
    //     fetchData();
    //   }, []);

    return (
        <>
            <Container style={{display:displayStatus}}>
            <Form>
                <Form.Group className="mb-3" controlId="randomForm.title">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="randomForm.contents">
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>
            </Container>
        </>
    )
}

export default RandomText;