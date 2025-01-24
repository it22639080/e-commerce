import React, { useState } from "react";

const LoginSignup = () => {

  const [state,setState]=useState("Login");
   const [formData, setFormData]= useState({
    username: "",
    password:"",
    email:""
   })

   const changeHandler= (e)=> {
    setFormData({...formData,[e.target.name]: e.target.value})
   }
  const login =async ()=>{
console.log("login function executing",formData);

let responseData;
  
    await fetch('http://localhost:4008/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
  
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }

  const signup = async () => {
    console.log("signup function executing", formData);
    let responseData;
  
    await fetch('http://localhost:4008/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
  
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  };
  

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
    },
    formContainer: {
      backgroundColor: "#ffffff",
      width: "100%",
      maxWidth: "400px",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    heading: {
      fontSize: "24px",
      color: "#333333",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    loginText: {
      marginTop: "15px",
      fontSize: "14px",
      color: "#666666",
    },
    loginSpan: {
      color: "#007bff",
      cursor: "pointer",
      marginLeft: "5px",
      textDecoration: "underline",
    },
    agreeContainer: {
      display: "flex",
      alignItems: "center",
      marginTop: "15px",
      fontSize: "12px",
      color: "#666666",
    },
    checkbox: {
      marginRight: "8px",
      cursor: "pointer",
    },
    agreeText: {
      margin: "0",
      textAlign: "left",
      lineHeight: "1.5",
    },

   

  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
       
        <h1> {state}</h1>
        <div>
         {state === "Sign up" ?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Your name" style={styles.input} />:<></>}
          <input name='email'  value={formData.email} onChange={changeHandler} type="email" placeholder="Email address" style={styles.input} />
          <input name='password'  value={formData.password} onChange={changeHandler}  type="password" placeholder="Password" style={styles.input} />
        </div>
        <button  onClick={()=>{state==="Login"?login():signup()}} style={styles.button}>Continue</button>
        {state === "Sign up"?  <p style={styles.loginText}>
          Already have an account?
          <span onClick={()=>{setState("Login")}}style={styles.loginSpan}> Login</span></p>: <p style={styles.loginText}>
        create an account
          <span onClick={()=>{setState("Sign up")}} style={styles.loginSpan}> Click here</span></p>}
       
         
          <div style={styles.agreeContainer}>
            <input type="checkbox" style={styles.checkbox} />
            <p style={styles.agreeText}>
              By continuing, I agree to the terms of use & privacy policy
            </p>
          </div>
       
      </div>
    </div>
  );
};

export default LoginSignup;
