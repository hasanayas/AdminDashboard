import React from "react";
import Card1 from "../components/Cards/Card1";
import Card2 from "../components/Cards/Card2";
import Card3 from "../components/Cards/Card3";
import Card4 from "../components/Cards/Card4";
import Card5 from "../components/Cards/Card5";
import Card6 from "../components/Cards/Card6";
import Card7 from "../components/Cards/Card7";
import Card8 from "../components/Cards/Card8";
import Card9 from "../components/Cards/Card9";

const CardWrapper = ({ children }) => {
  return (
    <div
      style={{
        width: 450,
        height: 450,
        padding: "8px",
        margin: "10px",
        border: "2px solid #ccc",
        display: "flex",
        alignItems: "center", 
        justifyContent: "center", 
      }}
    >
      {children}
    </div>
  );
};

const Card = () => {
  return (
    <div className="container-fluid">
      <div className="row" style={{ gap: "-10px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="d-flex">
          <CardWrapper>
            <Card1 />
          </CardWrapper>
        </div>
        <div className="d-flex">
          <CardWrapper>
            <Card5 />
          </CardWrapper>
        </div>
        <div className="d-flex">
          <CardWrapper>
            <Card6 />
          </CardWrapper>
        </div>
      </div>

      <div className="row" style={{ gap: "-10px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="d-flex">
          <CardWrapper>
            <Card7 />
          </CardWrapper>
        </div>
        <div className="d-flex">
          <CardWrapper>
            <Card8 />
          </CardWrapper>
        </div>
        <div className="d-flex">
          <CardWrapper>
            <Card9 />
          </CardWrapper>
        </div>
      </div>

      <div className="row" style={{ gap: "-10px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="d-flex">
          <CardWrapper>
            <Card4 />
          </CardWrapper>
        </div>
        <div className="d-flex">
          <CardWrapper>
            <Card2 />
          </CardWrapper>
        </div>
        <div className="d-flex">
          <CardWrapper>
            <Card3 />
          </CardWrapper>
        </div>
      </div>

    </div>
  );
};

export default Card;
