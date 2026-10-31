import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Auth.module.css';
import { auth } from '../../Utility/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { DataContext } from '../../components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';
import { ClipLoader } from "react-spinners";

function Authh() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  });
  const navigate = useNavigate();

  // 1. Sign In Handler
  const signinHandler = (e) => {
    e.preventDefault();
    setError(""); // ከዚህ ቀደም የነበረውን ኤረር ማጽዳት
    setLoading({ ...loading, signIn: true });

    signInWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({ ...loading, signIn: false });
        navigate("/");
      })
      .catch((err) => {
        console.error("Sign In Error:", err);
        setError(err.message);
        setLoading({ ...loading, signIn: false });
      });
  };

  // 2. Sign Up (Create Account) Handler
  const signupHandler = (e) => {
    e.preventDefault();
    setError(""); // ከዚህ ቀደም የነበረውን ኤረር ማጽዳት
    setLoading({ ...loading, signUp: true });

    createUserWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({ ...loading, signUp: false });
        navigate("/");
      })
      .catch((err) => {
        console.error("Sign Up Error:", err);
        setError(err.message);
        setLoading({ ...loading, signUp: false });
      });
  };

  return (
    <section className={classes.login}>
      {/* Amazon Logo */}
      <Link to='/'>
        <img src="https://pngimg.com/uploads/amazon/small/amazon_PNG2.png" alt="amazon logo" />
      </Link>
      
      {/* Form Container */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        
        {/* Error message display if any */}
        {error && (
          <small style={{ color: "red", paddingBottom: "5px", display: "block" }}>
            {error}
          </small>
        )}

        {/* Sign In Form */}
        <form onSubmit={signinHandler}>
          <div>
            <label htmlFor="email">Email</label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              id='email' 
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              id="password" 
              required
            />
          </div>
          
          <button
            type="submit"
            className={classes.signIn}
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Agreement Text */}
        <p>
          By signing in you agree to the AMAZON clone condition of use & sale.
          please see our privacy notice, our cookies Notice and our Interest-Based Ads Notice.
        </p>

        {/* Create Account Button */}
        <button
          type="button"
          onClick={signupHandler}
          className={classes.login_registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create Your Amazon Account"
          )}
        </button>
      </div>
    </section>
  );
}

export default Authh;