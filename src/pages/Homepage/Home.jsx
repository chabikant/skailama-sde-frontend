import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { message } from "antd";
import NavBar from "../../components/NavBar";
import Button from "../../components/Button";
import Loader from "../../components/LoaderComponent/Loader";

const Home = () => {
  const [loader, setLoader] = useState(false);

  const [isCreateProjectModalVisible, setIsCreateProjectModalVisible] =
    useState(false);

  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");

  const handleProjectCreate = async () => {
    setLoader(true);
    try {
      let payload = {
        projectName: projectName,
      };
      const response = await axios.post(
        BASE_URL + "/project/create-project",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("skailamaAppToken")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/all-projects");
      } else {
        message.error("project not created!");
      }
      setLoader(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const retrieveAllProjects = async () => {
    try {
      const response = await axios.get(BASE_URL + "/project/all-projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("skailamaAppToken")}`,
        },
      });

      if (response.data.success) {
        if (response.data.data.length !== 0) {
          navigate("/all-projects");
        } else {
          navigate("/");
        }
      }

      console.log(response);
    } catch (error) {}
  };
  useEffect(() => {
    if (!localStorage.getItem("skailamaAppToken")) {
      message.error("please login!");
      navigate("/login");
    }

    retrieveAllProjects();
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="homepage-main-container">
          <NavBar />

          <div className="homepage-middle-container">
            <h1 className="heading-homapage" style={{}}>
              Create a New Project
            </h1>
            <img
              src="/homepageicon.svg"
              alt="homepageicon"
              className="hompage-image"
              style={{ height: "16rem", width: "24rem" }}
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in
            </p>
            <img
              src="/createprojectbtn.svg"
              alt="createprojectbtn"
              style={{ height: "3rem", cursor: "pointer" }}
              onClick={() => {
                setIsCreateProjectModalVisible(!isCreateProjectModalVisible);
              }}
            />
          </div>

          {isCreateProjectModalVisible && (
            <>
              <div className="modal"></div>
              <div
                className="modal-container"
                style={{ alignItems: "start", width: "70%" }}
              >
                <h1 className="">Create Project</h1>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <h4>Enter Project Name:</h4>
                  <textarea
                    required
                    value={projectName}
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "end",
                  }}
                >
                  <div
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() =>
                      setIsCreateProjectModalVisible(
                        !isCreateProjectModalVisible
                      )
                    }
                  >
                    {" "}
                    cancel
                  </div>
                  <Button
                    text={"Create"}
                    style={{
                      backgroundColor: "#7E22CE",
                      padding: "10px",
                      borderRadius: "10px",
                      color: "white",
                      alignSelf: "end",
                    }}
                    onClick={() => handleProjectCreate()}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
