import React, { useState } from "react";
import "./index.css";
import { IoCloseSharp } from "react-icons/io5";
import { Box, Button, Modal, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { bookVisit } from "../../utils/api";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/UserDetailContext";
import { useContext } from "react";
import dayjs from "dayjs";
import { useMediaQuery, useTheme } from "@mui/material";

const BookingModel = ({ opened, setOpened, propertyId, email }) => {
  const [selected, setSelected] = useState(null);
  const { setUserDetails } = useContext(UserDetailContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", {
      position: "bottom-right",
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(selected).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const callBookVisit = async () => {
    await bookVisit(selected, email, propertyId);
    handleBookingSuccess();
  };

  const { mutate } = useMutation({
    mutationFn: () => callBookVisit(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      open={opened}
      onClose={setOpened}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle} style={{ width: isSmallScreen ? "90vw" : "40vw" }}>
        <div className="modalHeader">
          <Typography id="modal-title" variant="h6" component="h2">
            Select your date of visit
          </Typography>
          <Button onClick={() => setOpened(false)}>
            <IoCloseSharp size={25} />
          </Button>
        </div>
        <DatePicker
          dateFormat="Pp"
          selected={selected}
          onSelect={setSelected}
          className="datePicker"
          minDate={new Date()}
          maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          placeholderText="Select date"
        />
        {selected && <p>Selected date: {selected.toString()}</p>}
        <Button
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={() => mutate() && setOpened(false)}
          disabled={!selected}
          className="booking-button"
        >
          Confirm Visit
        </Button>
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
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default BookingModel;
