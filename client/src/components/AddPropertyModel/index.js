import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import AddLocation from "../AddLocation";
import UploadImages from "../UploadImages";
import BasicDetails from "../BasicDetails";
import Facilities from "../Facilities";
import { createResidency } from "../../utils/api";

const steps = [
  {
    label: "Location",
  },
  {
    label: "Images",
  },
  {
    label: "Basic details",
  },
  {
    label: "Other Details",
  },
];

const AddPropertyModel = ({ opened, setOpened }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const [propertyDetails, setPropertyDetails] = React.useState({
    title: "",
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
    userEmail: "",
  });
  console.log(propertyDetails);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setPropertyDetails({
      title: "",
      description: "",
      price: 0,
      country: "",
      city: "",
      address: "",
      image: null,
      facilities: {
        bedrooms: 0,
        parkings: 0,
        bathrooms: 0,
      },
      userEmail: "",
    });
  };

  const handleAddProperty = () => {
    console.log(propertyDetails);
    createResidency(propertyDetails);
    setOpened(false);
    handleReset();
  };

  return (
    <Modal
      open={opened}
      onClose={() => setOpened(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle} container>
        <div className="modalHeader">
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ fontSize: { xs: "1rem", sm: "1.5rem" }, pb: "1rem" }}
          >
            Add new Property
          </Typography>
          <Button onClick={() => setOpened(false)}>
            <IoCloseSharp size={25} />
          </Button>
        </div>

        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 3 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>

              <StepContent>
                <Box sx={{ mb: 2 }}>
                  <div>
                    {index === 0 && (
                      <AddLocation
                        handleNext={handleNext}
                        handleBack={handleBack}
                        propertyDetails={propertyDetails}
                        setPropertyDetails={setPropertyDetails}
                      />
                    )}
                    {index === 1 && (
                      <UploadImages
                        handleNext={handleNext}
                        handleBack={handleBack}
                        propertyDetails={propertyDetails}
                        setPropertyDetails={setPropertyDetails}
                      />
                    )}
                    {index === 2 && (
                      <BasicDetails
                        handleNext={handleNext}
                        handleBack={handleBack}
                        propertyDetails={propertyDetails}
                        setPropertyDetails={setPropertyDetails}
                      />
                    )}
                    {index === 3 && (
                      <Facilities
                        handleNext={handleNext}
                        handleBack={handleBack}
                        propertyDetails={propertyDetails}
                        setPropertyDetails={setPropertyDetails}
                      />
                    )}
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>
              All steps completed - you&apos;re successfully added a new
              property
            </Typography>
            <Button
              variant="contained"
              onClick={handleReset}
              sx={{ mt: 1, mr: 1 }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              onClick={handleAddProperty}
              sx={{ mt: 1, mr: 1 }}
            >
              Save
            </Button>
          </Paper>
        )}
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  width: "90vw",
  maxWidth: "800px",
  overflowY: "auto",
  maxHeight: "80vh",
};

export default AddPropertyModel;
