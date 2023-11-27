import React, { useState, useEffect } from "react";
import './test.css';

function Test({ userEmail, setUserEmail }) {
  return (
    <div className='gray-div'>
      <h1>WELCOME!</h1>
      <p>Sign in to continue to Group Planning App.</p>
      <button><a href="http://localhost:5000/google">Sign in with Google</a></button>
    </div>
  );
}

export default Test