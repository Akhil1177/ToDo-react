import React,{useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./Todo.module.css"
import { v4 as uuidv4 } from 'uuid';


const Todo = ()=>{
    const navigate = useNavigate();

    const [userTodos, setUserTodos] = useState([])
    const [currentTodo, setCurrentTodo] = useState({
        id : uuidv4(),
        title : "",
        isCompleted : false
    });

    const[currentUser,setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("loggedInUser"))
    )

    useEffect(()=>{
        if(!localStorage.getItem("loggedInUser")){
            navigate("/login")
        }

     let todoData = JSON.parse(localStorage.getItem("todoData"))
     if (!todoData){
        todoData = {};
        localStorage.setItem("todoData",JSON.stringify({}));
     }
     let localUserTodos = todoData[currentUser.email]
     if(localUserTodos){
        setUserTodos(localUserTodos);
     }


    },[]);
  
  const updateTodo = () => {
  let todoData = JSON.parse(localStorage.getItem("todoData"));
  todoData[currentUser.email] = [...userTodos, currentTodo];
  setUserTodos([...userTodos, currentTodo]);
  localStorage.setItem("todoData", JSON.stringify(todoData));
  setCurrentTodo({
    id: uuidv4(),
    title: "",
    isCompleted: false,
  });
};

  const deleteTodo = (id)=>{
    let filteredTodos = userTodos.filter((todo)=>todo.id!=id)

    let todoData = JSON.parse(localStorage.getItem("todoData"));
    todoData[currentUser.email] = filteredTodos
    setUserTodos(filteredTodos);
    localStorage.setItem("todoData", JSON.stringify(todoData));


  }
  const toDone = (id, status) => {
  const updatedTodos = userTodos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, isCompleted: status };
    }
    return todo;
  });

  setUserTodos(updatedTodos); 

  const todoData = JSON.parse(localStorage.getItem("todoData"));
  todoData[currentUser.email] = updatedTodos;
  localStorage.setItem("todoData", JSON.stringify(todoData));
};

  
return(
<>
<div className={styles.mainContainer}>
    <div className={styles.todo}>{currentUser.name}'s To-Do</div>
    <div className={styles.todosub}>"make your lists here"</div>
    <div className={styles.inputGroup}>
    <input
      type="text"
      value={currentTodo.title||""}
      onChange={(e) => setCurrentTodo({ ...currentTodo, title: e.target.value })}
      placeholder="Add your text"
      className={styles.doText}
    />
    <button className={styles.button} onClick={updateTodo}>Add</button>
  </div>
    <div className={styles.formContainer}>

      {userTodos && userTodos.map((todo)=>(
       <div key={todo.id} className={styles.listGroup}>
       <input onChange = {(e)=>toDone(todo.id, e.target.checked)} checked={todo.isCompleted} type="checkbox" className={styles.tickbox}></input>
       <p className={styles.doList}>{todo.title}</p>
       <button onClick={()=>deleteTodo(todo.id)} className={styles.dbutton}>Delete</button>

  </div>
   ))}
    </div>
    <button className={styles.logout} onClick = {()=>{
    localStorage.removeItem("loggedInUser");
    navigate("/login");
    }
}>Logout</button>
</div>

</>
)
}
export default Todo