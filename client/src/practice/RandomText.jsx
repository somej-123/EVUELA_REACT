import { React } from "react";
import { Container } from "react-bootstrap";

const RandomText = ({displayStatus})=>{

    console.log("화면 : " + displayStatus);

    return (
        <>
            <Container style={{display:displayStatus}}>
                
            </Container>
        </>
    )
}

export default RandomText;