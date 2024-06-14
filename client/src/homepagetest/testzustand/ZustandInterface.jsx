import { React } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header'
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { uniqueId } from 'lodash';
import useInterfaceStore from "./ZustandInterfaceStore"

const ZustandInterface = () => {

    const navigate = useNavigate();

    const addContents = useInterfaceStore((state) => state.addContents);

    //유효성 검사 정의
    const checkDataForm = yup.object().shape({
        title: yup.string().required("제목을 작성해주세요."),
        contents: yup.string().required("내용을 입력해주세요"),
    });

    //   입력 항목의 유효성 검사 실행
    // useForm에 들어있는 것을 객체 분해할당한다.
    // register : input name에 해당한다.
    // handleSubmit : submit했을때 발생되는 이벤트이다.
    // formState는 react-hook-form에서 제공하는 객체로, 폼 상태와 관련된 여러 정보들을 포함하고 있습니다. 주로 폼 필드의 유효성 검사 결과인 errors와 함께 사용됩니다.
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(checkDataForm)
    });

    //validation에 성공했을 때
    const checkConfirm = async(data)=>{
        await addContents({ ...data });
        alert("등록하였습니다.")
        navigate('/board');
    }

    //validation에 실패했을 때
    const notConfirm = (data) =>{
        console.log(data);
        alert(data[Object.keys(data)[0]].message);
    }



    return(
        <>
        <Header/>
        <Container>
        <div style={{whiteSpace:"pre-wrap"}}>
            <form  onSubmit={handleSubmit(checkConfirm,notConfirm)}>
                <label style={{width:"100%"}}>
                    <h4>제목</h4>
                    <input style={{width:"100%"}} {...register('title')}/>
                    <p>{errors.title?.message}</p>
                </label>
                <label style={{width:"100%"}}>
                    <h4>내용</h4>
                    <textarea style={{width:"100%"}} {...register("contents")}></textarea>
                    <p>{errors.contents?.message}</p>
                </label>
                <br/>
                <button type='submit'>등록</button>
            </form>
        </div>
        </Container>
        </>
    )
}

export default ZustandInterface;