import React,{useState,useEffect} from 'react'
import styles from "./Login.module.css"
import { Link, useNavigate } from 'react-router-dom'
const Login = ()=>{
const[userData , setUserData]=useState(
    {
    email : "",
    password : "",
    }
  )

   useEffect(()=>{
          if(localStorage.getItem("loggedInUser")){
              navigate("/todo")
          }
      })

  const navigate = useNavigate();


  const LoginUser = ()=>{
    let userDatas = JSON.parse(localStorage.getItem("userDatas"));

    if(!userDatas){
      userDatas = [];
    }

    if(userDatas.some((obj)=>obj.email == userData.email && obj.password == userData.password)){

      const user = userDatas.filter((obj)=>obj.email == userData.email)[0]
      localStorage.setItem("loggedInUser",JSON.stringify(user))

      navigate("/todo");
    }
    else{
      alert("wrong password or email");
      return
    }
  }

return(
<div className={styles.mainContainer}>
  <div className={styles.todo}>TO-DO</div>
    <div className={styles.formContainer}>

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

       <button onClick={LoginUser} className={styles.sbtn}>Login</button>
       <p className={styles.signuphover}>Don't have an account? <Link to ="/Signup" className={styles.signuphover}>SignUp Now!</Link></p>
       

    </div>
</div>
)
}
export default Login