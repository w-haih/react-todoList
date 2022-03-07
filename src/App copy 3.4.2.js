import React  from 'react'
import ReactDOM from 'react-dom';
import './App.scss';
import { Input, Button } from 'antd';
import { nanoid } from 'nanoid'

const App = () => {
  const [todoList,setTodoList]=React.useState([])
  const [inputV,setInputV]=React.useState('');
  const [isDone,setIsDone]=React.useState(0);

  //useEffect 监听todoList的变化
React.useEffect(()=>{
  const isD=todoList.filter((todo)=>{
    return todo.isCheck===true;
  }).length;
  setIsDone(isD)
},[todoList])

 //获取输入框中的值
  const getInputValue=(e)=>{
    const title=e.target.value;
    if(title.trim()===''){
      alert('请输入内容')
    }else{
      const todoObj={id:nanoid(),title:title,isCheck:false};
      setTodoList([todoObj,...todoList]);
    }
    setInputV('')
  }
  //选择单个li
  const checkTodo=(e,id)=>{
      const newLists=[...todoList].map((todo)=>{
        if(todo.id===id){
          todo.isCheck=e.target.checked;
        }
        return todo;
      })
      setTodoList(newLists)
  }
  //删除单个todo
  const delTodo=(id)=>{
    const newLists=todoList.filter((todo)=>{
        return todo.id!==id
    });
    setTodoList(newLists)
  }
  //全选
  const checkAll=(e)=>{
    const newLists=todoList.map((todo)=>{
        todo.isCheck=e.target.checked;
        return todo
    });
    setTodoList(newLists)
  }
  //删除所有已完成的数据
  const delAllDone=()=>{
    const newLists=todoList.filter((todo)=>{
      return todo.isCheck===false
    });
    setTodoList(newLists)
  }
  return (
    <div className="todoList">
      <h4>TodoList </h4>
      <div className="inputTodo" >
        <Input onPressEnter={getInputValue} value={inputV} onChange={(e)=>{setInputV(e.target.value)}} allowClear={true} placeholder="请输入待办事项，然后按enter键" />
      </div>
      <div className="List">
        <ul>
          {
            todoList.map((todo) => {
              return(
                <li key={todo.id} id={todo.id}>
                  <div>
                    <input type="checkbox" onChange={(e)=>checkTodo(e,todo.id)}  checked={todo.isCheck}></input>
                    <span>{todo.title}</span>
                  </div>
                  {<Button type="primary" danger onClick={()=>delTodo(todo.id)} style={{display:'none'}}>删除</Button>}
                </li>
              ) 
            })
          }
        </ul>
      </div>
      <div className="footer">
        <div className="footer_check">
          <input type='checkbox' onChange={checkAll} checked={isDone===todoList.length&todoList.length!==0} ></input>
          <h2>已完成{isDone}/总数{todoList.length}</h2>
        </div>
        {<Button type="primary" danger onClick={delAllDone} style={{display:isDone===0?'none':'inline-block'}}>删除所有已完成的数据</Button>}
      </div>
    </div>
  );
}
export default App;
