import React, { useEffect, useState } from "react";
import Input from "../Input";
import "./Settings.css";
import axios from "axios";
import { BASE_URL } from "../../constants";
import Button from "../Button";
import { message } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "../LoaderComponent/Loader";

const Settings = ({ save, setCurrentTab }) => {
  const [userData, setUserData] = useState({});

  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/get-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("skailamaAppToken")}`,
        },
      });
      if (response.data.success) {
        console.log(response.data.data);
        setUserData(response.data.data);
      } else {
        message.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        BASE_URL + `/user/edit-user?userName=${userData.userName}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("skailamaAppToken")}`,
          },
        }
      );

      if (response.data.success) {
        setUserData(response.data.data);
        message.success("username updated successfully!");
      } else {
        message.error("Error updating username");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="settings-container">
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {" "}
            <FaArrowLeft
              style={{ cursor: "pointer" }}
              onClick={() => setCurrentTab("addyourpodcast")}
            />{" "}
            Edit Transcript
          </h1>
          <div className="settings-div">
            <img
              src="/Ellipse 21.png"
              alt="icon"
              style={{ height: "10rem", width: "10rem", borderRadius: "50%" }}
            />
            <div className="settings-inner-div">
              <label htmlFor="usernameInputSettings">Username</label>
              <Input
                id="usernameInputSettings"
                name={"userName"}
                type={"text"}
                value={userData.userName}
                onChange={(e) =>
                  setUserData((prev) => {
                    return { ...prev, userName: e.target.value };
                  })
                }
                className={"setting-inputs"}
              />
            </div>
            <div className="settings-inner-div">
              <label>Email</label>
              <Input
                name={"email"}
                type={"text"}
                value={userData.email}
                className={"setting-inputs"}
              />
            </div>

            <Button
              text={"Update"}
              onClick={handleUpdate}
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px",
                background: "#7e22ce",
                color: "white",
                marginLeft: "10px",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
