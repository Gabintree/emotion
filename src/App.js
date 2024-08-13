import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
//import { getEmotionImgById } from './utill';
import React, { useReducer, useRef, useEffect } from 'react';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import { useState } from 'react';
import { createContext } from 'react';

// const emotionId = 1;

const mockData = [
  {
    id:'mock1',
    date:new Date().getTime(),
    content:'mock1',
    emotionId: 1,
  },
  {
    id:'mock2',
    date:new Date().getTime() + 86400000,    
    content:'mock2',
    emotionId: 2,
  },
  {
    id:'mock3',
    date:new Date().getTime() - 86400000,
    content:'mock3',
    emotionId: 3,
  },
];


function reducer(state, action){
  switch (action.type){
    case "CREATE": {
      return [action.data, ...state];
    }
    case "UPDATE": {
      return state.map((it) => 
      String(it.id) === String(action.data.id) ? {...action.data} : it
      );
    }
    case "DELETE": {
      return state.filter((it) => String(it.id) !== String(action.targetId));
    }
    case 'INIT':{
      return action.data;
    } 
    default: {
      return state;
    }
  }
}


export const DiaryStateContext = createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  // 로딩 상태 구현하기
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(3);

  useEffect(() => {
    dispatch({
      type: 'INIT',
      data:mockData,
    });
    setIsDataLoaded(true);
  }, []);

  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data:{
        id:idRef.current,
        date,
        content,
        emotionId,
      }
    });
     idRef.current += 1;
  };

  const onUpdate = (id, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      date: {
        id,
        date,
        content,
        emotionId,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id
    });
  };

  
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete}}>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route> 
        <Route path="/new" element={<New />}></Route>
        <Route path="/diary/:id" element={<Diary />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
      </Routes>
      <div>
        <Link to="/"></Link>
        <Link to="/new"></Link>
        <Link to="/diary"></Link>
        <Link to="/edit"></Link>        
      </div>

      {/* <img alt={emotionId} src={getEmotionImgById(emotionId)} /> */}
    </div>
    </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
