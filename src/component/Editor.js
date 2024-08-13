import "./Editor.css";
import { useState, useEffect } from "react";
import { emotionList, getFormattedDate } from "../utill";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";

const Editor = ({ initData, onSubmit }) => {
    const [state, setState] = useState({
        // 렌더링시 오늘 날짜 출력
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: "",
    });

    useEffect(() => {
        if(initData){
            setState({
                ...initData,
                date:getFormattedDate(new Date(parseInt(initData.date))),
            });
        }
    }, [initData]);

    // 작성완료 버튼 이벤트 핸들러
    const handleSubmit = () => {
        onSubmit(state);
    };

    const navigate = useNavigate();
    
    const handleGoBack = () => {
        navigate(-1);
    };
       

    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };

    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };

    // 감정 이미지 선택 이벤트 핸들러
    const handleChangeEmotion = (emotionId) => {
        setState({
            ...state,
            emotionId,
        });
    };

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="Editor">
            <div className="editor_section">
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input
                    type="date"
                    value={state.date}
                    onChange={handleChange}
                    />
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 감정</h4>
                <div className="input-wrapper emotion_list_wrapper">
                    {emotionList.map((it) => (
                      <EmotionItem
                        key={it.id}
                        {...it}
                        onClick={handleChangeEmotion}
                        isSelected={state.emotionId === it.id}
                        />
                    ))} 
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 일기</h4>
                <div className="input_weapper">
                    <textarea
                    placeholder="오늘은 어땠나요?"
                    value={state.content}
                    onChange={handleChange}
                    />
                </div>
            </div>
            <div className="editor_section bottom_section">
                <Button text="취소하기" onClick={handleGoBack} />
                <Button text="작성완료" type="positive" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default Editor;