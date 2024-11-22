import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils";
import { IoLogOutOutline, IoSettingsSharp } from "react-icons/io5";
import "./Project.css";
// import Settings from "../Components/Settings";
import Loader from "../../components/LoaderComponent/Loader";
import Button from "../../components/Button";
import { FaCross, FaEdit, FaHome, FaPlus, FaUpload } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsCopy } from "react-icons/bs";
import { RiVipDiamondLine } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { message } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import Settings from "../../components/SettingsComponent/Settings";
import Input from "../../components/Input";

const Project = () => {
  const { id } = useParams();

  const [viewEditTranscript, setViewEditTranscript] = useState(false);

  const [loader, setLoader] = useState(false);

  const [transcriptArray, setTranscriptArray] = useState([]);

  const [textEditable, setTextEditable] = useState(false);

  const [currentTab, setCurrentTab] = useState("addyourpodcast");

  const [projectData, setProjectData] = useState();

  const [transcriptObject, setTranscriptObject] = useState();

  const [transcriptSave, setTranscriptSave] = useState(false);

  const [tabs, setTabs] = useState(["home page"]);

  const [fileDetails, setFileDetails] = useState({
    episodeName: "",
    transcript: "",
    status: "",
  });

  const navigate = useNavigate();

  const getProjectData = async () => {
    try {
      const response = await axios.get(
        BASE_URL + `/project/project-detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("skailamaAppToken")}`,
          },
        }
      );

      if (response.data.success) {
        setTabs((prev) => {
          const updatedTabs = [...prev];
          updatedTabs[1] = response.data.data.name;
          return updatedTabs;
        });
        setProjectData(response.data.data);
        console.log(response.data.data);
        getEpisodes();
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTranscriptDelete = async (tId) => {
    try {
      console.log(tId);
      const response = await axios.delete(
        BASE_URL + `/episode/delete-episode/${tId}?pid=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("skailamaAppToken")}`,
          },
        }
      );

      if (response.data.success) {
        getEpisodes();
        message.success("deleted successfully");
      }
    } catch (error) {}
  };

  const handleUploadEpisode = async () => {
    setLoader(true);
    try {
      const response = await axios.post(
        BASE_URL + `/episode/create-episode/${id}`,
        fileDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("skailamaAppToken")}`,
          },
        }
      );
      if (response.data.success) {
        setProjectData(response.data.data);
        setTranscriptArray(response.data.data);
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      setFileDetails({
        episodeName: "",
        transcript: "",
        status: "",
      });
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error.message);
    }

    setLoader(false);
  };

  const handleTranscriptModalDescription = (fileId) => {
    const file = transcriptArray.filter((obj) => obj._id === fileId);
    console.log(file);
    setTranscriptObject({ ...file[0] });
    setViewEditTranscript(!viewEditTranscript);
  };

  const handleEditTranscriptInput = (e) => {
    setTranscriptObject({
      ...transcriptObject,
      ["transcript"]: e.target.value,
    });
  };

  const getEpisodes = async () => {
    try {
      const response = await axios.get(
        BASE_URL + `/episode/all-episodes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("skailamaAppToken")}`,
          },
        }
      );

      if (response.data.success) {
        setTranscriptArray(response.data.data);
      } else {
        message.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveEditTranscript = async () => {
    setLoader(true);
    try {
      const response = await axios.put(
        BASE_URL + `/episode/edit-episode/${transcriptObject._id}`,
        transcriptObject,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("skailamaAppToken")}`,
          },
        }
      );

      if (response.data.success) {
        setTranscriptObject((prev) => response.data.data);
        message.success(response.data.message);
        getEpisodes();
      } else {
        message.error("Error updating");
      }
    } catch (error) {}
    setLoader(false);
  };

  useEffect(() => {
    setTabs((prev) => {
      const newTabs = [...prev];
      newTabs[2] = currentTab;
      return newTabs;
    });
  }, [currentTab]);

  console.log(tabs);
  useEffect(() => {
    getProjectData();

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
        <div className="project-main-container">
          <div className="left-portion-project">
            <div className="company-logo">
              <img
                src="/QuesLogo 1.png"
                alt="icon"
                style={{ height: "30px", width: "120px" }}
              />
            </div>

            <div
              className="navigate-button"
              onClick={() => setCurrentTab("addyourpodcast")}
              style={
                currentTab == "addyourpodcast"
                  ? { color: "white ", backgroundColor: "#7E22CE" }
                  : { color: "black" }
              }
            >
              <h4>
                <FaPlus style={{ marginRight: "5px" }} /> Add your podcast(s)
              </h4>
            </div>
            <div
              style={
                currentTab == "create&response"
                  ? { color: "white ", backgroundColor: "#7E22CE" }
                  : { color: "black" }
              }
              className="navigate-button"
              onClick={() => setCurrentTab("create&response")}
            >
              <h4>
                <MdOutlineModeEditOutline style={{ marginRight: "5px" }} />{" "}
                Create & Repurpose
              </h4>
            </div>
            <div
              className="navigate-button"
              style={
                currentTab == "podcastwidget"
                  ? { color: "white ", backgroundColor: "#7E22CE" }
                  : { color: "black" }
              }
              onClick={() => setCurrentTab("podcastwidget")}
            >
              <h4>
                <BsCopy style={{ marginRight: "10px" }} />
                Podcast Widget
              </h4>
            </div>
            <div
              className="navigate-button"
              style={
                currentTab == "upgrade"
                  ? { color: "white ", backgroundColor: "#7E22CE" }
                  : { color: "black" }
              }
              onClick={() => setCurrentTab("upgrade")}
            >
              <h4>
                <RiVipDiamondLine style={{ marginRight: "10px" }} /> Upgrade{" "}
              </h4>
            </div>
            <div
              className="navigate-button settings-navigate"
              style={
                currentTab === "settings"
                  ? {
                      color: "white",
                      backgroundColor: "#7E22CE",
                    }
                  : {
                      color: "black",
                    }
              }
              onClick={() => setCurrentTab("settings")}
            >
              <IoSettingsSharp style={{ marginRight: "5px" }} />
              Settings
            </div>

            <hr style={{ fontSize: "2rem", width: "100%" }} />
          </div>

          <div className="right-portion-project">
            {tabs && tabs[1] && (
              <div className="tabs-div">
                <FaHome />
                {tabs.map((value, i) => {
                  return (
                    <div key={i} style={i == 2 ? { color: "#7E22CE" } : {}}>
                      {i < 2
                        ? `${value.toUpperCase()} ${"\u00A0"}/${"\u00A0"}`
                        : value.toUpperCase()}
                    </div>
                  );
                })}
                <IoLogOutOutline
                  style={{
                    marginLeft: "auto",
                    fontSize: "30px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    localStorage.removeItem("skailamaAppToken");
                    navigate("/login");
                  }}
                />
              </div>
            )}
            {currentTab !== "addyourpodcast" && currentTab !== "settings" && (
              <div>Feature coming soon...</div>
            )}

            {!viewEditTranscript && currentTab === "addyourpodcast" && (
              <>
                <h2
                  style={{
                    color: "black",
                    fontWeight: "700",
                    fontSize: "2rem",
                  }}
                >
                  Add Podcast
                </h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <Button
                    child={
                      <img
                        src="/1stimage.png"
                        alt="photo"
                        style={{ height: "60px", width: "60px" }}
                      />
                    }
                    onClick={() => setTranscriptSave(!transcriptSave)}
                    text={
                      <div className="add-podcast-left-div">
                        <h1>RSS Feed</h1>Lorem ipsum dolor sit. Dolor lorem sit.
                      </div>
                    }
                    className={"button-add-podcast"}
                  />
                  <Button
                    child={
                      <img
                        src="/youtube.png"
                        alt="photo"
                        style={{ height: "60px", width: "60px" }}
                      />
                    }
                    onClick={() => setTranscriptSave(!transcriptSave)}
                    text={
                      <div className="add-podcast-left-div">
                        <h1>RSS Feed</h1>Lorem ipsum dolor sit. Dolor lorem sit.
                      </div>
                    }
                    className={"button-add-podcast"}
                  />
                  <Button
                    child={
                      <img
                        src="/Vector.png"
                        alt="photo"
                        style={{ height: "50px", width: "50px" }}
                      />
                    }
                    text={
                      <div className="add-podcast-left-div">
                        <h1>RSS Feed</h1>Lorem ipsum dolor sit. Dolor lorem sit.
                      </div>
                    }
                    onClick={() => setTranscriptSave(!transcriptSave)}
                    className={"button-add-podcast"}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    borderRadius: "15px",
                    background: "#FFE091",
                    height: "3rem",
                  }}
                ></div>

                <div className="table-container">
                  {transcriptArray.length === 0 ? (
                    <div style={{ padding: "2rem", fontSize: "30px" }}>
                      Please Upload Podcast !
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Upload Date & Time</td>
                          <td>Status</td>
                          <td>Actions</td>
                        </tr>
                      </thead>
                      <tbody>
                        {transcriptArray.length !== 0 &&
                          transcriptArray.map((obj, i) => {
                            return (
                              <tr key={i}>
                                <td>{obj.name}</td>
                                <td>{formatDate(obj.uploadedAt)}</td>
                                <td>
                                  <div
                                    style={
                                      obj.status === "done"
                                        ? {
                                            borderRadius: "10px",
                                            border: "1px",
                                            background: "#DFBAFF",
                                            width: "fit-content",
                                            padding: "10px",
                                          }
                                        : {
                                            borderRadius: "10px",
                                            border: "1px",
                                            background: "#FFE091",
                                            width: "fit-content",
                                            padding: "10px",
                                          }
                                    }
                                  >
                                    {obj.status}
                                  </div>
                                </td>
                                <td
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                  }}
                                >
                                  <Button
                                    style={{
                                      cursor: "pointer",
                                      padding: "5px",
                                      borderRadius: "10px",
                                      padding: "10px",
                                      // color: "red",
                                      backgroundColor: "white",
                                      border: "1px",
                                      boxShadow: "1px 1px 1px 1px gray",
                                    }}
                                    text={"View"}
                                    onClick={() => {
                                      handleTranscriptModalDescription(obj._id);
                                    }}
                                  />
                                  <Button
                                    style={{
                                      cursor: "pointer",
                                      padding: "5px",
                                      padding: "10px",
                                      borderRadius: "10px",
                                      color: "red",
                                      // backgroundColor: "red",
                                      border: "1px ",
                                      boxShadow: "1px 1px 1px 1px gray",
                                    }}
                                    text={"Delete"}
                                    onClick={() =>
                                      handleTranscriptDelete(obj._id)
                                    }
                                  />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  )}
                </div>
              </>
            )}

            {viewEditTranscript && (
              <>
                <h2
                  style={{
                    color: "#7E22CE",
                    fontWeight: "700",
                    fontSize: "3rem",
                  }}
                >
                  {projectData.name}
                </h2>
                <div className="transcript-edit-modal">
                  <div className="edit-modal-first-section">
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
                        onClick={() => setViewEditTranscript(false)}
                      />{" "}
                      Edit Transcript
                    </h1>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem",
                      }}
                    >
                      <Button
                        style={{
                          padding: "10px",
                          borderRadius: "10px",
                          border: "1px solid",
                          backgroundColor: "black",
                          color: "white",
                          boxShadow: "1px 1px 1px 1px gray",
                          cursor: "pointer",
                        }}
                        text={!textEditable ? "Enable Edit" : "Disable Edit"}
                        onClick={() => setTextEditable(!textEditable)}
                      />
                      <Button
                        style={{
                          border: "2px solid red",
                          color: "red",
                          padding: "10px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          backgroundColor: "white",
                          boxShadow: "1px 1px 1px 1px gray",
                        }}
                        text={"Discard"}
                        onClick={() =>
                          setViewEditTranscript(!viewEditTranscript)
                        }
                      />
                      <Button
                        style={{
                          backgroundColor: "#211935",
                          color: "white",
                          padding: "10px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          boxShadow: "1px 1px 1px 1px gray",
                        }}
                        text={"Save & exit"}
                        onClick={() => {
                          setViewEditTranscript(!viewEditTranscript);
                          handleSaveEditTranscript();
                        }}
                      />
                    </div>{" "}
                  </div>
                  <textarea
                    className="transcript-edit-input-div"
                    value={transcriptObject.transcript}
                    onChange={(e) => {
                      textEditable && handleEditTranscriptInput(e);
                    }}
                  ></textarea>
                </div>
              </>
            )}

            {!viewEditTranscript && currentTab === "settings" && (
              <Settings setCurrentTab={setCurrentTab} />
            )}
          </div>
          {transcriptSave && (
            <>
              <div className="modal"></div>
              <div className="modal-container1">
                <div className="first-div-modal">
                  {" "}
                  <img
                    src="/youtube.png"
                    style={{ height: "40px", borderRadius: "50% " }}
                  />{" "}
                  Upload from youtube{" "}
                  <RxCross1
                    style={{
                      position: "absolute",
                      right: "1",
                      cursor: "pointer",
                    }}
                    onClick={() => setTranscriptSave(!transcriptSave)}
                  />
                </div>
                <div>episodeName</div>
                <Input
                  type="text"
                  style={{
                    width: "100%",
                    height: "3rem",
                    borderRadius: "10px",
                    // boxShadow: "1px 1px 1px 1px rgb(207, 207, 207)",
                    border: "1px solid",
                    padding: "10px",
                    fontSize: "15px",
                  }}
                  onChange={(e) => {
                    setFileDetails({
                      ...fileDetails,
                      ["episodeName"]: e.target.value,
                    });
                  }}
                />
                <div>Link/Transcript</div>
                <textarea
                  type="text"
                  style={{
                    width: "100%",
                    height: "2rem",
                    borderRadius: "10px",
                    // boxShadow: "1px 1px 1px 1px rgb(207, 207, 207)",
                    resize: "none",
                    height: "5rem",
                    border: "1px solid",
                    padding: "10px",
                    fontSize: "15px",
                    overflow: "auto",
                  }}
                  onChange={(e) => {
                    setFileDetails({
                      ...fileDetails,
                      ["transcript"]: e.target.value,
                    });
                  }}
                />
                <div>Status</div>
                <div>
                  <label style={{ marginRight: "10px" }}>
                    <Input
                      type="radio"
                      name="status"
                      value="done"
                      onChange={(e) => {
                        setFileDetails({
                          ...fileDetails,
                          status: e.target.value,
                        });
                      }}
                    />
                    Done
                  </label>
                  <label>
                    <Input
                      type="radio"
                      name="status"
                      value="inprogress"
                      onChange={(e) => {
                        setFileDetails({
                          ...fileDetails,
                          status: e.target.value,
                        });
                      }}
                    />
                    In Progress
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    gap: "1rem",
                  }}
                >
                  <Button
                    style={{
                      padding: "10px",
                      background: "#211935",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      boxShadow: "1px 1px 1px 1px #C8C8C8",
                      cursor: "pointer",
                    }}
                    text={"Upload"}
                    onClick={() => {
                      setTranscriptSave(!transcriptSave);
                      handleUploadEpisode();
                    }}
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

export default Project;
