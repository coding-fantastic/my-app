import React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import APIService from "../APIService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  const [isLogin, setLogin] = useState(true);
  // let history = useHistory();

  useEffect(() => {
    // if (token["mytoken"] == "undefined") {
    //   window.location.href = "/";
    //   console.log(token["mytoken"].length);
    //   console.log("in first if ");
    // }
    if (token["mytoken"]) {
      window.location.href = "/articles";
      console.log(token["mytoken"].length);
    }
  }, [token]);

  const loginBtn = () => {
    APIService.LoginUser({ username, password })
      .then((resp) => setToken("mytoken", resp.token))
      .catch((error) => console.log(error));
  };

  const RegisterBtn = () => {
    APIService.RegisterUser({ username, password })
      .then(() => loginBtn())
      .catch((error) => console.log(error));
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
