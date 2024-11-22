import React, { useState } from "react";
import "./Login.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { message } from "antd";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/LoaderComponent/Loader";

const Login = () => {
  const [emailObj, setEmailObj] = useState({
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(BASE_URL + "/user/login", emailObj);
      console.log(response.data);

      if (response.data.success) {
        message.success("Logged in");
        localStorage.setItem("skailamaAppToken", response.data.data);
        navigate("/all-projects");
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      message.error(e.response.data.message);
    }
    setLoading(false);
  };

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(BASE_URL + "/user/signup", formData);

      if (response.data.success) {
        setShowModal(false);
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log(error.respone.data.message);
    }
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="outer-div">
          <div className="left-div">
            <div className="left-div-image"></div>
            <div className="left-div-text">
              <img src="/Layer 1.png" alt="image"></img>
              <p style={{ fontSize: "3rem" }}>
                Your podcast will no longer be just a hobby.
              </p>
              <p style={{ fontSize: "1.2rem" }}>
                Supercharge Your Distribution using our AI assistant!
              </p>
            </div>
          </div>
          <div className="right-div">
            <div className="right-first-div">
              <img
                src="/Group 22.png"
                alt="image"
                style={{ height: "100px", width: "100px" }}
              ></img>
              <img src="/Welcome to Ques.AI.png" alt="image"></img>
            </div>
            <div className="right-second-div">
              <Input
                value={emailObj.email}
                onChange={(e) =>
                  setEmailObj({ ...emailObj, email: e.target.value })
                }
                className="custom-input"
                placeholder={"Email"}
                type={"email"}
                required={true}
              />
              <Input
                value={emailObj.password}
                onChange={(e) =>
                  setEmailObj({ ...emailObj, password: e.target.value })
                }
                className="custom-input"
                placeholder={"Password"}
                type="password"
                required={true}
              />

              <Button
                text={"login"}
                onClick={handleSubmit}
                style={{
                  height: "3rem",
                  width: "100%",
                  borderRadius: "10px",
                  background: "#7E22CE",
                  fontSize: "1rem",
                  color: "white",
                  cursor: "pointer",
                }}
              />
              <div className="line-div">
                <hr style={{ width: "100%" }}></hr>OR
                <hr style={{ width: "100%" }}></hr>
              </div>

              <div className="google-div">
                <img src="/image 6.png" alt="photo" />
                continue with Google
              </div>

              <div>
                Don't have an account!{" "}
                <strong
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setShowModal(true)}
                >
                  Create an Account
                </strong>
              </div>
            </div>
          </div>

          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                  <div className="input-container">
                    <label htmlFor="username">Username</label>
                    <input
                      value={formData.userName}
                      type="text"
                      id="username"
                      name="userName"
                      onChange={(e) =>
                        setFormData({ ...formData, userName: e.target.value })
                      }
                      required={true}
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input
                      value={formData.email}
                      type="email"
                      id="email"
                      name="email"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required={true}
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input
                      value={formData.password}
                      type="password"
                      id="password"
                      name="password"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required={true}
                    />
                  </div>
                  <button type="submit" className="submit-btn">
                    Register
                  </button>
                  <button
                    type="submit"
                    className="close-btn"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Login;
