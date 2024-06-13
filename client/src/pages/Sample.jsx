import { React,  useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import Header from '../components/Header/Header';
import { Container } from 'react-bootstrap';

//데이터
const options = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];


//메인 시작
function MySelectComponent() {

   // Row Data: The data to be displayed.
 const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);
  
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ]);

  return (
        <>
        <Header/>
        <Container>
            <div
            className="ag-theme-quartz-dark" // applying the grid theme
            style={{ height: 500 }} // the grid will fill the size of the parent container
            >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                pagination={true}
                paginationPageSize={20}
                paginationPageSizeSelector={[10,20,30,40,50]}
            />
            </div>
        </Container>
        </>
  );
}

export default MySelectComponent;