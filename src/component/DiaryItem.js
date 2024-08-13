import "./DiaryItem.css";
import { useNavigate } from "react-router-dom";
import { getEmotionImgById } from "../utill";
import Button from "./Button";


const DiaryItem = ({ id, emotionId, content, date }) => {
    const navigate = useNavigate();
    // 상세보기로 이동
    const goDetail = () => {
        navigate(`/diary/${id}`);
    }

    // 수정하기로 이동
    const goEdit = () =>{
        navigate(`/edit/${id}`);
    }

    return (
        <div className="DiaryItem">
            <div onClick={goDetail} className={["img_section", ` img_section_${emotionId}`].join("")}>
                <img alt={emotionId} src={getEmotionImgById(emotionId)} />
            </div>
            <div className="info_section">
                <div className="diary_date">{new Date(date).toLocaleDateString()}</div>
                <div className="diary_content">{content.slice(0, 25)}</div>
            </div>
            <div className="button_section">
                <Button onClick={goEdit} text={"수정하기"} />
            </div>
        </div>
    )
};

export default DiaryItem;