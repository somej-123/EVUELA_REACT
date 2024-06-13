import {React, useEffect, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";

const SelectOnePage = ()=>{
    return(
        <>
            <Form>
                <Form.Group className="mb-3" controlId="randomForm.title">
                    <Form.Label>1번 선택 제목</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="randomForm.contents">
                    <Form.Label>1번 선택 내용</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>
        </>
    )
}
export default SelectOnePage;