import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import "./Allprojects.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/LoaderComponent/Loader";
import NavBar from "../../components/NavBar";
import ProjectCard from "../../components/ProjectcardComponent/ProjectCard";
import Button from "../../components/Button";
import Input from "../../components/Input";

const Allprojects = () => {
  const [allProjectsData, setAllProjectsData] = useState([]);

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const retrieveAllProjects = async () => {
    try {
      const response = await axios.get(BASE_URL + "/project/all-projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("skailamaAppToken")}`,
        },
      });

      if (response.data.success) {
        if (response.data.data.length !== 0) {
          setAllProjectsData(response.data.data);
        } else {
          navigate("/");
        }
      }

      console.log(response);
    } catch (error) {}
  };

  const [projectName, setProjectName] = useState("");

  const [isCreateProjectModalVisible, setIsCreateProjectModalVisible] =
    useState(false);

  const handleProjectCreate = async (payload) => {
    setLoader(true);
    try {
      const payload = {
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
      setAllProjectsData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
    setLoader(false);
  };
  useEffect(() => {
    retrieveAllProjects();

    if (!localStorage.getItem("skailamaAppToken")) {
      message.error("please login!");
      navigate("/login");
    }
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="all-projects-main">
          <NavBar />
          <div className="all-projects-inner">
            <div className="create-project-bar-allprojects-page">
              <h1 style={{ fontSize: "3rem", color: "#7E22CE" }}>Projects</h1>
              <img
                src="/createprojectbtn.svg"
                alt="icon"
                style={{ height: "3rem", margin: "10px", cursor: "pointer" }}
                onClick={() => {
                  setIsCreateProjectModalVisible(!isCreateProjectModalVisible);
                }}
              />
            </div>

            <div className="all-projects-grid">
              {allProjectsData.length !== 0 &&
                allProjectsData.map((obj, i) => {
                  return (
                    <ProjectCard
                      data={obj}
                      key={i}
                      onClick={() => {
                        navigate(`/project/${obj._id}`);
                      }}
                    />
                  );
                })}
            </div>

            {isCreateProjectModalVisible && (
              <>
                <div className="modal"></div>
                <div
                  className="modal-container"
                  style={{ gap: "20px", alignItems: "start", width: "70%" }}
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
                    <Input
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
                      onClick={() => {
                        handleProjectCreate();
                        setIsCreateProjectModalVisible(
                          !isCreateProjectModalVisible
                        );
                        setProjectName("");
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Allprojects;
