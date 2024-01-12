import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Fragment } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const tokenResult = await user.getIdTokenResult();
      const userType = tokenResult.claims.admin ? 'admin' : 'user';
  
      onLogin(true, userType);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div>
        <lable>Email:</lable>
        <input type="email" value={email} onChange={ (e) => setEmail(e.target.value) } />
        <input type="password" value={password} onChange={ (e) => setPassword(e.target.value) } />
        <button onClick={handleLogin}>Login</button>
      </div>
    </Fragment>
  );
}

export default Login;
