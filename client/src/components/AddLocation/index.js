import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Maps from "../../components/Maps";
import { useMediaQuery, useTheme } from "@mui/material";

const AddLocation = ({
  handleNext,
  handleBack,
  propertyDetails,
  setPropertyDetails,
}) => {
  const [country, ChangeCountry] = useState(propertyDetails.country);
  const [city, ChangeCity] = useState(propertyDetails.city);
  const [address, ChangeAddress] = useState(propertyDetails.address);
  const [helperText, setHelperText] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const mapsize = {
    width: isSmallScreen ? "90%" : "60%",
    padding: isSmallScreen ? "10px" : "20px",
  };

  const handleSubmit = () => {
    if (country.length < 3 || city.length < 3 || address.length < 3) {
      setHelperText("All fields have atleast 3 characters.");
    } else {
      setPropertyDetails((prev) => ({ ...prev, city, address, country }));
      handleNext();
    }
  };

  useEffect(() => {
    if (country.length === 3 && city.length === 3 && address.length === 3) {
      setHelperText("");
    }
  }, [country, city, address]);

  return (
    <div
      style={{
        flexDirection: "column",
        marginTop: "2rem",
        gap: "2rem",
        width: "100%",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <TextField
            id="filled-search"
            label="Country *"
            variant="filled"
            size="small"
            value={country}
            onChange={(e) => ChangeCountry(e.target.value)}
          />
          <TextField
            id="filled-search"
            label="City *"
            variant="filled"
            size="small"
            value={city}
            onChange={(e) => ChangeCity(e.target.value)}
          />
          <TextField
            id="filled-search"
            label="Address or Pincode *"
            variant="filled"
            size="small"
            value={address}
            onChange={(e) => ChangeAddress(e.target.value)}
          />
        </div>
        <Maps
          address={address ? address : ""}
          city={city ? city : ""}
          country={country ? country : ""}
          height="300px"
          width={mapsize.width}
        />
        <p style={{ color: "red" }}>{helperText}</p>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 1, mr: 1 }}
        >
          Continue
        </Button>
        <Button disabled onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default AddLocation;
