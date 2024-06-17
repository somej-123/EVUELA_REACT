import {React} from 'react'
import Header from '../../components/Header/Header';
import { Button, Container, InputGroup, Form, Row, Col, Textarea} from 'react-bootstrap';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useMainBoardZustand from './MainBoardZustand';

const MainBoardWrite = ()=>{
    
    const navigate = useNavigate();

    const addContents = useMainBoardZustand((state) => state.addContents);

    //유효성 검사 정의
    const checkDataForm = yup.object().shape({
        boardIdx:yup.string().required("보고서 번호를 입력해주세요"),
        boardCreateDatetime:yup.string().required("날짜를 작성해주세요"),
        testdata1:yup.string().required("테스트 데이터를 선택해주세요"),
        title: yup.string().required("제목을 작성해주세요."),
        contents: yup.string().required("내용을 입력해주세요"),
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
                        <h3 style={{color:"white",display:"flex",alignItems:"center", paddingLeft:"10px", margin:"0"}}>Basic Infomaiton</h3><MdKeyboardDoubleArrowDown color='white' fontSize={"50px"} fontWeight={"bold"} cursor={"pointer"}/>
                    </div>
                    <Form onSubmit={handleSubmit(active,fail)}>
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
                                        <option value={""}>데아터 선택</option>
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
                                />
                            </InputGroup>
                        </Row>
                        <div className='mt-1' style={{textAlign:"right"}}>
                            <Button variant='secondary' type='submit'>제출</Button>
                        </div>
                    </Form>
                </div>
                
            </Container>
        </>
    )
}

export default MainBoardWrite;