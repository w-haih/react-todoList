import React from 'react'
import { Button, Input } from 'antd'
import { nanoid } from 'nanoid'
import './App.scss'


const App = () => {
  const [todoList, setTodoL] = React.useState([]);
  const [inputV, setInputV] = React.useState('');
  const [isDone, setIsDone] = React.useState(0)

  React.useEffect(() => {
    const isTrue = todoList.filter((todo) => {
      return todo.isCheck === true
    }).length;
    setIsDone(isTrue)
  }, [todoList])
  //获取value值
  const getInputValue = (e) => {
    const title = e.target.value;
    if (title.trim() === '') {
      alert('请输入内容')
    } else {
      const todo = { id: nanoid(), title: title, isCheck: false };
      setTodoL([todo, ...todoList]);
      setInputV('')
    }
  }
  //todo change
  const todoChange = (e, id) => {
    const newLists = todoList.map((todo) => {
      if (todo.id === id) {
        todo.isCheck = e.target.checked;
      }
      return todo;
    })
    setTodoL(newLists)
  };
  //删除todo
  const delTodo = (id) => {
    const newLists = todoList.filter((todo) => {
      return todo.id !== id
    });
    setTodoL(newLists)
  };
  //全选
  const checkAll=(e)=>{
    const newLists=todoList.map((todo)=>{
      todo.isCheck=e.target.checked;
      return todo;
    });
    setTodoL(newLists)
  };
  //删除所有已完成的数据
  const delAllDone=()=>{
    const newLists=todoList.filter((todo)=>{
      return todo.isCheck!==true
    });
    setTodoL(newLists)
  }
  return (
    <div className="todoList">
      <div className="todoHeader">
        <h2>TODOList</h2>
        <Input onPressEnter={getInputValue} value={inputV} onChange={(e) => { setInputV(e.target.value) }} placeholder='请输入内容,按enter键结束'></Input>
      </div>
      <ul className="list-con">
        {
          todoList.map((todo) => {
            return (
              <li key={todo.id} id={todo.id}>
                <div>
                  <input type="checkbox" onChange={(e) => todoChange(e, todo.id)} checked={todo.isCheck}></input>
                  <span>{todo.title}</span>
                </div>
                <Button type="primary" onClick={() => delTodo(todo.id)} danger style={{ display: 'none' }}>删除</Button>
              </li>
            )
          })
        }
      </ul>
      <div className="todoFooter">
        <div>
          <input type="checkbox" onChange={checkAll} checked={isDone === todoList.length & todoList.length !== 0}></input>
          <h3>已完成:{isDone}   总数:{todoList.length}</h3>
        </div>
        <Button type="primary" style={{display:isDone==0?'none':'inline-block'}} danger onClick={delAllDone}>删除所有已完成的数据</Button>
        
      </div>
    </div>
  )
}
export default App 