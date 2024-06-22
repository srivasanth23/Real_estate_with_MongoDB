import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { SlCloudUpload } from "react-icons/sl";
import "./index.css";

const UploadImages = ({
  handleNext,
  handleBack,
  propertyDetails,
  setPropertyDetails,
}) => {
  const [images, setImages] = React.useState(propertyDetails.image);
  const [helperText, setHelperText] = React.useState("");
  const widgetRef = useRef();
  const cloudinaryRef = useRef();

  const handleSubmit = () => {
    if (!images) {
      setHelperText("Upload Image.");
    } else {
      setPropertyDetails((prev) => ({ ...prev, image: images }));
      handleNext();
    }
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dlxjzmiig",
        uploadPreset: "uddjxvnt",
        maxFile: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImages(result.info.secure_url);
        }
      }
    );
    if (images) {
      setHelperText("");
    }
  }, [cloudinaryRef, widgetRef, images]);

  return (
    <div className="flexCenter uploadWrapper" style={{ marginBottom: "1rem" }}>
      {!images ? (
        <button
          className=" flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <SlCloudUpload size={50} color="grey" />
          <span> Image must not be null</span>
        </button>
      ) : (
        <>
          <div
            className="uploadedImage"
            onClick={() => widgetRef.current?.open()}
          >
            <span className="secondaryText flexCenter">
              Click on Image to Change Image
            </span>
            <img src={images} alt="uploadedImage" />
          </div>
        </>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "red" }}>{helperText}</p>
        <div>
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
    </div>
  );
};

export default UploadImages;
