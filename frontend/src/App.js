import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      userId: userId,
      password: password
    };

    axios.post("http://localhost:8081/login", data)
      .then((res) => {
        setMessage(res.data);
        setUserId("");
        setPassword("");
      })
      .catch((err) => {
        console.error("Error:", err);
        setMessage("An error occurred.");
      });
  }

  return (
    <>
      <div className="container mt-5 App">

        <h1>Admin Login</h1>
        <div className="row mt-5">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">userId</label>
                <input
                  onChange={(e) => setUserId(e.target.value)}
                  type="email"
                  id="form2Example1"
                  className="form-control"
                  value={userId}
                  placeholder="Email address"
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="form2Example2"
                  className="form-control"
                  value={password}
                  placeholder="Password"
                />
              </div>

         

              <button onClick={handleSubmit} className="btn btn-primary btn-block mb-4">Sign in</button>

              <div className="text-center">
              
               
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-google"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-twitter"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-github"></i>
                </button>
              </div>

              {message && <div className="alert alert-info mt-3">{message}</div>} {/* Display server response */}
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </>

  );
}

export default App;

