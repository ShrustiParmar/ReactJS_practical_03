import './App.css';
import { useEffect, useState } from 'react';

// get the items from localStorage
const getLocalItems = () => {
  let list = localStorage.getItem('lists');

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}

//App Component
function App() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(getLocalItems());

  //plus btn function
  const clickOnPlus = () => {
    document.getElementById('textInput').style.display = 'inline-block';
    document.getElementById('plusBtn').style.display = 'none';
  };

  //Esc key function
  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 27 ) {
      document.getElementById('textInput').style.display = 'none';
      document.getElementById('plusBtn').style.display = 'inline-block';
    }
  });

  //timer functionality
  let time = new Date().toLocaleTimeString();
  let date = new Date().toDateString();
  const [cTime, setCtime] = useState(time);
  const [cDate, setCdate] = useState(date);
  setInterval(() => {
    time = new Date().toLocaleTimeString();
    date = new Date().toDateString();
    setCtime(time);
    setCdate(date);
  },1000);

  //expire time for localstorage item
  const eTime = '23:59:00';
  if (cTime == eTime) {
    localStorage.removeItem('lists');
  }

  const inputTextEvent = (event) => {
    setInputValue(event.target.value);
  };

  const addItem = (event) => {
    if(event.keyCode === 13){
      event.preventDefault();

      if (inputValue !== "") {
        setItems((oldItems) => {
          return [...oldItems, inputValue];
        });
        setInputValue("");
      }else{
        document.getElementById('errorMsg').innerText = "*Enter Something";
      }
    }
  };

  //setting items to localStorage
  useEffect(() => {
    localStorage.setItem('lists',JSON.stringify(items))}
    ,[items]);
  
  return (
    <>
      <div className="main">
        <div className='date-time-div'>{cDate+" "+cTime}</div>
        <div className='todolist-container'>
          <div className='todolist'>
            <div className='todolist-header'>
              <h1>TODO LIST</h1>
            </div>
            <div className='todolist-body'>
              <ul>
              {
                items.map((itemval) => {
                  return <li>{itemval}</li>;
                })
              }
              </ul>
            </div>
            <div className='todolist-footer'>
              <button onClick={clickOnPlus} id="plusBtn">+</button>
              <input type="text" id="textInput" value={inputValue} placeholder="Add items" onChange={inputTextEvent} onKeyUp={addItem}/>
              <span className='errorMsg' id='errorMsg'></span>
            </div>          
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
