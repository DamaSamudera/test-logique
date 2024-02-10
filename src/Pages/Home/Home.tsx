import React, { useState } from "react";
import "./Home.css";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <div className="home-container">
      <img
        src="images/logo.png"
        srcSet="images/logo@2x.png 2x, images/logo@3x.png 3x"
        alt="logo"
      />
      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Artist / Album / Title"
      />
      <Button onClick={() => navigate(`/music/${search}`)} type="primary">
        Search
      </Button>
    </div>
  );
};

export default Home;
