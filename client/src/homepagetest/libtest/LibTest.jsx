import { React } from "react"
import Header from "../../components/Header/Header"
import { Container } from "react-bootstrap";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";


const LibTest = () => {
    return(
        <>
            <Header/>
            <Container>
                <h1>User Registration</h1>
                <UserForm />
                <UserList />
            </Container>
        </>
    )
}

export default LibTest;