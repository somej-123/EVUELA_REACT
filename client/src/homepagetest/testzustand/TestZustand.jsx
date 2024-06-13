import { React } from 'react'
import Header from '../../components/Header/Header'
import useStore from './ZustandStore'
import { Container } from 'react-bootstrap';

const TestZustand = () => {

const { count, log, increase, decrease } = useStore();

    return(
        <>
        <Header/>
        <Container>
        <div>
            <h1>{log}</h1>
            <h1>Count: {count}</h1>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
        </div>
        </Container>
        </>
    )
}

export default TestZustand;