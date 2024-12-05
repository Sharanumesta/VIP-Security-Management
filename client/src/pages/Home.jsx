import React, { useEffect, useState } from "react";
import axios from "axios";
import MapWithMarker from "../components/MapWithMarker";

const Home = () => {
  const [soldiers, setSoldiers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/") // Fetch data from backend
      .then((res) => setSoldiers(res.data))
      .catch((err) => console.error("Error while fetching data...", err));
  }, []);

  return (
    <div className="container mt-5 col-8">
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center bg-light fw-bold text-center">
          <div className="col">Name</div>
          <div className="col">Rank</div>
          <div className="col">Status</div>
        </li>
        {soldiers.map((soldier, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between text-center"
          >
            <div className="col">{soldier.name}</div>
            <div className="col">{soldier.rank}</div>
            <div className="col">{soldier.status}</div>
          </li>
        ))}
      </ul>
      <h1>Map with Soldier Locations</h1>
      <MapWithMarker soldiers={soldiers} />
    </div>
  );
};

export default Home;
