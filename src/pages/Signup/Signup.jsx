import React,{useState,useEffect} from 'react'
import styles from "./Signup.module.css"
import { Link ,useNavigate } from 'react-router-dom' 
const Signup = ()=>{

  const[userData , setUserData]=useState(
    {
    name : "",
    email : "",
    password : "",
    }
  )
  const navigate = useNavigate();
  useEffect(()=>{
            if(localStorage.getItem("loggedInUser")){
                navigate("/todo")
            }
        })

  const storeData = ()=>{
    let userDatas = JSON.parse(localStorage.getItem("userDatas"));

    if(!userDatas){
      userDatas = [];
    }

    if(userDatas.some((obj)=>obj.email == userData.email)){
      alert("This email already exists");
      return
    }

    userDatas.push(userData);
    localStorage.setItem("userDatas",JSON.stringify(userDatas))
    console.log(userData);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    navigate("/todo");
  }

return(
<div className={styles.mainContainer}>
  <div className={styles.todo}>To-Do</div>
    <div className={styles.formContainer}>

      <input
       type = "text"
       value = {userData.name}
       onChange = {(e)=>{
        setUserData({...userData,name : e.target.value})
       }}
       required
       placeholder = "Enter your name"
       className = {styles.userNameInput}
       />

       <input
       type = "email"
       required
       value = {userData.email}
       onChange = {(e)=>{
        setUserData({...userData,email:e.target.value})
       }}
       placeholder = "Enter your email"
       className = {styles.userEmailInput}
       />

       <input
       type = "password"
       required
       value = {userData.password}
       onChange = {(e)=>{
        setUserData({...userData,password:e.target.value})
       }}
       placeholder = "Enter password"
       className = {styles.userPasswordInput}
       />

       <button onClick={storeData} className={styles.sbtn}>SignUp</button>
       <p className={styles.loginhover}>Already have an account? <Link to ="/login" className={styles.loginhover}>Login now!</Link></p>
       

    </div>
</div>
)
}
export default Signup