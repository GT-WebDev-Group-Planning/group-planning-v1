import React from "react";

function Login() {
  return (
    <div className="LogIn">
      <h1>Log In Page</h1>
        <p style={{textAlign: "center"}}>
        Username: 
        </p>
          <input type="text" placeholder="Username"/>
        <p style={{textAlign: "center"}}>
        Password:
        </p>
	        <input type="text" placeholder="Password"/>

          <button variant="text">Login</button>
    </div>

    
    
  );
}

export default Login;
