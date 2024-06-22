import React, { useState } from "react";
import { Button } from "@mui/material";

const Facilities = ({
  handleNext,
  handleBack,
  propertyDetails,
  setPropertyDetails,
}) => {
  const [bathrooms, ChangeBathrooms] = useState(
    propertyDetails.facilities.bathrooms
  );
  const [bedrooms, ChangeBedrooms] = useState(
    propertyDetails.facilities.bedrooms
  );
  const [parkings, ChangeParkings] = useState(
    propertyDetails.facilities.parkings
  );
  const [helperText, setHelperText] = useState("");

  const handleSubmit = () => {
    if (bedrooms > 0 && parkings > 0 && bathrooms > 0) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
      }));
      handleNext();
      setHelperText("");
    } else {
      setHelperText("All fields have atleast 1");
    }
  };
  return (
    <div
      className="flexCenter"
      style={{
        flexDirection: "column",
        marginTop: "2rem",
        gap: "2rem",
      }}
    >
      <div
        className="secondaryText"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0rem",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <span>Bedrooms</span>
        <input
          placeholder="Bedrooms"
          type="number"
          value={bedrooms}
          onChange={(e) => ChangeBedrooms(e.target.value)}
          style={{
            width: "100%",
            height: "2rem",
            padding: "0.5rem",
            borderRadius: "2px",
            outline: "none",
            border: "1px solid #000000",
          }}
        />
      </div>
      <div
        className="secondaryText"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0rem",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <span>Bathrooms</span>
        <input
          type="number"
          value={bathrooms}
          onChange={(e) => ChangeBathrooms(e.target.value)}
          placeholder="Bathrooms"
          style={{
            width: "100%",
            height: "2rem",
            padding: "0.5rem",
            borderRadius: "2px",
            outline: "none",
            border: "1px solid #000000",
          }}
        />
      </div>
      <div
        className="secondaryText"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0rem",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <span>Parkings</span>
        <input
          placeholder="Parkings"
          type="number"
          value={parkings}
          onChange={(e) => ChangeParkings(e.target.value)}
          style={{
            width: "100%",
            height: "2rem",
            padding: "0.5rem",
            borderRadius: "2px",
            outline: "none",
            border: "1px solid #000000",
          }}
        />
      </div>
      <p style={{ color: "red" }}>{helperText}</p>
      <div style={{ marginBottom: "1rem" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 1, mr: 1 }}
        >
          Finish
        </Button>
        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Facilities;
