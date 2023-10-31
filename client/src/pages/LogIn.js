import React from "react";

function Login() {
  return (
    <div className="LogIn">
      <h1>Log In Page</h1>
        <p style={{textAlign: "center"}}>
        Username:
        
          <input type="text" placeholder="Username"/>
          </p>
        <p style={{textAlign: "center"}}>
        Password:
        
	        <input type="text" placeholder="Password"/>
          </p>
          <p style={{textAlign: "center"}}>
          <button variant="text">Login</button>
          </p>
    </div>

    
    
  );
}

export default Login;
