import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { parseInt } from "lodash";

const BasicDetails = ({
  handleNext,
  handleBack,
  propertyDetails,
  setPropertyDetails,
}) => {
  const [title, ChangeTitle] = useState(propertyDetails.title);
  const [description, ChangeDescription] = useState(
    propertyDetails.description
  );
  const [price, ChangePrice] = useState(propertyDetails.price);
  const [helperText, setHelperText] = useState("");
  const [emailState, setEmailState] = useState(propertyDetails.userEmail);
  const { user } = useAuth0();

  const handleSubmit = () => {
    if (title.length < 3 && price < 999) {
      setHelperText(
        "Tile must be atleast 3 characters & price must be more than 999"
      );
    } else if (emailState !== user?.email) {
      setHelperText("login email & entered email must be same");
    } else {
      setPropertyDetails((prev) => ({
        ...prev,
        title,
        description,
        userEmail: emailState,
        price: parseInt(price),
      }));
      handleNext();
    }
  };

  useEffect(() => {
    if (title.length === 3 && price < 999) {
      setHelperText("");
    }
  }, [title, description, price]);

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
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <TextField
          id="filled-search"
          label="Title *"
          variant="filled"
          size="small"
          value={title}
          onChange={(e) => ChangeTitle(e.target.value)}
        />
        <TextField
          id="filled-search"
          label="Description"
          variant="filled"
          size="small"
          value={description}
          multiline
          onChange={(e) => ChangeDescription(e.target.value)}
        />

        <span className="secondaryText" htmlFor="filled-adornment-amount">
          Amount
        </span>
        <input
          value={price}
          type="number"
          onChange={(e) => ChangePrice(e.target.value)}
          id="filled-adornment-amount"
          placeholder="$"
          style={{
            width: "100%",
            height: "1.5rem",
            padding: "0.5rem",
            borderRadius: "2px",
            outline: "none",
            border: "1px solid #000000",
          }}
        />
        <TextField
          id="filled-search"
          label="Email *"
          variant="filled"
          size="small"
          value={emailState}
          onChange={(e) => setEmailState(e.target.value)}
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
        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default BasicDetails;
