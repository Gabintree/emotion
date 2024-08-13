import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { emotionList } from "../utill";
import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate } from "../utill";
import DiaryList from "../component/DiaryList";


const Home = () => {

    // const handleSubmit = (data) => {
    //     alert("작성 완료 버튼을 클릭했습니다.");
   
    // }
    
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (data.length > 1){
            const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter((it) => beginTimeStamp <= it.date && it.date <= endTimeStamp)
            );
        }
        else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);

    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() +1}월`;

    // 월 증가
    const OnIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() +1));
    }

    // 월 감소
    const OnDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() -1));
    }



    return (
        <div>
            <Header
                title={headerTitle}
                leftChild={<Button text={"<"} onClick={OnDecreaseMonth}/>}
                rightChild={<Button text={">"} onClick={OnIncreaseMonth}/>}
            />
            <DiaryList data={filteredData} />
        </div>

        // <div>
        //     <Editor
        //         initData={{
        //             date: new Date().getTime(),
        //             emotionList : 1,
        //             content:'오늘의 작성할 일기 내용',
        //         }}   
        //     onSubmit={() => alert('작성완료!')}
        //     /> 
        // </div>

        // <div>
        //     <Header
        //         title={"Home"}
        //         leftChild={
        //             <Button
        //             text="긍정 버튼"
        //             type="positive"
        //             onClick={() => alert("positive button")}
        //             />
        //         }
        //         rightChild={
        //             <Button
        //             text="부정 버튼"
        //             type="negative"
        //             onClick={() => alert("negative button")}
        //             />
        //         }    
        //     />
        // </div>
    )
};

export default Home;