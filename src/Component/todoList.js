import React, { useState,useEffect } from 'react';
import './todo.css';
import { AiOutlineDelete, AiFillEdit, AiOutlineFileDone } from "react-icons/ai";

//get local data
function getLocalData() {
	const todoLists = localStorage.getItem('lists')
	if (todoLists) {
		return JSON.parse(todoLists)
	}
	else{
		return []
	}
}

function TodoList() {

	const [input, setInput] = useState('')
	const [todo, setTodo] = useState(getLocalData())
	const [edit, setEdit] = useState(0)

	//adding to the list
	const addTodo = () => {
		if(input !== '') {
			setTodo([...todo, { list: input, id: Math.random(), status : false }]);
		setInput("")
		}
	}

	// editing the list
	const editTodo = () => {
    if (edit) {
      const updatePart = todo.map((item) => {
        if (item.id === edit) {
          return { ...item, list: input };
        }
        return item;
      });
      setTodo(updatePart);
      setEdit(0);
      setInput('');
    }
  };

	const handleSubmit = (event) => {
		event.preventDefault();
	}

	const handleDelete = (id) => {
		setTodo(todo.filter((item) => id !== item.id))
	}

	const handleFinish = (id)=>{
		const todoComplete = todo.map((item)=>{
			if(id === item.id){
				return ({...item, status: !item.status})
			}
			else{
				return item
			}
	})
		setTodo(todoComplete)
	}

	const handleEdit = (id) => {
		const todoEdit = todo.find((item)=>item.id === id)
		setInput(todoEdit.list)
		setEdit(todoEdit.id)
	}

	//remove all list
	const removeList = ()=>{
		setTodo([])
	}
  
	//add data to locaStorage

	useEffect(()=>{
		if (typeof window !== 'undefined') {
			localStorage.setItem('lists',JSON.stringify(todo))
	}	
	},[todo])

	return (
		<div className="container">
			<h2>Todo-List</h2>
			<form className="form-group" onSubmit={handleSubmit}>
				<input type="text" value={input} placeholder="Enter your list" className='form-control' onChange={(event) => setInput(event.target.value)} />
				<button onClick={edit ? editTodo : addTodo}>{edit ? 'Edit' : 'Add'}</button>
			</form>
			<div className="lists">
				<ui>
					{
						todo.map((item) => (
							<li className="list-items">
								<input type="checkBox" className='list-item-icons' id="finished" title="finished" onClick={() => handleFinish(item.id)} />
								<div className="list-item-list" id = {item.status? "lineThrough":''}>{item.list}</div>
								<span>
									{/* <AiOutlineFileDone className='list-item-icons' id="finished" title="finished" onClick={() => handleFinish(item.id)} /> */}
									<AiFillEdit className='list-item-icons' id="edit" title="edit" onClick={() => handleEdit(item.id)} />
									<AiOutlineDelete className='list-item-icons' id="delete" title="delete" onClick={() => handleDelete(item.id)} />
								</span>
							</li>
						))
					}
				</ui>
			</div>
			<div className="newbutton">
				<button onClick={() =>removeList()}>Clear List</button>
			</div>
			
		</div>
	);
}

export default TodoList;