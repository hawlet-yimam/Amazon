import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import classes from './Auth.module.css';
import { auth } from '../../Utility/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { DataContext } from '../../components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';

function Authh() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  console.log(user);

  const authHandler = (e) => {
    e.preventDefault();
    const actionName = e.target.name;
    console.log(actionName);

    if (actionName === "signin") {
      // Sign In Logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          navigate("/"); // ወደ መነሻ ገጽ ይመልሰዋል
        })
        .catch((err) => {
          setError(err.message);
          console.log(err);
        });
    } else if (actionName === "signup") {
      // Sign Up (Create Account) Logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          navigate("/"); //
        })
        .catch((err) => {
          setError(err.message);
          console.log(err);
        });
    }
  };

  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to='/'>
        <img src="https://pngimg.com/uploads/amazon/small/amazon_PNG2.png" alt="amazon logo" />
      </Link>
      
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        
        {/* Error message display if any */}
        {error && <small style={{ color: "red", paddingBottom: "5px", display: "block" }}>{error}</small>}

        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id='email' />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" />
          </div>
          <button
            type="submit"
            className={classes.signIn}
            onClick={authHandler}
            name='signin'
          >
            Sign In
          </button>
        </form>

        {/* agreement */}
        <p>
          By signing in you agree to the AMAZON clone condition of use & sale.
          please see our privacy notice, our cookies Notice and our Interest-Based Ads Notice.
        </p>

        {/* create your btn */}
        <button
          type="submit"
          onClick={authHandler}
          className={classes.login_registerButton}
          name='signup'
        >
          Create Your Amazon Account
        </button>
      </div>
    </section>
  )
}

export default Authh;