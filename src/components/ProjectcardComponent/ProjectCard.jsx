import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ data, onClick }) => {
  return (
    <div className="project-card-main" onClick={onClick}>
      <div className="project-card-image">SP</div>
      <div className="inner-div">
        <h4
          style={{
            wordBreak: "break-all",
            width: "12rem",
            color: "rgb(126, 34, 206)",
            fontSize: "25px",
          }}
        >
          {data.name}
        </h4>
        <p>{data.episodeCount} episodes</p>
        <p>last edited a week ago</p>
      </div>
    </div>
  );
};

export default ProjectCard;
