import React from "react";
import './EmotionItem.css';

const EmotionItem = ({ id, img, name, onClick, isSelected }) => {
    const handleOnClick = () => {
        onClick(id);
    };

    return (
        // 선택한 이미지 값 변경에 따라 스타일을 다르게 먹히게 하기 위해 클래스 네임을 변수받아 변경
        <div className={`EmotionItem ${isSelected ? `EmotionItem_on_${id}` : 'EmotionItem_off'}`}
        onClick={handleOnClick}>
            <img alt={name} src={img} />
            <span>{name}</span>
        </div>

    )
}

export default EmotionItem;