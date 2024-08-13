import { Navigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "../component/Button";
import Header from "../component/Header";
import { getFormattedDate } from "../utill";
import { useNavigate } from "react-router-dom";


const Diary = () => {
    const { id } = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    // null 상태였다가, 일기 데이터로 update됨.
    console.log(data);

    if(!data){
        return <div>일기를 불러오고 있습니다...</div>
    }else{
        const {date, emotionId, content } = data;
        const title = `${getFormattedDate(new Date(Number(date)))}`;
        return (

            <div>
                <Header
                    title={title}
                    leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
                    rightChild={<Button text={"수정하기"} onClick={goEdit} />}
                />
                <div>{id}번 일기</div>
                <div>Diary 페이지입니다.</div>
            </div>
        )
    }
    // return (
    //     <div>
    //         <h2>일기 id: {id}</h2>
    //         <div>Diary 페이지입니다</div>
    //     </div>
    // )
};

export default Diary;