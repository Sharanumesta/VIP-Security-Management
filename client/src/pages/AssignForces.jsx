import React, { useState, useEffect } from "react";
import axios from "axios";
import MapContainer from "../components/MapWithMarker.jsx";
import Select from "react-select";

const AssignForces = () => {
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const [locationId, setLocationId] = useState(null);
  const [numSoldiers, setNumSoldiers] = useState(0);

  const [assignedForces, setAssignedForces] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  // Fetch location options for the dropdown
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/locations`);
        const locations = response.data.map((location) => ({
          label: location.name,
          id: location._id,
        }));
        setLocationOptions(locations);
      } catch (error) {
        console.error("Error fetching location options:", error);
      }
    };

    fetchLocations();
  }, [apiUrl]);

  // Handle form submission
  const handleAssign = async (e) => {
    e.preventDefault();

    if (!location || numSoldiers <= 0) {
      alert("Please provide valid inputs.");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/assign-soldiers`, {
        locationId,
        numSoldiers
      });

      // Check if soldiers are returned in the response and is an array
      const soldiers = Array.isArray(response.data.soldiers)
        ? response.data.soldiers
        : [];

      if (soldiers.length === 0) {
        alert("No soldiers available for assignment.");
        return;
      }

      setAssignedForces((prevForces) => [...prevForces, ...soldiers]);
      alert("Forces assigned successfully!");
    } catch (error) {
      console.error("Error assigning forces:", error);
      alert("An error occurred while assigning forces.");
    }
  };

  return (
    <div className="container mt-4">
      <header>
        <h1>Assign Forces</h1>
        <p>
          Allocate soldiers to specific locations and visualize their deployment
          on the map.
        </p>
      </header>

      <form onSubmit={handleAssign} className="assign-form">
        <div className="row">
          <div className="form-group col">
            <label htmlFor="location-select">Location:</label>
            <Select
              options={locationOptions}
              onChange={(selectedOption) => setLocationId(selectedOption.id)}
              placeholder="Select a location"
              aria-label="Select a location"
            />
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="num-soldiers">Number of Soldiers:</label>
              <input
                type="number"
                id="num-soldiers"
                className="form-control"
                value={numSoldiers}
                onChange={(e) => setNumSoldiers(Number(e.target.value))}
                placeholder="Enter number of soldiers"
                aria-label="Enter number of soldiers"
                min="1"
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Assign
        </button>
      </form>

      {/* <h2 id="map-title" className="mt-5">
        Map View
      </h2> 
      <p>Visualize the locations and assigned forces below.</p>
      <MapContainer soldiers={assignedForces} /> */}
    </div>
  );
};

export default AssignForces;
