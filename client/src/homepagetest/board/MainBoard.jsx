import {React, useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import * as auth from "../../apis/auth"
import { FaFileExcel } from "react-icons/fa";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import "./MainBoardStyle.css";
import { useNavigate } from "react-router-dom";

const MainBoard = () => {

    const navigate = useNavigate();

    //boardList 관련
    const [boardListData, setBoardListData] = useState(null);

    const getBoardList = async() => {
        const response = await auth.boardList();
        const data = response.data;
        console.log(data);
        setBoardListData(data);
    }

    useEffect(() => {
        //게시판 정보 불러오기
        getBoardList();
    }, [])
    
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { headerName: '순번', field: "boardIdx" , flex: 1, cellStyle: { textAlign: 'center' }},
        { headerName: '제목', field: "title" , flex: 2, cellStyle: { textAlign: 'center' }},
        { headerName: '내용', field: "contents" , flex: 6},
        { headerName: '조회수', field: "hitCnt" , flex: 1, cellStyle: { textAlign: 'center' }},
        { headerName: '작성일자', field: "createdDatetime" , flex: 2, cellStyle: { textAlign: 'center' }},
        { headerName: '작성자', field: "creatorId" , flex: 1, cellStyle: { textAlign: 'center' }},
    ]);
    
    return(
        <>
            <Header/>
            <Container>
                <div style={{backgroundColor:"#D3D3D3", borderRadius:"10px", padding:"10px",}}>
                    <div style={{display:"flex", justifyContent:"space-between"}} className="mb-3">
                        <h3 style={{color:"black"}}>⭐Report List(rpt0020)</h3>
                        <div id="buttonDiv">
                            <Button variant="secondary">초기화</Button>{' '}
                            <Button variant="secondary">조회</Button>{' '}
                            <Button variant="secondary"><FaFileExcel /> 다운로드</Button>{' '}
                            <Button variant="secondary" onClick={()=>{navigate('/mainboardwrite')}}>작성</Button>{' '}
                        </div>
                    </div>
                    <div style={{backgroundColor:"white", padding:"10px", borderRadius:"10px"}}>
                        <form>
                            {/* 상단 검색 영역 */}
                            <div id="searchContentsTop"  style={{display:"flex", justifyContent:"space-between", marginBottom:"15px"}}>
                                <div>
                                    <label style={{ whiteSpace:"pre-wrap"}}>
                                        <span>보고서 </span>
                                    </label>
                                    <select>
                                        <option value={"전체"}>전체</option>
                                        <option value={"1"}>1</option>
                                        <option value={"2"}>2</option>
                                        <option value={"3"}>3</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ whiteSpace:"pre-wrap"}}>
                                        <span>날짜 </span>
                                    </label>
                                    <select>
                                        <option value={"제출일"}>제출일</option>
                                        <option value={"1"}>1</option>
                                        <option value={"2"}>2</option>
                                        <option value={"3"}>3</option>
                                    </select>
                                    <span> </span>
                                    <input type="date"/>
                                    <span> </span>
                                    <input type="date"/>
                                </div>
                                <div>
                                    <label style={{ whiteSpace:"pre-wrap"}}>
                                        <span>보고서 번호 </span>
                                    </label>
                                    <input style={{width:"50px"}} type="text"/>
                                </div>
                                <div>
                                    <label style={{ whiteSpace:"pre-wrap"}}>
                                        <span>상태 </span>
                                    </label>
                                    <select>
                                        <option value={"전체"}>전체</option>
                                        <option value={"1"}>1</option>
                                        <option value={"2"}>2</option>
                                        <option value={"3"}>3</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ whiteSpace:"pre-wrap"}}>
                                        <span>편명 </span>
                                    </label>
                                    <input style={{width:"80px"}} type="text"/>
                                </div>
                                <div>
                                    <label style={{ whiteSpace:"pre-wrap"}}>
                                        <span>등록부호 </span>
                                    </label>
                                    <input style={{width:"100px"}} type="text"/>
                                </div>
                            </div>
                            {/* 하단 검색 영역 */}
                            <div id="searchContentsBottom"  style={{display:"flex", justifyContent:"flex-start"}}>
                                <div style={{marginRight:"10px"}}>
                                    <label style={{ whiteSpace:"pre-wrap"}}>
                                        <span>작성부서 </span>
                                    </label>
                                    <select>
                                        <option value={"전체"}>전체</option>
                                        <option value={"1"}>1</option>
                                        <option value={"2"}>2</option>
                                        <option value={"3"}>3</option>
                                    </select>
                                    <span> </span>
                                    <input style={{width:"70px"}} type="text"/>
                                </div>
                                <div style={{marginRight:"10px"}}>
                                    <label style={{ whiteSpace:"pre-wrap"}}>
                                        <span>작성자 </span>
                                    </label>
                                    <input style={{width:"100px"}} type="text"/>
                                    <span> </span>
                                    <input style={{width:"100px"}} type="text"/>
                                </div>
                                <div style={{marginRight:"10px"}}>
                                    <label style={{ whiteSpace:"pre-wrap"}}>
                                        <span>발생장소 </span>
                                    </label>
                                    <input style={{width:"100px"}} type="text"/>
                                </div>
                                <div>
                                    <label style={{ whiteSpace:"pre-wrap"}}>
                                        <span>제목 </span>
                                    </label>
                                    <input style={{width:"500px"}} type="text"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <hr></hr>
                <br></br>
                <hr></hr>
                <div>
                    <h4>▮REPORT LIST</h4>
                </div>
                {/* ag그리드 */}
                <div
                className="ag-theme-quartz" // applying the grid theme
                style={{ height: 500, width:"100%" }} // the grid will fill the size of the parent container
                >
                <AgGridReact
                    rowData={boardListData}
                    columnDefs={colDefs}
                />
                </div>
            </Container>
            
        </>
    )
}

export default MainBoard;