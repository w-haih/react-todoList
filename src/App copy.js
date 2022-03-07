
import React from 'react'
import './App.scss';
import { Input, Checkbox } from 'antd';
import {nanoid} from 'nanoid'


const CheckboxGroup=Checkbox.Group;

const App = () => {
  const [todoList,setTodoList]=React.useState([]);
  const [isAllCheck,setIsAllCheck] =React.useState(); //全选checkbox 
  
  //获取input 输入框中的值 
  const getInputValue = e => {
    const title = e.target.value;
    //if(e.keyCode!==13)return
    if(title.trim()===''){
      alert('请输入内容')
    }else{
      const todoObj={id:nanoid(),title:title,isCheck:false};
      setTodoList([todoObj,...todoList])
    }
  };
  //单个checkbox change
  const onChange = (id,e) => {
    //e.target.checked
    const newLists=[...todoList].filter((item)=>{
      if(item.id===id){
         item.isCheck=e.target.checked
      }
      return item 
    })
    setTodoList(newLists)
  };
  const onCheckAllChange = e => {
    const isChecked=e.target.checked;
    const newLists=[...todoList].filter((item)=>{
       item.isCheck=isChecked;
       return item 
    })
    setTodoList(newLists);

   const isAllList= newLists.filter((item)=>{
      return item.isCheck===true
    });
    const all=isAllList.length===(newLists.length&&newLists.length!==0);
    setIsAllCheck(all)
  };

  return (
    <div className="todoList">
      <h4>TodoList</h4>
      <div className="inputTodo" >
        {/* <Input onChange={(e)=>getInputValue(e)} placeholder="请输入待办事项，然后按enter键" /> */}
        {/* 第二种写法  onPressEnter 是antd中Input 按下回车的回调*/}
        {/* 有个坑，只能加 allowClear	可以点击清除图标删除内容 设置为true	,用e.target.value='' 不起作用 */}
        <Input onPressEnter={getInputValue} allowClear={true}  placeholder="请输入待办事项，然后按enter键" />
      </div>
      <div className="List">
        <ul>
          {
            todoList.map((item) => {
              return (
                <li key={item.id} id={item.id} >
                  <Checkbox onChange={(e)=>onChange(item.id,e)} checked={item.isCheck}></Checkbox>
                  <span>{item.title}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div>
        <input type='checkbox'  onChange={onCheckAllChange} checked={isAllCheck}/> 
      </div>
    </div>
  );
}

export default App;
