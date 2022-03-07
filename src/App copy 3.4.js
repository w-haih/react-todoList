import React  from 'react'
import ReactDOM from 'react-dom';
import './App.scss';
import { Input, Button } from 'antd';
import { nanoid } from 'nanoid'

const App = () => {
  const [inputValue, setInputValue] = React.useState('')
  const [todoList, setTodoList] = React.useState([]);
  const [isDone, setIsDone] = React.useState(0);
  const [count,setCount]=React.useState(0)
  //使用useEffect  可以传两个参数 第一个是函数，传入的这个函数，就相当于生命周期钩子
  //至于是哪个生命周期钩子就要看配置,
  //第二个参数没有传的话，就是监测所有
  //第二个参数为空数组[],就是谁也不监测
  //第二个参数 为[isDone],就是监测isDone 的值，监测多个，中间用逗号隔开
  /*
    如果想用componentWillUnmount 即将卸载的钩子， 
    就得在第一个参数 函数中 (return) 返回的那个函数，相当于即将卸载的钩子 
  */
  React.useEffect(()=>{
    const DNum = todoList.filter((item) => {
      return item.isCheck === true
    }).length;
    setIsDone(DNum);
  },[todoList,count]);
  
  React.useEffect(()=>{
    let timer=setInterval(()=>{
      setCount(count=>count+1)
    },4000)
    return ()=>{
      // 这个位置相当于WillUnmount
      clearInterval(timer);
      alert('组件将要被卸载了')
    }
  },[])
//卸载组件
  const unmount=()=>{
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
  }
  //获取input 输入框中的值 
  const getInputValue = e => {
    const title = e.target.value;
    // const Date=new Date();
    // const nowTime=Date.toLocaleTimeString();     //获取当前时间
    if (title.trim() === '') {
      alert('请输入内容')
    } else {
      const todoObj = { id: nanoid(), title: title, isCheck: false };
      setTodoList([todoObj, ...todoList])
      setInputValue('');
    }
  };
  const inputChange = e => {
    setInputValue(e.target.value)
  }
  //单个checkbox change
  const onChange = (id, e) => {
    //e.target.checked
    const newLists = [...todoList].filter((item) => {
      if (item.id === id) {
        item.isCheck = e.target.checked
      }
      return item
    })
    setTodoList(newLists);
    
  };
 
  //单个todo删除
  const delTodo = id => {
    const newLists = todoList.filter((item) => {
      return item.id !== id
    });
    setTodoList(newLists)
  };
  //总选择框  
  const onCheckAllChange = (e) => {
    const isChecked = e.target.checked;
    const newLists = [...todoList].filter((item) => {
      item.isCheck = isChecked;
      return item
    })
    setTodoList(newLists);
  };
  //已完成数量
  // const DoneNum=(newLists) =>{
  //   const DNum = newLists.filter((item) => {
  //     return item.isCheck === true
  //   }).length;
  //   setIsDone(DNum);
  // }
  //删除所有已完成的TODO
  const delAllDone = () => {
    const newList = todoList.filter((item) => {
      return item.isCheck !== true
    });
    setTodoList(newList);
  }

  return (
    <div className="todoList">
      <h4>TodoList   {count}  <button onClick={unmount}>卸载组件</button></h4>
      <div className="inputTodo" >
        {/* <Input onChange={(e)=>getInputValue(e)} placeholder="请输入待办事项，然后按enter键" /> */}
        {/* 第二种写法  onPressEnter 是antd中Input 按下回车的回调*/}
        {/* Input 清除已输入 内容，必须加onChange */}
        <Input onPressEnter={getInputValue} onChange={inputChange} value={inputValue} allowClear={true} placeholder="请输入待办事项，然后按enter键" />
      </div>
      <div className="List">
        <ul>
          {
            todoList.map((item) => {
              return (
                <li key={item.id} id={item.id} >
                  <div>
                    <input type="checkbox" onChange={(e) => onChange(item.id, e)} checked={item.isCheck}></input>
                    <span>{item.title}</span>
                  </div>
                  {<Button type="primary" style={{ display: 'none' }} onClick={() => delTodo(item.id)} danger > 删除 </Button>}
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className="footer">
        <div className="footer_check">
          <input type='checkbox' onChange={onCheckAllChange} checked={todoList.length && (isDone === todoList.length) } ></input>
          <h2>已完成{isDone}/总数{todoList.length}</h2>
        </div>
        <Button danger style={{ display: isDone === 0 ? 'none' : 'inline-block' }} onClick={delAllDone}>删除所有已完成的任务</Button>
      </div>
    </div>
  );
}

export default App;
