import {React, useRef, useState, useEffect, Component} from 'react'
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
// bootstrap
import { Button, Container, InputGroup, Form, Row, Col, FormGroup} from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useMainBoardZustand from './MainBoardZustand';

// sign 관련
import SignatureCanvas from 'react-signature-canvas';
//아이콘
import { FaPlus } from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
// 에디터
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const MainBoardWrite = ()=>{

    const [addDivContents, setAddDivContents] = useState([]);

    const addRow = () => {
        const newId = addDivContents.length;

        setAddDivContents(prevContents => [
            ...prevContents,
            {
                id: newId,
                contents: (
                    <div key={newId} id={newId} style={{backgroundColor:"white", borderRadius:"3px", height:"50px", borderBottom:"3px solid black"}}>
                        <Row style={{height:"100%"}}>
                            <Col className='addContentsCol'>
                                <div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap", borderRight:"1px dashed black"}}>
                                    <h5 style={{marginBottom:"0px"}}>{newId+1}</h5>
                                </div>
                            </Col>
                            {Array(4).fill().map((_, index) => (
                                <Col className='addContentsCol' key={index}>
                                    <div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap", borderRight:"1px dashed black"}}>
                                        <h5 style={{marginBottom:"0px"}}>
                                            <Form.Control style={{padding:"5px", border:"1px solid grey"}} type="text" id="inputPassword5"/>
                                        </h5>
                                    </div>
                                </Col>
                            ))}
                            <Col className='addContentsCol'>
                                <div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap"}}>
                                    <h5 style={{marginBottom:"0px"}}>
                                        <Button variant='danger' onClick={() => deleteContents(newId)}>삭제</Button>
                                    </h5>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )
            }
        ]);
    };

    useEffect(() => {
        console.log(addDivContents); // 상태가 변경될 때마다 출력
    }, [addDivContents]);

    const deleteContents = (id) => {
        setAddDivContents(prevContents => prevContents.filter(content => content.id !== id));
    };

    const [writeDivDisplay, setWriteDivDisplay] = useState(true);
    const [writeSEDivDisplay, setWriteSEDivDisplay] = useState(true);
    
    const navigate = useNavigate();

    const addContents = useMainBoardZustand((state) => state.addContents);

    //유효성 검사 정의
    const checkDataForm = yup.object().shape({
        boardIdx:yup.string().required("보고서 번호를 입력해주세요"),
        boardCreateDatetime:yup.string().required("날짜를 작성해주세요"),
        testdata1:yup.string().required("테스트 데이터를 선택해주세요"),
        title: yup.string().required("제목을 작성해주세요."),
        contents: yup.string().required("내용을 입력해주세요"),
        editor: yup.string().required("내용을 입력해주세요"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(checkDataForm)
    });
    
    const active = async(data)=>{
        await addContents({ ...data });
        alert("등록하였습니다.")
        navigate('/board');
    }

    const fail = (data)=>{
        console.log(data);
        alert(data[Object.keys(data)[0]].message);
    }
    const sigCanvas = useRef(null);

    const clearCanvas = () => {
      sigCanvas.current.clear();
    };
  
    const saveSignature = () => {
      const dataURL = sigCanvas.current.toDataURL();
      console.log(dataURL);
    };
  
    const loadSignature = () => {
      const exampleDataURL = 'data:image/png;base64,...'; // 실제 데이터 URL로 대체
      sigCanvas.current.fromDataURL(exampleDataURL);
    };
  
    const checkIfEmpty = () => {
      const isEmpty = sigCanvas.current.isEmpty();
      console.log('Canva`s is empty:', isEmpty);
    };

    const ToggleButton = () =>{
        setWriteDivDisplay(!writeDivDisplay);
    }

    const ToggleSEButton = () =>{
        setWriteSEDivDisplay(!writeSEDivDisplay);
    }

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
      );
    
      const [contentState, setContentState] = useState(() =>
        convertToRaw(editorState.getCurrentContent())
      );
    
      const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
      };
    
      const onContentStateChange = (contentState) => {
        setContentState(contentState); // 이 부분을 수정해야 합니다.
        console.log(contentState); // contentState를 출력해 보세요.
      };

    return(
        <>
            <Header/>
            <Container>
                <div style={{display:"flex", justifyContent:"space-between"}} className='mb-5'>
                    <h2>▮항공보안 보고서(Aviation Security Report,SER)</h2>
                    <Button variant="secondary">출력</Button>
                </div>
                <div style={{backgroundColor:"#D3D3D3", padding:"10px"}}>
                    <div style={{display:"flex", justifyContent:"space-between", backgroundColor:"#2E4044", borderRadius:"10px"}} className='mb-3'>
                        <h3 style={{color:"white",display:"flex",alignItems:"center", paddingLeft:"10px", margin:"0"}}>Basic Infomaiton</h3><MdKeyboardDoubleArrowDown onClick={ToggleButton} color='white' fontSize={"50px"} fontWeight={"bold"} cursor={"pointer"}/>
                    </div>
                    {writeDivDisplay && (<Form onSubmit={handleSubmit(active,fail)}>
                        <Row className="align-items-center">
                            <Col sm={4} className="my-1" style={{paddingRight:"0px"}}>
                                <InputGroup>
                                    <InputGroup.Text style={{backgroundColor:"#87A0A5", color:"white"}}>보고서 번호</InputGroup.Text>
                                    <Form.Control style={{borderRadius:"0px"}}
                                    id="inlineFormInputGroupReportNumber"
                                    {...register('boardIdx')}
                                    />
                                </InputGroup>
                            </Col>
                            <Col sm={4} className="my-1" style={{paddingRight:"0px", paddingLeft:"0px", borderRadius:"0px"}}>
                                <InputGroup>
                                    <InputGroup.Text style={{backgroundColor:"#87A0A5", color:"white", borderRadius:"0px"}}>작성일시</InputGroup.Text>
                                    <Form.Control
                                    id="inlineFormInputGroupWriteDate"
                                    type='date'
                                    {...register('boardCreateDatetime')}
                                    />
                                </InputGroup>
                            </Col>
                            <Col sm={4} className="my-1" style={{paddingLeft:"0px"}}>
                                <InputGroup>
                                    <InputGroup.Text style={{backgroundColor:"#87A0A5", color:"white", borderRadius:"0px"}}>테스트데이터1</InputGroup.Text>
                                    <Form.Select style={{borderRadius:"0px"}} {...register('testdata1')}>
                                        <option value={""}>데이터 선택</option>
                                        <option value={'data1'}>data1</option>
                                        <option value={'data2'}>data2</option>
                                        <option value={'data3'}>data3</option>
                                    </Form.Select>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <InputGroup>
                                <InputGroup.Text style={{backgroundColor:"#87A0A5", color:"white"}}>제목</InputGroup.Text>
                                <Form.Control
                                id="inlineFormInputGroupTitle"
                                type='text'
                                {...register('title')}
                                />
                            </InputGroup>
                        </Row>
                        <Row>
                            <InputGroup>
                                <InputGroup.Text style={{backgroundColor:"#87A0A5", color:"white"}}>내용</InputGroup.Text>
                                <Form.Control
                                as="textarea"
                                style={{ height: '100px' }}
                                {...register('contents')}
                                placeholder='textarea영역'
                                />
                            </InputGroup>
                        </Row>
                        <Row>
                        <div className='mt-3'>
                            <div style={{display:"flex", justifyContent:"space-between", backgroundColor:"#2E4044", borderRadius:"10px"}} className='mb-3'>
                                <h3 style={{color:"white",display:"flex",alignItems:"center", paddingLeft:"10px", margin:"0"}}>에디터 작성</h3><MdKeyboardDoubleArrowDown onClick={ToggleButton} color='white' fontSize={"50px"} fontWeight={"bold"} cursor={"pointer"}/>
                            </div>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={onEditorStateChange}
                                onContentStateChange={onContentStateChange}
                                // 추가: editorClassName을 사용하여 스타일 적용
                                editorStyle={{ backgroundColor: 'white', minHeight: '200px', cursor:"text" }}
                            />
                        </div>
                        </Row>
                        <div className='mt-1' style={{textAlign:"right"}}>
                            <Button variant='secondary' type='submit'>제출</Button>
                        </div>
                    </Form>)}
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", backgroundColor:"#2E4044", borderRadius:"10px", position:"relative"}} className='mb-3 mt-3'>
                            <h3 style={{color:"white",display:"flex",alignItems:"center", paddingLeft:"10px", margin:"0"}}>여러 행 추가</h3><FaPlus onClick={addRow} style={{position:"absolute", right:"60px"}} color='white' fontSize={"35px"} fontWeight={"bold"} cursor={"pointer"}/><MdKeyboardDoubleArrowDown onClick={ToggleSEButton} color='white' fontSize={"50px"} fontWeight={"bold"} cursor={"pointer"}/>
                    </div>
                    {writeSEDivDisplay && (<div>
                        <div style={{backgroundColor:"white", borderRadius:"3px", height:"50px", borderBottom:"3px solid black"}}>
                            <Row style={{height:"100%"}}>
                                <Col className='addContentsCol'>
                                    <div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap", borderRight:"1px dashed black"}}>
                                        <h5 style={{marginBottom:"0px"}}>순번</h5>
                                    </div>
                                </Col>
                                <Col className='addContentsCol'>
                                    <div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap", borderRight:"1px dashed black"}}>
                                        <h5 style={{marginBottom:"0px"}}>데이터1</h5>
                                    </div>
                                </Col>
                                <Col className='addContentsCol'>
                                    <div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap", borderRight:"1px dashed black"}}>
                                        <h5 style={{marginBottom:"0px"}}>데이터2</h5>
                                    </div>
                                </Col>
                                <Col className='addContentsCol'>
                                    <div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap", borderRight:"1px dashed black"}}>
                                        <h5 style={{marginBottom:"0px"}}>데이터3</h5>
                                    </div>
                                </Col>
                                <Col className='addContentsCol'>
                                    <div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap", borderRight:"1px dashed black"}}>
                                        <h5 style={{marginBottom:"0px"}}>데이터4</h5>
                                    </div>
                                </Col>
                                <Col className='addContentsCol'>
                                    <div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap"}}>
                                        <h5 style={{marginBottom:"0px"}}>삭제</h5>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        {addDivContents.map(content => content.contents)}
                        <div style={{textAlign:"right"}}>
                            <Button variant='secondary' className='mt-2'>등록</Button>
                        </div>
                    </div>)}
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>
                    <h2>Signature Canvas Example</h2>
                    <SignatureCanvas
                        ref={sigCanvas}
                        penColor='black'
                        canvasProps={{ width: 500, height: 200, className: 'sigCanvas', style: { border: '2px solid black' } }}
                    />
                    <button onClick={clearCanvas}>Clear</button>
                    <button onClick={saveSignature}>Save</button>
                    <button onClick={loadSignature}>Load</button>
                    <button onClick={checkIfEmpty}>Check if Empty</button>
                </div>
            </Container>
        </>
    )
}

export default MainBoardWrite;