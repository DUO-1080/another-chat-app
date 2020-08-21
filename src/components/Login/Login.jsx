import React from "react";

import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { useStateValue } from "../../context/StateContext";
import { actionTypes } from "../../context/reducer";
import favicon from "../../images/favicon.png";
import "./Login.css";

const Login = () => {
  const [, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        localStorage.setItem("login user", JSON.stringify(result.user));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src={favicon} alt="login logo" />
        <div className="login__text">
          <h1>Sign in to Chat</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
};
export default Login;
