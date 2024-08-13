import "./Button.css";


// 전달된 props에 따라 다르게 동작하도록 변수 설정
const Button = ({ text, type = "default", onClick }) => {
    const btnType = ["positive", "negative"].includes(type) ? type : "default";
    return (    
    <button 
      className={["Button", `Button_${btnType}`].join(" ")}
      onClick={onClick}
    >
        {text}
    </button>
    )
   };


  //  Button.defaultProps = {
  //   type: "default",
  //  }; 

export default Button;