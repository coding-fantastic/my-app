import React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import APIService from "../APIService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  const [isLogin, setLogin] = useState(true);
  let navigate = useNavigate();
  // let history = useHistory();

  useEffect(() => {
    // if (token["mytoken"]) {
    //   window.location.href = "/articles";
    //   console.log(token["mytoken"].length);
    // }

    var user_token = token["mytoken"];
    console.log("Login user token is ", user_token);
    console.log("Data type ", typeof token["mytoken"]);
    if (String(user_token) === "undefined") {
      navigate("/");
    } else {
      navigate("/articles");
    }
  }, [token]);

  const loginBtn = () => {
    if (username.trim().length !== 0 && password.trim().length !== 0) {
      // loginuser function reuturn users token
      APIService.LoginUser({ username, password })
        .then((resp) => setToken("mytoken", resp.token))
        .catch((error) => console.log(error));
    } else {
      console.log("username and password are not set");
      navigate("/");
    }
  };

  const RegisterBtn = () => {
    if (username.trim().length !== 0 && password.trim().length !== 0) {
      APIService.RegisterUser({ username, password })
        .then(() => loginBtn())
        .catch((error) => console.log(error));
    } else {
      console.log("username and password are not set");
      navigate("/");
    }
  };
  return (
    <div className="App">
      {isLogin ? <h1>Please Login</h1> : <h1>Please Register</h1>}

      <br />
      <br />
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          name=""
          className="form-control"
          id="username"
          placeholder="Please enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name=""
          className="form-control"
          id="password"
          placeholder="Please enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {isLogin ? (
        <button onClick={loginBtn} className=" btn btn-primary">
          Login
        </button>
      ) : (
        <button onClick={RegisterBtn} className=" btn btn-primary">
          Register
        </button>
      )}
      <div className="mb-3">
        <br />
        {isLogin ? (
          <h5>
            If you don't have an account , Please{" "}
            <button className="btn btn-primary" onClick={() => setLogin(false)}>
              Register
            </button>{" "}
            Here{" "}
          </h5>
        ) : (
          <h5>
            {" "}
            If you have account , please{" "}
            <button className="btn btn-primary" onClick={() => setLogin(true)}>
              Login
            </button>{" "}
            Here{" "}
          </h5>
        )}
      </div>
    </div>
  );
}

export default Login;
