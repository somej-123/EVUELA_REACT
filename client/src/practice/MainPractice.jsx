import { React, useState } from "react";
import Header from '../components/Header/Header';
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import RandomText from "./RandomText";
import SelectOnePage from "./SelectOnePage";
import SelectTwoPage from "./SelectTwoPage";
import SelectThreePage from "./SelectThreePage";
import * as Swal from '../apis/alert';
import Select from 'react-select';

const MainPractice = ()=>{

    const [randomTextDisplay, setRandomTextDisplay] = useState("none");

    const [selectValue, setSelectValue] = useState("");

    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'option1', label: '옵션 1' },
        { value: 'option2', label: '옵션 2' },
        { value: 'option3', label: '옵션 3' },
      ];

    const randomBoardText = ()=>{
        if(randomTextDisplay == "none"){
            setRandomTextDisplay("block");
        }else{
            setRandomTextDisplay("none");
        }
    }

    const selectChangeForm = (e) =>{
        let currValue = e.target.value;
        console.log(currValue);
        if(selectValue != ""){
            Swal.confirm("","기존내용이 지워집니다\n계속하시겠습니까?","error",
            (result)=>{
                if(result.isConfirmed){
                    console.log(currValue);
                    setSelectValue(currValue);
                }
            })
        }else{
            setSelectValue(e.target.value);
        }
    }

    const handleChange = (selected) => {
        setSelectedOptions(selected);
      };

    return (
        <>
            <Header/>
            <Container>
                <Row>
                    <Col>
                        <h2>select 다중선택</h2>
                        <Select
                            isMulti
                            value={selectedOptions}
                            onChange={handleChange}
                            options={options}
                        />
                        <br></br>
                        <h2>작성글 테스트</h2>
                        <br></br>
                        <select id="selectReport" onChange={selectChangeForm} value={selectValue}>
                            <option value={""}>선택</option>
                            <option value={"1"}>시안1</option>
                            <option value={"2"}>시안2</option>
                            <option value={"3"}>시안3</option>
                        </select>
                        {selectValue == 1 ? 
                                <SelectOnePage></SelectOnePage> : 
                         selectValue == 2 ?
                                <SelectTwoPage></SelectTwoPage> :
                        selectValue == 3 ?
                                <SelectThreePage></SelectThreePage> :
                                null
                        }
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h2>1.랜덤 게시글 등록</h2>
                        <br></br>
                        <Button type="button" onClick={()=>{randomBoardText()}}>랜덤 텍스트 게시글 만들기로 이동</Button>
                        <RandomText displayStatus={randomTextDisplay}></RandomText>
                    </Col>
                </Row>    
            </Container>
            
        </>
    )
}

export default MainPractice;